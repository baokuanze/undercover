var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lookInfo;
(function (lookInfo) {
    /**
     *
     * @author
     *
     */
    var LookInfoManager = (function (_super) {
        __extends(LookInfoManager, _super);
        function LookInfoManager(viewManager) {
            var _this = _super.call(this, viewManager) || this;
            _this.loaded = false;
            _this.viewManager = viewManager;
            return _this;
        }
        LookInfoManager.prototype.show = function (type, str, overObj, Fun, scope) {
            this.initUI(type, str, overObj, Fun, scope);
        };
        LookInfoManager.prototype.initUI = function (type, str, overObj, Fun, scope) {
            var self = this;
            if (!this.lookInfo) {
                this.lookInfo = new lookInfo.LookInfoUi();
            }
            this.BottomUIStage.addChild(this.lookInfo);
            this.lookInfo.setData(type, str, overObj, Fun, scope);
        };
        LookInfoManager.prototype.hide = function () {
            if (this.lookInfo && this.lookInfo.parent) {
                this.lookInfo.parent.removeChild(this.lookInfo);
                this.lookInfo.clear();
            }
        };
        LookInfoManager.prototype.load_end = function () {
            this.loaded = true;
        };
        LookInfoManager.prototype.loading = function (type) {
        };
        return LookInfoManager;
    }(BaseView));
    lookInfo.LookInfoManager = LookInfoManager;
    __reflect(LookInfoManager.prototype, "lookInfo.LookInfoManager");
})(lookInfo || (lookInfo = {}));
