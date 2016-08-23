
export class PeoplePickerPrincipalId {
    public login: string;
    public name: string;
    public lookupId: string;
    public email: string;
    public displayName: string;
    public title: string;
    public loginNameDisplay: string;

    private resultDisplay = 'Remove person or group {0}';

    /**
     * Initializes the entity
     */
    constructor(lookupId: string, name: string, email: string, displayName: string, title: string, loginName?: string) {
        this.lookupId = lookupId;
        this.login = email;
        this.name = name;
        this.email = email;
        this.displayName = displayName;
        this.title = title;

        var loginNameDisp = email;
        if (loginName) {
            this.login = loginName;
            if (loginName.indexOf('|') > -1) {
                var segs = loginName.split('|');
                loginNameDisp = loginNameDisp + " " + segs[segs.length - 1];
                loginNameDisp = loginNameDisp.trim();
            }
        }
        this.loginNameDisplay = loginNameDisp;
    }


    /**
     * Returns a cleansed version of the UPN
     */
    public getLookupValue(): string {
        return (this.login) ? this.login.replace("\\", "\\\\") : this.lookupId
    };

    public getResultDisplay(): string {
        return "Remove person or group (" + this.name + ")";
    };
}