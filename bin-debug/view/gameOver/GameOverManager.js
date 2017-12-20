var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameOver;
(function (gameOver) {
    /**
     *
     * @author
     *
     */
    var GameOverManager = (function (_super) {
        __extends(GameOverManager, _super);
        function GameOverManager(viewManager) {
            var _this = _super.call(this, viewManager) || this;
            _this.loaded = false;
            _this.viewManager = viewManager;
            return _this;
        }
        GameOverManager.prototype.show = function (type, str, overObj, Fun, scope) {
            this.initUI(type, str, overObj, Fun, scope);
            //            if(!this.loaded) {
            //                this.loading(type);
            //            } else {
            //                this.initUI(type);
            //            }
        };
        GameOverManager.prototype.initUI = function (type, str, overObj, Fun, scope) {
            var self = this;
            if (!this.gameOver) {
                this.gameOver = new gameOver.GameOverUi();
            }
            this.UIStage.addChild(this.gameOver);
            this.gameOver.setData(type, str, overObj, Fun, scope);
            //            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid + "&");
            //            Util.sendJson1(GameApp.Manager.dataManager.IP + "/getEnterPage",{ "user_id": GameApp.Manager.dataManager.uid,"bid": GameApp.Manager.dataManager.bid,sign: sign },function(obj: Object) {
            //                if(obj["st"] == 1) {
            //                    this.topGroupRank.setData(obj["data"]);
            //                }
            //            },true,self)
        };
        GameOverManager.prototype.hide = function () {
            if (this.gameOver && this.gameOver.parent) {
                this.gameOver.parent.removeChild(this.gameOver);
                this.gameOver.clear();
            }
        };
        GameOverManager.prototype.load_end = function () {
            this.loaded = true;
            //            this.initUI();
        };
        GameOverManager.prototype.loading = function (type) {
            //            this.load_end(type);
            //GameApp.Manager.controllerManager.loader.moduleLoading(["topEnter"],this.load_end,this);
        };
        return GameOverManager;
    }(BaseView));
    gameOver.GameOverManager = GameOverManager;
    __reflect(GameOverManager.prototype, "gameOver.GameOverManager");
})(gameOver || (gameOver = {}));
