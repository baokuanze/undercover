var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseView = (function () {
    function BaseView(viewManager) {
        this.state = egret.MainContext.instance.stage;
        this.UIStage = viewManager.UIStage;
        this.BottomUIStage = viewManager.BottomUIStage;
        this.GameEffect = viewManager.GameEffect;
        this.TopUIStage = viewManager.TopUIStage;
    }
    return BaseView;
}());
__reflect(BaseView.prototype, "BaseView");
