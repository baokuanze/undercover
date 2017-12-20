var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var loader;
(function (loader) {
    var MainLoading = (function (_super) {
        __extends(MainLoading, _super);
        function MainLoading() {
            var _this = _super.call(this) || this;
            _this.skinName = 'src/view/loader/MainLoading.exml';
            return _this;
        }
        MainLoading.prototype.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
                this.lblText0.fontFamily = "Heiti SC";
                this.lb_version.fontFamily = "Heiti SC";
            }
            this.lb_version.text = '当前版本：' + GameApp.Manager.dataManager.version;
            this.img_btn_fastPlay.alpha = 0;
            this.img_btn_fastPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                GameApp.Manager.controllerManager.gameMainController.show();
                GameApp.Manager.viewManager.loading.hide();
                // GameApp.Manager.controllerManager.gameOverController.show(5);
            }, this, false);
            this.img_top_wodiMask = new egret.Shape();
            this.img_top_wodiMask.graphics.clear();
            this.img_top_wodiMask.graphics.beginFill(0x00ff00);
            this.img_top_wodiMask.graphics.drawRoundRect(0, 0, 180, 180, 60, 60);
            this.img_top_wodiMask.graphics.endFill();
            this.grop_top.addChild(this.img_top_wodiMask);
            this.img_top_wodi.mask = this.img_top_wodiMask;
            if (!Tools.getInstance().isIphone()) {
                window['gameApp']['execute']('gamePageLoadRead');
            }
        };
        MainLoading.prototype.setProgress = function (current, total) {
            this.lblText.text = "" + parseInt(current / total * 100 + "") + "%";
        };
        MainLoading.prototype.showBtnImg = function () {
            var _self = this;
            _self.lblText.visible = false;
            _self.img_btn_fastPlay.alpha = 1;
            // egret.Tween.get(_self.img_btn_fastPlay, { loop: true }).to({ alpha: 1 }, 1000).wait(500).to({ alpha: 0 }, 800);
        };
        MainLoading.prototype.resetLoading = function () {
            this.img_btn_fastPlay.alpha = 0;
            this.lblText.visible = true;
        };
        MainLoading.prototype.clear = function () {
            this.img_top_wodiMask = null;
        };
        return MainLoading;
    }(eui.Component));
    loader.MainLoading = MainLoading;
    __reflect(MainLoading.prototype, "loader.MainLoading");
})(loader || (loader = {}));
