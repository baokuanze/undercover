var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var controller;
(function (controller) {
    var ControllerManager = (function () {
        function ControllerManager() {
            this.loader = new loader.LoaderManagers();
            this.gameMainController = new mainUI.gameMainController();
            this.gameOverController = new gameOver.GameOverControll();
            this.lookInfoController = new lookInfo.LookInfoControll();
        }
        /**
         * 进入主游戏
         */
        ControllerManager.prototype.start = function () {
            var self = this;
            this.loader.mainLoading(["public"], function () {
                socketio.IoConnect.getInstance().initPomelo(GameApp.Manager.dataManager.game_id, GameApp.Manager.dataManager.plat_id, GameApp.Manager.dataManager.time, GameApp.Manager.dataManager.sign, GameApp.Manager.dataManager.ticket_cost, self.pomeloOK, self);
            }, this);
        };
        ControllerManager.prototype.pomeloOK = function () {
            //链接socket成功之后要做的事情
            GameApp.Manager.viewManager.loading.loadingUI.showBtnImg();
        };
        return ControllerManager;
    }());
    controller.ControllerManager = ControllerManager;
    __reflect(ControllerManager.prototype, "controller.ControllerManager");
})(controller || (controller = {}));
