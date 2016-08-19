/// <reference path="../../../typings/globals/sharepoint/index.d.ts" />
/// <reference path="../../../typings/globals/jquery/index.d.ts" />
/// <reference path="peoplepicker-principaltype.d.ts" />
System.register(['@angular/core', '@angular/common', '@angular/forms', './peoplepicker-principalid.ts'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, common_1, forms_1, peoplepicker_principalid_ts_1;
    var PeoplePickerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (peoplepicker_principalid_ts_1_1) {
                peoplepicker_principalid_ts_1 = peoplepicker_principalid_ts_1_1;
            }],
        execute: function() {
            PeoplePickerComponent = (function () {
                function PeoplePickerComponent(cd) {
                    this.InstanceName = "";
                    this.MaxEntriesShown = 4;
                    this.MaxUsers = 0;
                    this.ShowLoginName = true;
                    this.ShowTitle = true;
                    this.MinimalCharactersBeforeSearching = 2;
                    this.AllowDuplicates = false;
                    this.Language = "en-us";
                    this.PickerResultsDisplay = false;
                    this.HasResultantMessage = false;
                    this.ResultantMessage = "";
                    //Private variable is not really private, just a naming convention
                    this._queryID = 1;
                    this._lastQueryID = 1;
                    //Collections
                    this.ResolvedUsers = Array();
                    this.ResultantUsers = Array();
                    this.cd = cd;
                    this.pickerFieldInputNameFocus = false;
                }
                PeoplePickerComponent.prototype.GetPrincipalType = function () {
                    return this.principalType;
                };
                ;
                /**
                 * Property wrapped in function to allow access from event handler
                 * @param principalType
                 */
                PeoplePickerComponent.prototype.SetPrincipalType = function (principalType) {
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
                ;
                /**
                 * Property wrapped in function to allow access from event handler
                 */
                PeoplePickerComponent.prototype.GetMinimalCharactersBeforeSearching = function () {
                    return this.MinimalCharactersBeforeSearching;
                };
                ;
                /**
                 * Property wrapped in function to allow access from event handler
                 * @param minimalChars
                 */
                PeoplePickerComponent.prototype.SetMinimalCharactersBeforeSearching = function (minimalChars) {
                    this.MinimalCharactersBeforeSearching = minimalChars;
                };
                ;
                /**
                 * Property wrapped in function to allow access from event handler
                 */
                PeoplePickerComponent.prototype.GetServerDataMethod = function () {
                    return this.ServerDataMethod;
                };
                ;
                /**
                 * Property wrapped in function to allow access from event handler
                 */
                PeoplePickerComponent.prototype.GetSpGroupName = function () {
                    return this.SpGroupName;
                };
                ;
                /**
                 * Property wrapped in function to allow access from event handler
                 */
                PeoplePickerComponent.prototype.GetSpHostUrl = function () {
                    return this.SpHostUrl;
                };
                ;
                /**
                 * Property wrapped in function to allow access from event handler
                 */
                PeoplePickerComponent.prototype.GetMaxUsers = function () {
                    return this.MaxUsers;
                };
                /**
                 * HTML encoder
                 * @param html
                 */
                PeoplePickerComponent.prototype.HtmlEncode = function (html) {
                    var elmHtmlA = document.createElement('a');
                    var elmHtmlTag = document.createTextNode(html);
                    elmHtmlA.appendChild(elmHtmlTag);
                    return this.ReplaceAll(elmHtmlA.innerHTML, "'", "&apos;", false);
                };
                ;
                /**
                 * HTML decoder
                 * @param html
                 */
                PeoplePickerComponent.prototype.HtmlDecode = function (html) {
                    var a = document.createElement('a');
                    a.innerHTML = html;
                    return a.textContent;
                };
                ;
                /**
                Replaces all tokens and returns a string concatenated with the new token
                */
                PeoplePickerComponent.prototype.ReplaceAll = function (str, token, newToken, ignoreCase) {
                    var _token;
                    //var str = this + "";
                    var i = -1;
                    if (typeof token === "string") {
                        if (ignoreCase) {
                            _token = token.toLowerCase();
                            while ((i = str.toLowerCase().indexOf(token, i >= 0 ? i + newToken.length : 0)) !== -1) {
                                str = str.substring(0, i) +
                                    newToken +
                                    str.substring(i + token.length);
                            }
                        }
                        else {
                            return str.split(token).join(newToken);
                        }
                    }
                    return str;
                };
                PeoplePickerComponent.prototype.escapeRegexp = function (queryToEscape) {
                    // Regex: capture the whole query string and replace it with the string
                    // that will be used to match the results, for example if the capture is
                    // 'a' the result will be \a
                    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
                };
                PeoplePickerComponent.prototype.Format = function (str) {
                    var self = this;
                    for (var i = 1; i < arguments.length; i++) {
                        str = self.ReplaceAll(str, "{" + (i - 1) + "}", arguments[i], false);
                    }
                    return str;
                };
                ;
                /**
                 * Hide the user selection box
                 */
                PeoplePickerComponent.prototype.HideSelectionBox = function () {
                    this.PickerResultsDisplay = false;
                };
                ;
                /**
                 * show the user selection box
                 */
                PeoplePickerComponent.prototype.ShowSelectionBox = function () {
                    this.PickerResultsDisplay = true;
                };
                ;
                // Returns a resolved user object
                PeoplePickerComponent.prototype.ResolvedUser = function (login, name, email) {
                    var user = new peoplepicker_principalid_ts_1.PeoplePickerPrincipalId(login, name, email, name, name, login);
                    return user;
                };
                ;
                // Add resolved user to array and updates the hidden field control with a JSON string
                PeoplePickerComponent.prototype.PushResolvedUser = function (resolvedUser) {
                    if (this.AllowDuplicates) {
                        this.ResolvedUsers.push(resolvedUser);
                    }
                    else if ((this.MaxUsers > 0) && (this.ResolvedUsers.length >= this.MaxUsers)) {
                        //Send message to the user that there was an error adding he user due to too many users.
                        alert("Unable to add another user. The maximum number has been reached.");
                    }
                    else {
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
                ;
                // Remove last added resolved user from the array and updates the hidden field control with a JSON string
                PeoplePickerComponent.prototype.PopResolvedUser = function () {
                    this.ResolvedUsers.pop();
                    this.pickerFieldHiddenName = JSON.stringify(this.ResolvedUsers);
                };
                ;
                // Remove resolved user from the array and updates the hidden field control with a JSON string
                PeoplePickerComponent.prototype.RemoveResolvedUser = function (lookupValue) {
                    var newResolvedUsers = Array();
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
                ;
                // Update the people picker control to show the newly added user
                PeoplePickerComponent.prototype.RecipientSelected = function (login, name, email) {
                    this.HideSelectionBox();
                    // Push new resolved user to list
                    this.PushResolvedUser(this.ResolvedUser(login, name, email));
                    // Prepare the edit control for a second user selection
                    this.pickerFieldInputName = "";
                };
                ;
                // Delete a resolved user
                PeoplePickerComponent.prototype.DeleteProcessedUser = function (lookupValue) {
                    this.RemoveResolvedUser(lookupValue);
                    this.pickerFieldInputNameFocus = true;
                };
                ;
                // Function called when something went wrong with the user query (clientPeoplePickerSearchUser)
                PeoplePickerComponent.prototype.QueryFailure = function (queryNumber) {
                    console.error('Error performing user search {0}', queryNumber);
                };
                ;
                /**
                 * Function called then the clientPeoplePickerSearchUser succeeded
                 * @param queryNumber
                 * @param searchResult
                 */
                PeoplePickerComponent.prototype.QuerySuccess = function (queryNumber, searchResult) {
                    var resultValue = '[]';
                    //Results from code-behind WebMethod
                    if (typeof searchResult === 'string') {
                        resultValue = searchResult;
                    }
                    else {
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
                                var usrModel = new peoplepicker_principalid_ts_1.PeoplePickerPrincipalId(loginName, this.HtmlEncode(displayName), email, displayName, title, loginName);
                                this.ResultantUsers.push(usrModel);
                            }
                            if (results.length === 1) {
                                this.ResultantMessage = 'Showing ' + results.length + ' result';
                                this.HasResultantMessage = true;
                            }
                            else if (displayCount !== results.length) {
                                this.ResultantMessage = 'Showing ' + displayCount + ' of ' + results.length + ' results. <B>Please refine further<B/>';
                                this.HasResultantMessage = true;
                            }
                            else {
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
                ;
                // Initialize
                PeoplePickerComponent.prototype.Initialize = function () {
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
                                var usrModel = new peoplepicker_principalid_ts_1.PeoplePickerPrincipalId(loginName, this.HtmlEncode(displayName), email, displayName, title, loginName);
                                this.ResultantUsers.push(usrModel);
                            }
                        }
                    }
                };
                ;
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], PeoplePickerComponent.prototype, "principalType", void 0);
                PeoplePickerComponent = __decorate([
                    core_1.Component({
                        selector: 'peoplepicker[ngModel]',
                        templateUrl: './components/peoplepicker/peoplepicker.component.html',
                        directives: [forms_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES]
                    }),
                    __param(0, core_1.Self()), 
                    __metadata('design:paramtypes', [forms_1.NgModel])
                ], PeoplePickerComponent);
                return PeoplePickerComponent;
            }());
            exports_1("PeoplePickerComponent", PeoplePickerComponent);
        }
    }
});
//# sourceMappingURL=peoplepicker.component.js.map