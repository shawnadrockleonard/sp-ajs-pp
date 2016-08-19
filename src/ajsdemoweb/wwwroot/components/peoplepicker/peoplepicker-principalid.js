System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PeoplePickerPrincipalId;
    return {
        setters:[],
        execute: function() {
            PeoplePickerPrincipalId = (function () {
                /**
                 * Initializes the entity
                 */
                function PeoplePickerPrincipalId(lookupId, name, email, displayName, title, loginName) {
                    this.resultDisplay = 'Remove person or group {0}';
                    this.lookupId = lookupId;
                    this.name = name;
                    this.email = email;
                    this.displayName = displayName;
                    this.title = title;
                    var loginNameDisp = email;
                    if (loginName && loginName.indexOf('|') > -1) {
                        var segs = loginName.split('|');
                        loginNameDisp = loginNameDisp + " " + segs[segs.length - 1];
                        loginNameDisp = loginNameDisp.trim();
                    }
                    this.login = loginName;
                    this.loginNameDisplay = loginNameDisp;
                }
                /**
                 * Returns a cleansed version of the UPN
                 */
                PeoplePickerPrincipalId.prototype.getLookupValue = function () {
                    return (this.login) ? this.login.replace("\\", "\\\\") : this.lookupId;
                };
                ;
                PeoplePickerPrincipalId.prototype.getResultDisplay = function () {
                    return "Remove person or group (" + this.name + ")";
                };
                ;
                return PeoplePickerPrincipalId;
            }());
            exports_1("PeoplePickerPrincipalId", PeoplePickerPrincipalId);
        }
    }
});
//# sourceMappingURL=peoplepicker-principalid.js.map