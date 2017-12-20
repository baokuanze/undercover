var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var gameOver;
(function (gameOver) {
    /**
     *
     * @author
     *
     */
    var GameOverControll = (function () {
        function GameOverControll() {
        }
        GameOverControll.prototype.show = function (type, str, overObj, Fun, scope) {
            GameApp.Manager.viewManager.gameOverUiManager.show(type, str, overObj, Fun, scope);
        };
        GameOverControll.prototype.hide = function () {
            GameApp.Manager.viewManager.gameOverUiManager.hide();
        };
        return GameOverControll;
    }());
    gameOver.GameOverControll = GameOverControll;
    __reflect(GameOverControll.prototype, "gameOver.GameOverControll");
})(gameOver || (gameOver = {}));
