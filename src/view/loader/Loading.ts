module loader {
	export class Loading extends BaseView{
		private viewManager: view.ViewManager;
		public loadingUI:MainLoading;
		public constructor(viewManager) {
			super(viewManager);
			this.viewManager = viewManager;
		}
		private tips = {
			'main':'正在加载游戏资源...',
			"public":"正在加载公共资源包..."
		}
		public show():void{
			if(!this.loadingUI){
				this.loadingUI = new loader.MainLoading();
			}
			this.BottomUIStage.addChild(this.loadingUI);
		}

		//设置加载进度
		public setProgress(event:RES.ResourceEvent):void{
			if(!this.loadingUI) return;
            this.loadingUI.setProgress(event.itemsLoaded, event.itemsTotal);
		}
		public hide():void{
			if(this.loadingUI && this.loadingUI.parent){
				this.loadingUI.clear();
				this.loadingUI.parent.removeChild(this.loadingUI);
			}
		}
	}
}