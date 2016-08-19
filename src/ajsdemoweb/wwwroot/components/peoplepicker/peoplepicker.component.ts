/// <reference path="../../../typings/globals/sharepoint/index.d.ts" />
/// <reference path="../../../typings/globals/jquery/index.d.ts" />
/// <reference path="peoplepicker-principaltype.d.ts" />


import {Component, Self, Input, Output, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES, NgModel} from '@angular/forms';
import { Http } from '@angular/http';
import {PeoplePickerUtils} from './peoplepicker-utils.ts';
import {PeoplePickerPrincipalId} from './peoplepicker-principalid.ts';

@Component({
    selector: 'peoplepicker[ngModel]',
    templateUrl: './components/peoplepicker/peoplepicker.component.html',
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})

export class PeoplePickerComponent {
    @Input() public principalType: SharePointEnums.SPPrincipalType

    public pickerFieldSpanName: string;
    public pickerFieldInputName: string;
    public pickerFieldInputNameFocus: boolean;
    public pickerFieldDisplayName: string;
    public pickerFieldHiddenName: string;


    public cd: NgModel;

    public SharePointContext: SP.ClientContext;
    public ServerDataMethod: any;
    public SpGroupName: string;
    public SpHostUrl: string;

    public InstanceName = "";
    public MaxEntriesShown = 4;
    public MaxUsers = 0;
    public ShowLoginName = true;
    public ShowTitle = true;
    public MinimalCharactersBeforeSearching = 2;
    public AllowDuplicates = false;
    public Language = "en-us";
    public PickerResultsDisplay = false;
    public HasResultantMessage = false;
    public ResultantMessage = "";

    //Private variable is not really private, just a naming convention
    private _queryID = 1;
    private _lastQueryID = 1;

    //Collections
    public ResolvedUsers = Array<PeoplePickerPrincipalId>();
    public ResultantUsers = Array<PeoplePickerPrincipalId>();

    public constructor( @Self() cd: NgModel) {
        this.cd = cd;
        this.pickerFieldInputNameFocus = false;
    }

    public GetPrincipalType() {
        return this.principalType;
    };

    /**
     * Property wrapped in function to allow access from event handler
     * @param principalType
     */
    public SetPrincipalType(principalType: SharePointEnums.SPPrincipalType) {
        //See http://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.client.utilities.principaltype.aspx
        //This enumeration has a FlagsAttribute attribute that allows a bitwise combination of its member values.
        //None Enumeration whose value specifies no principal type. Value = 0. 
        //User Enumeration whose value specifies a user as the principal type. Value = 1. 
        //DistributionList Enumeration whose value specifies a distribution list as the principal type. Value = 2. 
        //SecurityGroup Enumeration whose value specifies a security group as the principal type. Value = 4. 
        //SharePointGroup Enumeration whose value specifies a group (2) as the principal type. Value = 8. 
        //All Enumeration whose value specifies all principal types. Value = 15. 

        this.principalType = principalType;
    };

    /**
     * Property wrapped in function to allow access from event handler
     */
    public GetMinimalCharactersBeforeSearching() {
        return this.MinimalCharactersBeforeSearching;
    };

    /**
     * Property wrapped in function to allow access from event handler
     * @param minimalChars
     */
    public SetMinimalCharactersBeforeSearching(minimalChars: number) {
        this.MinimalCharactersBeforeSearching = minimalChars;
    };

    /**
     * Property wrapped in function to allow access from event handler
     */
    private GetServerDataMethod() {
        return this.ServerDataMethod;
    };

    /**
     * Property wrapped in function to allow access from event handler
     */
    private GetSpGroupName() {
        return this.SpGroupName;
    };

    /**
     * Property wrapped in function to allow access from event handler
     */
    private GetSpHostUrl() {
        return this.SpHostUrl;
    };

    /**
     * Property wrapped in function to allow access from event handler
     */
    private GetMaxUsers() {
        return this.MaxUsers;
    }

