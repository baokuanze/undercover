var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lookInfo;
(function (lookInfo) {
    /**
     *
     * @author
     *
     */
    var LookInfoControll = (function () {
        function LookInfoControll() {
        }
        LookInfoControll.prototype.show = function (type, str, overObj, Fun, scope) {
            GameApp.Manager.viewManager.lookInfoManager.show(type, str, overObj, Fun, scope);
        };
        LookInfoControll.prototype.hide = function () {
            GameApp.Manager.viewManager.lookInfoManager.hide();
        };
        return LookInfoControll;
    }());
    lookInfo.LookInfoControll = LookInfoControll;
    __reflect(LookInfoControll.prototype, "lookInfo.LookInfoControll");
})(lookInfo || (lookInfo = {}));
