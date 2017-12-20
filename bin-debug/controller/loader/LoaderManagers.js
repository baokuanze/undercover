var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var loader;
(function (loader) {
    var LoaderManagers = (function () {
        function LoaderManagers() {
            this._progress = null;
            this._complete = null;
        }
        /**
         * 最初的加载（预先加载）;
         */
        LoaderManagers.prototype.preloading = function (cb, scope) {
            this.scope = scope;
            this.startLoading(['preload'], null, cb);
        };
        /**
         * 游戏主要加载
         */
        LoaderManagers.prototype.mainLoading = function (groupNames, cb, scope) {
            this.scope = scope;
            var int = 0;
            for (var i = 0; i < groupNames.length; i++) {
                RES.loadGroup(groupNames[i], i);
                //检查某个资源是否加载成功
                if (!RES.isGroupLoaded[groupNames[i]]) {
                    int++;
                }
            }
            if (int > 0) {
                GameApp.Manager.viewManager.loading.show();
                this.startLoading(groupNames, function (event) {
                    GameApp.Manager.viewManager.loading.setProgress(event);
                }, function () {
                    cb.call(scope);
                });
            }
            else {
                cb.call(scope);
            }
        };
        /**
         * 开始loading
         */
        LoaderManagers.prototype.startLoading = function (groupNames, onProgress, onComplete) {
            this.loadingGrops = groupNames;
            this._progress = onProgress;
            this._complete = onComplete;
            this.onConfigComplete(null);
        };
        LoaderManagers.prototype.onConfigComplete = function (event) {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            for (var i = 0; i < this.loadingGrops.length; i++) {
                //根据组名加载一组资源(groupName,优先权);
                RES.loadGroup(this.loadingGrops[i], this.loadingGrops.length - i);
            }
        };
        /**
         * 资源加载完成后的回调函数
         */
        LoaderManagers.prototype.onResourceLoadComplete = function (event) {
            if (event.groupName == this.loadingGrops[this.loadingGrops.length - 1]) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                if (this._complete)
                    this._complete.call(this.scope ? this.scope : this, event);
            }
        };
        /**
         * 资源加载出错
         */
        LoaderManagers.prototype.onResourceLoadError = function (event) {
            console.warn("Group:" + event.groupName + " has failed to load");
            this.onResourceLoadComplete(event);
        };
        /**
         * 资源加载进度
         */
        LoaderManagers.prototype.onResourceProgress = function (event) {
            if (this._progress)
                this._progress(event);
        };
        return LoaderManagers;
    }());
    loader.LoaderManagers = LoaderManagers;
    __reflect(LoaderManagers.prototype, "loader.LoaderManagers");
})(loader || (loader = {}));
