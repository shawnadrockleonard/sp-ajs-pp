interface String {
    /**
        Replace it all
    @token string the string token to replace
    @newToken string token to be injected
    @ignoreCase (true) parse liberally (false) parse sensitive
    */
    ReplaceAll(token: string, newToken: string, ignoreCase: boolean): string;

    /**
    Escape a string for REST API posts
    */
    escapeRegexp(queryToEscape: string): string;
}

/**
    Replaces all tokens and returns a string concatenated with the new token
*/
String.prototype.ReplaceAll = function (token: string, newToken: string, ignoreCase: boolean) : string {
    var _token;
    var str = this + "";
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
            return this.split(token).join(newToken);
        }
    }
    return str;
}

String.prototype.escapeRegexp = function (queryToEscape: string): string {
    // Regex: capture the whole query string and replace it with the string
    // that will be used to match the results, for example if the capture is
    // 'a' the result will be \a
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
}