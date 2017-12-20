var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var view;
(function (view) {
    var ViewManager = (function () {
        function ViewManager(manager) {
            this.manager = manager;
            this.initView();
            this.loading = new loader.Loading(this);
            this.gameMainManager = new mainUI.GameMainManager(this);
            this.gameOverUiManager = new gameOver.GameOverManager(this);
            this.lookInfoManager = new lookInfo.LookInfoManager(this);
        }
        //加载所有底层视图（0-1...）；
        ViewManager.prototype.initView = function () {
            this.UIStage = new eui.UILayer();
            this.BottomUIStage = new eui.Group();
            this.GameEffect = new eui.Group();
            this.TopUIStage = new eui.Group();
            this.UIStage.addChild(this.BottomUIStage);
            this.UIStage.addChild(this.GameEffect);
            this.UIStage.addChild(this.TopUIStage);
            this.manager.stage.addChild(this.UIStage);
            //特效层不让点击
            this.GameEffect.touchChildren = false;
            this.GameEffect.touchEnabled = false;
        };
        return ViewManager;
    }());
    view.ViewManager = ViewManager;
    __reflect(ViewManager.prototype, "view.ViewManager");
})(view || (view = {}));
