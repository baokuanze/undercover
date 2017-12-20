var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mainUI;
(function (mainUI) {
    var gameMainController = (function () {
        function gameMainController() {
        }
        gameMainController.prototype.show = function () {
            GameApp.Manager.viewManager.gameMainManager.show();
        };
        gameMainController.prototype.hide = function () {
            GameApp.Manager.viewManager.gameMainManager.hide();
        };
        return gameMainController;
    }());
    mainUI.gameMainController = gameMainController;
    __reflect(gameMainController.prototype, "mainUI.gameMainController");
})(mainUI || (mainUI = {}));
