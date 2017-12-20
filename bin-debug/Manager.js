var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Manager = (function () {
    /**
     * 实例化这些对象
     */
    function Manager(_stage) {
        this.stage = _stage;
        this.dataManager = new data.DataManagers();
        this.controllerManager = new controller.ControllerManager();
        this.viewManager = new view.ViewManager(this);
    }
    /**
     * 获取URL参数
     */
    Manager.prototype.start = function () {
        GameApp.Manager.dataManager.game_id = Tools.getInstance().getUrlAttribute("game_id");
        GameApp.Manager.dataManager.plat_id = Tools.getInstance().getUrlAttribute("plat_id");
        GameApp.Manager.dataManager.time = Tools.getInstance().getUrlAttribute("time");
        GameApp.Manager.dataManager.sign = Tools.getInstance().getUrlAttribute("sign");
        GameApp.Manager.dataManager.ticket_cost = Tools.getInstance().getUrlAttribute("ticket_cost");
        this.startGame();
    };
    /**
     * 开始进入游戏
     */
    Manager.prototype.startGame = function () {
        var _self = this;
        this.controllerManager.loader.preloading(function () {
            _self.controllerManager.start();
        }, this);
    };
    return Manager;
}());
__reflect(Manager.prototype, "Manager");
