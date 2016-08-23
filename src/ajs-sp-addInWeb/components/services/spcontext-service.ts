/// <reference path="../../typings/globals/jquery/index.d.ts" />
/// <reference path="../../typings/globals/microsoft.ajax/index.d.ts" />
/// <reference path="../../typings/globals/sharepoint/index.d.ts" />

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';


declare var CAMControl: any;

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

        var self = this;
        var contextdeferred = $.Deferred();

        self.ensureSPHasRedirectedToSharePointRemoved();
        self.SPHostUrl = self.getParameterByName(self.SPHostUrlKey);
        self.SPAppUrl = self.getParameterByName(self.SPAppUrlKey);
        var currentAuthority = self.getAuthorityFromUrl(window.location.href);

        if (self.SPHostUrl && currentAuthority) {

            self.loadSharePointExecutorsDeferred()
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
        var self = this;
        var deferred = $.Deferred();

        //Build absolute path to the layouts root with the spHostUrl
        var layoutsRoot = decodeURIComponent(self.SPAppUrl + '/_layouts/15/');

        //load all appropriate scripts for the page to function
        $.getScript(layoutsRoot + 'MicrosoftAjax.js',
            function () {
                $.when(
                    $.getScript(layoutsRoot + 'SP.Runtime.js'),
                    $.getScript(layoutsRoot + 'SP.js'),
                    $.getScript(layoutsRoot + 'SP.UI.Controls.js'),
                    $.getScript(layoutsRoot + 'SP.RequestExecutor.js'))
                    .done(function (resp1, resp2, resp3, resp4) {

                        self.appContext = new SP.ClientContext(self.SPAppUrl);
                        var factory = new SP.ProxyWebRequestExecutorFactory(self.SPAppUrl);
                        self.appContext.set_webRequestExecutorFactory(factory);

                        deferred.resolve(resp1, resp2, resp3, resp4);
                    })
                    .fail(function (sender, args) {
                        deferred.reject(sender, args);
                    });
            });

        return deferred.promise();
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
     */
    retrieveUserName() {
        var self = this;
        console.log('retreive username');


        var appContextSite = new SP.AppContextSite(self.appContext, self.SPHostUrl);
        var hostWeb = appContextSite.get_web();
        var appWeb = self.appContext.get_web();

        var userContext = hostWeb.get_currentUser();
        self.appContext.load(userContext);
        self.appContext.executeQueryAsync(
            function () {
                self.SharePointUserName = userContext.get_title();
                $("#userDisplayName").html(self.SharePointUserName);
            },
            function (sender, args) {
                console.log("Failed to retrieve username for url {0}", self.SPAppUrl);
            });

    }


    configurePeoplePicker = function (spanControlId: string, inputControlId: string, searchDivControlId: string, hiddenControlId: string, maxUsers: number, variableName: string) {

        var self = this;

        var spanControl = $(spanControlId);
        var inputControl = $(inputControlId);
        var searchDivControl = $(searchDivControlId);
        var hiddenControl = $(hiddenControlId);

        self.SPHostUrl = self.getParameterByName(self.SPHostUrlKey);
        self.SPAppUrl = self.getParameterByName(self.SPAppUrlKey);

        //Make a people picker control
        //1. context = SharePoint Client Context object
        //2. $('#spanAdministrators') = SPAN that will 'host' the people picker control
        //3. $('#inputAdministrators') = INPUT that will be used to capture user input
        //4. $('#divAdministratorsSearch') = DIV that will show the 'dropdown' of the people picker
        //5. $('#hdnAdministrators') = INPUT hidden control that will host a JSON string of the resolved users
        var peoplePickerObj = new CAMControl.PeoplePicker(self.appContext, self.SPHostUrl, spanControl, inputControl, searchDivControl, hiddenControl);
        // required to pass the variable name here!
        peoplePickerObj.InstanceName = variableName;
        // Pass current language, if not set defaults to en-US. Use the SPLanguage query string param or provide a string like "nl-BE"
        // Do not set the Language property if you do not have foreseen javascript resource file for your language
        peoplePickerObj.Language = self.getParameterByName(self.SPLanguageKey);
        // optionally show more/less entries in the people picker dropdown, 4 is the default
        peoplePickerObj.MaxEntriesShown = 5;
        //set max users in people control to 0 for unlimited
        peoplePickerObj.MaxUsers = maxUsers;
        // Can duplicate entries be selected (default = false)
        peoplePickerObj.AllowDuplicates = false;
        // Show the user loginname
        peoplePickerObj.ShowLoginName = true;
        // Show the user title
        peoplePickerObj.ShowTitle = true;
        // Set principal type to determine what is shown (default = 1, only users are resolved).
        // See http://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.client.utilities.principaltype.aspx for more details
        // Set ShowLoginName and ShowTitle to false if you're resolving groups
        peoplePickerObj.PrincipalType = 1;
        // start user resolving as of 2 entered characters (= default)
        peoplePickerObj.MinimalCharactersBeforeSearching = 2;
        // Hookup everything
        peoplePickerObj.Initialize();

        return peoplePickerObj;
    }
}