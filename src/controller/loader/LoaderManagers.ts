module loader {
	export class LoaderManagers {
		private loadingGrops: Array<string>;
		private _progress: Function = null;
		private _complete: Function = null;
		private scope: any;

		public constructor() {
		}
		/**
		 * 最初的加载（预先加载）;
		 */
		public preloading(cb: Function, scope: any): void {
			this.scope = scope;
			this.startLoading(['preload'], null, cb);
		}
		/**
		 * 游戏主要加载
		 */
		public mainLoading(groupNames: Array<string>, cb: Function, scope: any) {
			this.scope = scope;
			var int: number = 0;
			for (var i = 0; i < groupNames.length; i++) {
				RES.loadGroup(groupNames[i], i);
				//检查某个资源是否加载成功
				if (!RES.isGroupLoaded[groupNames[i]]) {
					int++;
				}
			}
			if (int > 0) {
				GameApp.Manager.viewManager.loading.show();
				this.startLoading(groupNames, function (event: RES.ResourceEvent) {
					GameApp.Manager.viewManager.loading.setProgress(event);
				}, function () {
					cb.call(scope);
				})
			}else{
                cb.call(scope);
            }
		}

		/**
		 * 开始loading
		 */
		public startLoading(groupNames: Array<string>, onProgress: Function, onComplete: Function): void {
			this.loadingGrops = groupNames;
			this._progress = onProgress;
			this._complete = onComplete;
			this.onConfigComplete(null);
		}

		public onConfigComplete(event: RES.ResourceEvent): void {
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
			RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
			for (var i = 0; i < this.loadingGrops.length; i++) {
				//根据组名加载一组资源(groupName,优先权);
				RES.loadGroup(this.loadingGrops[i], this.loadingGrops.length - i);
			}
		}
		/**
		 * 资源加载完成后的回调函数
		 */
		public onResourceLoadComplete(event: RES.ResourceEvent): void {
			if (event.groupName == this.loadingGrops[this.loadingGrops.length - 1]) {
				RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
				RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
				RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
				if (this._complete) this._complete.call(this.scope ? this.scope : this, event);
			}
		}
		/**
		 * 资源加载出错
		 */
		public onResourceLoadError(event: RES.ResourceEvent): void {
			console.warn("Group:" + event.groupName + " has failed to load");
			this.onResourceLoadComplete(event);
		}

		/**
		 * 资源加载进度
		 */
		public onResourceProgress(event: RES.ResourceEvent): void {
			if (this._progress) this._progress(event);
		}
	}
}