    /**
     * HTML encoder
     * @param html
     */
    private HtmlEncode(html: string) {
        var elmHtmlA = <HTMLAnchorElement>document.createElement('a');
        var elmHtmlTag = document.createTextNode(html);
        elmHtmlA.appendChild(elmHtmlTag);
        return this.ReplaceAll(elmHtmlA.innerHTML, "'", "&apos;", false);
    };

    /**
     * HTML decoder
     * @param html
     */
    private HtmlDecode(html: string) {
        var a = document.createElement('a');
        a.innerHTML = html;
        return a.textContent;
    };

    /**
    Replaces all tokens and returns a string concatenated with the new token
    */
    public ReplaceAll(str: string, token: string, newToken: string, ignoreCase: boolean): string {
        var _token: string;
        //var str = this + "";
        var i = -1;

        if (typeof token === "string") {
            if (ignoreCase) {
                _token = token.toLowerCase();
                while ((
                    i = str.toLowerCase().indexOf(
                        token, i >= 0 ? i + newToken.length : 0
                    )) !== -1
                ) {
                    str = str.substring(0, i) +
                        newToken +
                        str.substring(i + token.length);
                }
            } else {
                return str.split(token).join(newToken);
            }
        }
        return str;
    }

    public escapeRegexp(queryToEscape: string): string {
        // Regex: capture the whole query string and replace it with the string
        // that will be used to match the results, for example if the capture is
        // 'a' the result will be \a
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }


    public Format(str: string) {
        var self = this;
        for (var i = 1; i < arguments.length; i++) {
            str = self.ReplaceAll(str, "{" + (i - 1) + "}", arguments[i], false);
        }
        return str;
    };

    /**
     * Hide the user selection box
     */
    public HideSelectionBox() {
        this.PickerResultsDisplay = false;
    };

    /**
     * show the user selection box
     */
    public ShowSelectionBox() {
        this.PickerResultsDisplay = true;
    };

    // Returns a resolved user object
    public ResolvedUser(login: string, name: string, email: string) {
        var user = new PeoplePickerPrincipalId(login, name, email, name, name, login);
        return user;
    };

    // Add resolved user to array and updates the hidden field control with a JSON string
    public PushResolvedUser(resolvedUser: PeoplePickerPrincipalId) {
        if (this.AllowDuplicates) {
            this.ResolvedUsers.push(resolvedUser);
        } else if ((this.MaxUsers > 0) && (this.ResolvedUsers.length >= this.MaxUsers)) {
            //Send message to the user that there was an error adding he user due to too many users.
            alert("Unable to add another user. The maximum number has been reached.");
        } else {
            var duplicate = false;
            for (var i = 0; i < this.ResolvedUsers.length; i++) {
                if (this.ResolvedUsers[i].login == resolvedUser.login) {
                    duplicate = true;
                }
            }

            if (!duplicate) {
                this.ResolvedUsers.push(resolvedUser);
            }
        }

        this.pickerFieldHiddenName = JSON.stringify(this.ResolvedUsers);
    };

    // Remove last added resolved user from the array and updates the hidden field control with a JSON string
    public PopResolvedUser() {
        this.ResolvedUsers.pop();
        this.pickerFieldHiddenName = JSON.stringify(this.ResolvedUsers);
    };


    // Remove resolved user from the array and updates the hidden field control with a JSON string
    public RemoveResolvedUser(lookupValue: PeoplePickerPrincipalId) {
        var newResolvedUsers = Array<PeoplePickerPrincipalId>();
        var userRemoved = false;

        for (var i = 0; i < this.ResolvedUsers.length; i++) {
            var resolvedLookupValue = this.ResolvedUsers[i].login ? this.ResolvedUsers[i].login : this.ResolvedUsers[i].lookupId;
            if (resolvedLookupValue !== lookupValue.getLookupValue() || userRemoved === true) {
                newResolvedUsers.push(this.ResolvedUsers[i]);
            }

            // Handle duplicates if enabled, only remove one user
            if (resolvedLookupValue === lookupValue.getLookupValue()) {
                userRemoved = true;
            }
        }
        this.ResolvedUsers = newResolvedUsers;
        this.pickerFieldHiddenName = JSON.stringify(this.ResolvedUsers);
    };

