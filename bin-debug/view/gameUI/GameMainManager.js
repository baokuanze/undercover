var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mainUI;
(function (mainUI) {
    var GameMainManager = (function (_super) {
        __extends(GameMainManager, _super);
        function GameMainManager(viewManager) {
            var _this = _super.call(this, viewManager) || this;
            _this.viewManager = viewManager;
            return _this;
        }
        GameMainManager.prototype.show = function () {
            if (!this.mainUI) {
                this.mainUI = new mainUI.MainUI();
            }
            this.BottomUIStage.addChild(this.mainUI);
            var _self = this;
            //所有人都包含的            
            socketio.IoConnect.getInstance().enterGame(data.PomeloData.firstComeInGame, {}, function (res) {
                if (res['code'] == 200) {
                    console.log('enterGame', res);
                    var resData = JSON.parse(res['data']);
                    GameApp.Manager.dataManager.room_id = resData['room_id'];
                    _self.mainUI.setData(resData['users'], resData['user_num']);
                }
            }, this);
        };
        GameMainManager.prototype.hide = function () {
            if (this.mainUI && this.mainUI.parent) {
                this.mainUI.clear();
                this.mainUI.parent.removeChild(this.mainUI);
            }
        };
        return GameMainManager;
    }(BaseView));
    mainUI.GameMainManager = GameMainManager;
    __reflect(GameMainManager.prototype, "mainUI.GameMainManager");
})(mainUI || (mainUI = {}));
