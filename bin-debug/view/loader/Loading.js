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
    var Loading = (function (_super) {
        __extends(Loading, _super);
        function Loading(viewManager) {
            var _this = _super.call(this, viewManager) || this;
            _this.tips = {
                'main': '正在加载游戏资源...',
                "public": "正在加载公共资源包..."
            };
            _this.viewManager = viewManager;
            return _this;
        }
        Loading.prototype.show = function () {
            if (!this.loadingUI) {
                this.loadingUI = new loader.MainLoading();
            }
            this.BottomUIStage.addChild(this.loadingUI);
        };
        //设置加载进度
        Loading.prototype.setProgress = function (event) {
            if (!this.loadingUI)
                return;
            this.loadingUI.setProgress(event.itemsLoaded, event.itemsTotal);
        };
        Loading.prototype.hide = function () {
            if (this.loadingUI && this.loadingUI.parent) {
                this.loadingUI.clear();
                this.loadingUI.parent.removeChild(this.loadingUI);
            }
        };
        return Loading;
    }(BaseView));
    loader.Loading = Loading;
    __reflect(Loading.prototype, "loader.Loading");
})(loader || (loader = {}));
