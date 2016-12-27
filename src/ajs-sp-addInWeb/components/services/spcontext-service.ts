/// <reference path="../../typings/globals/jquery/index.d.ts" />
/// <reference path="../../typings/globals/microsoft.ajax/index.d.ts" />
/// <reference path="../../typings/globals/sharepoint/index.d.ts" />

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class spcontextService {
    /**
   SPHostUrl parameter name
  */
    private SPHostUrlKey = "SPHostUrl";
    private SPHostUrl = "";

    /**
    * Represents SPAppWebUrl parameter
    */
    private SPAppUrlKey = "SPAppWebUrl";
    private SPAppUrl = "";
    private SPLanguageKey = "SPLanguage";
    private SPLanguage = "";
    private SPClientTagKey = "SPClientTag";
    private SPClientTag = "";
    private SPProductNumberKey = "SPProductNumber";
    private SPProductNumber = "";
    private SPRemoteAppUrlKey = "SPRemoteAppUrl";
    private SPRemoteAppUrl = "";

    private SharePointUserName = "";

    public appContext: SP.ClientContext;


    constructor(private http: Http) {
    }

    /**
     * Gets QueryString parameter value by name
     * @param name represents the querystring parameter
     * @param locationUri (OPTIONAL) represents the querystring URL
     */
    getParameterByName(name: string, locationUri?: string) {
        var url = locationUri == undefined || locationUri == null ? window.location.href : locationUri;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    /**
    * Builds the SPContext required URI string
    */
    getContextUri() {

        var self = this;
        self.SPHostUrl = self.getParameterByName(self.SPHostUrlKey);
        self.SPAppUrl = self.getParameterByName(self.SPAppUrlKey);
        self.SPLanguage = self.getParameterByName(self.SPLanguageKey);
        self.SPClientTag = self.getParameterByName(self.SPClientTagKey);
        self.SPProductNumber = self.getParameterByName(self.SPProductNumberKey);
        self.SPRemoteAppUrl = self.getParameterByName(self.SPRemoteAppUrlKey);

        var url = "SPHostUrl=" + self.SPHostUrl
            + "&SPAppWebUrl=" + self.SPAppUrl
            + "&SPLanguage=" + self.SPLanguage
            + "&SPClientTag=" + self.SPClientTag
            + "&SPProductNumber=" + self.SPProductNumber
            + "&SPRemoteAppUrl=" + self.SPRemoteAppUrl;

        return url;
    }

    /**
     * Gets SPHostUrl from the current URL and appends it as query string to the links which point to current domain in the page.
     */
    loadSharePointContext() {

        var parent = this;
        var contextdeferred = $.Deferred();

        parent.ensureSPHasRedirectedToSharePointRemoved();
        parent.SPHostUrl = parent.getParameterByName(parent.SPHostUrlKey);
        parent.SPAppUrl = parent.getParameterByName(parent.SPAppUrlKey);
        var currentAuthority = parent.getAuthorityFromUrl(window.location.href);

        if (parent.SPHostUrl && currentAuthority) {

            parent.loadSharePointExecutorsDeferred()
                .done(function (runtimeload, spload, spuiload, sprequestload) {
                    contextdeferred.resolve(runtimeload, spload, spuiload, sprequestload);
                })
                .fail(function (sender, args) {
                    console.log("Error {0} in loadSharePointContext", args.message);
                    contextdeferred.reject(sender, args);
                });
        }

        return contextdeferred.promise();
    }

    loadSharePointExecutorsDeferred() {
        var parent = this;
        var execdeferred = $.Deferred();

        //Build absolute path to the layouts root with the spHostUrl
        var layoutsRoot = decodeURIComponent(parent.SPAppUrl + '/_layouts/15/');

        //load all appropriate scripts for the page to function
        $.getScript(layoutsRoot + 'MicrosoftAjax.js',
            function () {
                $.when(
                    $.getScript(layoutsRoot + 'SP.Runtime.js'),
                    $.getScript(layoutsRoot + 'SP.js'),
                    $.getScript(layoutsRoot + 'SP.UI.Controls.js'),
                    $.getScript(layoutsRoot + 'SP.RequestExecutor.js'))
                    .done(function (runtimeload, spload, spuiload, sprequestload) {

                        parent.appContext = new SP.ClientContext(parent.SPAppUrl);
                        var factory = new SP.ProxyWebRequestExecutorFactory(parent.SPAppUrl);
                        parent.appContext.set_webRequestExecutorFactory(factory);

                        if (spuiload[1] == "success") {
                            parent.renderSPChrome();
                        }

                        execdeferred.resolve(runtimeload, spload, spuiload, sprequestload);
                    })
                    .fail(function (sender, args) {
                        execdeferred.reject(sender, args);
                    });
            });

        return execdeferred.promise();
    }

    /**
     * Appends SPHostUrl as query string to all the links which point to current domain.
     * @param currentAuthority
     */
    appendSPHostUrlToLinks(currentAuthority, hyperlinkId) {
        var self = this;

        var spHostUrl = self.getContextUri();

        $(hyperlinkId)
            .filter(function () {
                var urlToSearch = this.href == undefined ? this.action : this.href;
                var authority = self.getAuthorityFromUrl(urlToSearch);
                if (!authority && /^#|:/.test(urlToSearch)) {
                    // Filters out anchors and urls with other unsupported protocols.
                    return false;
                }
                return authority.toUpperCase() == currentAuthority;
            })
            .each(function () {
                if (!self.getParameterByName(self.SPHostUrlKey, String(this.search))) {
                    if (this.search.length > 0) {
                        this.search += "&" + spHostUrl;
                    }
                    else {
                        this.search = "?" + spHostUrl;
                    }
                }
            });
    }

    /**
     * Gets authority from the given url when it is an absolute url with http/https protocol or a protocol relative url.
     * @param url
     */
    getAuthorityFromUrl(url) {
        if (url) {
            var match = /^(?:https:\/\/|http:\/\/|\/\/)([^\/\?#]+)(?:\/|#|$|\?)/i.exec(url);
            if (match) {
                return match[1];
            }
        }
        return null;
    }

    /**
     *  If SPHasRedirectedToSharePoint exists in the query string, remove it.
    * Hence, when user bookmarks the url, SPHasRedirectedToSharePoint will not be included.
    * Note that modifying window.location.search will cause an additional request to server.
     */
    ensureSPHasRedirectedToSharePointRemoved() {
        var SPHasRedirectedToSharePointParam = "&SPHasRedirectedToSharePoint=1";

        var queryString = window.location.search;

        if (queryString.indexOf(SPHasRedirectedToSharePointParam) >= 0) {
            window.location.search = queryString.replace(SPHasRedirectedToSharePointParam, "");
        }
    }

    /**
     * Takes the hidden div body and displays it to the user
     */
    chromeLoaded() {
        console.log("In {0}", "chromeLoaded");
        $('body').show();
    }

    /**
     * Renders the SPChrome on the upper header area
     * function callback to render chrome after SP.UI.Controls.js loads
     */
    renderSPChrome() {
        //Set the chrome options for launching Help, Account, and Contact pages
        // var params = '?' + document.URL.split('?')[1];
        var self = this;
        var options = {
            'appTitle': document.title,
            'onCssLoaded': 'jQuery("body").show()'
        };

        //Load the Chrome Control in the divSPChrome element of the page      
        var chromeNavigation = new SP.UI.Controls.Navigation('divSPChrome', options);
        chromeNavigation.setVisible(true);
        chromeNavigation.setBottomHeaderVisible(false);
    }

    /**
     * Will execute current context to query the username
     *   Returns a userContext object if successful
     */
    retrieveUserName() {
        var parent = this;
        var usrdeferred = $.Deferred();
        console.log('retreive username');

        var appContextSite = new SP.AppContextSite(parent.appContext, parent.SPHostUrl);
        var hostWeb = appContextSite.get_web();
        var appWeb = parent.appContext.get_web();

        var userContext = hostWeb.get_currentUser();
        parent.appContext.load(userContext);
        parent.appContext.executeQueryAsync(
            function () {
                usrdeferred.resolve(userContext);
            },
            function (sender, args) {
                console.log("Failed to retrieve username for url {0}", parent.SPAppUrl);
                usrdeferred.reject(sender, args);
            });

        return usrdeferred.promise();
    }
}