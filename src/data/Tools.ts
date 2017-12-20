class Tools {
	public static _instance: Tools = new Tools();
	public constructor() {
	}
	public static getInstance(): Tools {
		return this._instance;
	}
	public getUrlAttribute(name): string {
		var p: string = location.search.substr(1);
		var i: number = p.indexOf(name + '=');
		if (i > -1) {
			var t: string = p.substring(i);
			return t.substring((name + "=").length, t.indexOf("&") > -1 ? t.indexOf("&") : t.length);
		} else {
			return null;
		}
	}
	public isIphone(): boolean {
		var s: string = navigator.userAgent.toLowerCase();
		if (s.indexOf("iPhone") > -1 || s.indexOf("iPad") > -1 || s.indexOf("iphone") > -1) {
			return true;
		} else {
			return false;
		}
	}
	public getStringLen(str,_len:number): string {
        var len = 0;
        var newStr = '';
        for(var i = 0;i < str.length;i++) {
            var length = str.charCodeAt(i);
            if(length >= 0 && length <= 255) {
                len += 1;
            }
            else {
                len += 2;
            }
            if(len < _len) {
                newStr += str[i];
            } else {
                newStr += '...';
                return newStr;
            }
        }
        return newStr;
    }
}