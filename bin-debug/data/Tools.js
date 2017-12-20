var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Tools = (function () {
    function Tools() {
    }
    Tools.getInstance = function () {
        return this._instance;
    };
    Tools.prototype.getUrlAttribute = function (name) {
        var p = location.search.substr(1);
        var i = p.indexOf(name + '=');
        if (i > -1) {
            var t = p.substring(i);
            return t.substring((name + "=").length, t.indexOf("&") > -1 ? t.indexOf("&") : t.length);
        }
        else {
            return null;
        }
    };
    Tools.prototype.isIphone = function () {
        var s = navigator.userAgent.toLowerCase();
        if (s.indexOf("iPhone") > -1 || s.indexOf("iPad") > -1 || s.indexOf("iphone") > -1) {
            return true;
        }
        else {
            return false;
        }
    };
    Tools.prototype.getStringLen = function (str, _len) {
        var len = 0;
        var newStr = '';
        for (var i = 0; i < str.length; i++) {
            var length = str.charCodeAt(i);
            if (length >= 0 && length <= 255) {
                len += 1;
            }
            else {
                len += 2;
            }
            if (len < _len) {
                newStr += str[i];
            }
            else {
                newStr += '...';
                return newStr;
            }
        }
        return newStr;
    };
    return Tools;
}());
Tools._instance = new Tools();
__reflect(Tools.prototype, "Tools");