    // Update the people picker control to show the newly added user
    public RecipientSelected(login: string, name: string, email: string) {
        this.HideSelectionBox();

        // Push new resolved user to list
        this.PushResolvedUser(this.ResolvedUser(login, name, email));

        // Prepare the edit control for a second user selection
        this.pickerFieldInputName = "";
    };

    // Delete a resolved user
    public DeleteProcessedUser(lookupValue: PeoplePickerPrincipalId) {
        this.RemoveResolvedUser(lookupValue);

        this.pickerFieldInputNameFocus = true;
    };


    // Function called when something went wrong with the user query (clientPeoplePickerSearchUser)
    public QueryFailure(queryNumber: any) {
        console.error('Error performing user search {0}', queryNumber);
    };

    /**
     * Function called then the clientPeoplePickerSearchUser succeeded
     * @param queryNumber
     * @param searchResult
     */
    public QuerySuccess(queryNumber: any, searchResult: any) {
        var resultValue = '[]';
        //Results from code-behind WebMethod
        if (typeof searchResult === 'string') {
            resultValue = searchResult;
        } else {
            //results from JSOM
            resultValue = searchResult.get_value();
        }

        var results = $.parseJSON(resultValue);
        if (results && results.length) {
            if (results.length > 0) {
                // if this function is not the callback from the last issued query then just ignore it. This is needed to ensure a matching between
                // what the user entered and what is shown in the query feedback window
                if (queryNumber < this._lastQueryID) {
                    return;
                }

                var displayCount = results.length;
                if (displayCount > this.MaxEntriesShown) {
                    displayCount = this.MaxEntriesShown;
                }

                for (var i = 0; i < displayCount; i++) {
                    var item = results[i];
                    var loginName = item['Key'];
                    var displayName = item['DisplayText'];
                    var title = item['EntityData']['Title'];
                    var email = item['EntityData']['Email'];
                    var usrModel = new PeoplePickerPrincipalId(loginName, this.HtmlEncode(displayName), email, displayName, title, loginName);
                    this.ResultantUsers.push(usrModel);
                }


                if (results.length === 1) {
                    this.ResultantMessage = 'Showing ' + results.length + ' result';
                    this.HasResultantMessage = true;

                } else if (displayCount !== results.length) {
                    this.ResultantMessage = 'Showing ' + displayCount + ' of ' + results.length + ' results. <B>Please refine further<B/>';
                    this.HasResultantMessage = true;

                } else {
                    this.ResultantMessage = 'Showing ' + results.length + ' results';
                    this.HasResultantMessage = true;
                }

                //display the suggestion box
                this.ShowSelectionBox();
            }
            else {
                this.ResultantMessage = 'No results found';
                this.HasResultantMessage = true;
                //display the suggestion box
                this.ShowSelectionBox();
            }
        }
        else {
            //hide the suggestion box since results are null
            this.ResultantMessage = '';
            this.HasResultantMessage = false;
            this.HideSelectionBox();
        }
    };


    // Initialize
    public Initialize() {

        //Capture reference to current control so that it can be used in event handlers
        var parent = this;

        // is there data in the hidden control...if so show it
        if (this.pickerFieldHiddenName.length > 0) {
            // Deserialize JSON string into list of resolved users
            var resultValue = this.pickerFieldHiddenName;
            var results = $.parseJSON(resultValue);
            if (results && results.length && results.length > 0) {

                var displayCount = results.length;
                for (var i = 0; i < displayCount; i++) {
                    var item = results[i];
                    var loginName = item['login'];
                    var displayName = item['displayName'];
                    var title = item['title'];
                    var email = item['email'];
                    var usrModel = new PeoplePickerPrincipalId(loginName, this.HtmlEncode(displayName), email, displayName, title, loginName);
                    this.ResultantUsers.push(usrModel);
                }
            }
        }


    };
}