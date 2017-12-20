module lookInfo {
	/**
	 *
	 * @author 
	 *
	 */
	export class LookInfoManager extends BaseView{
        private loaded = false;
        public obj: Object;
        private viewManager: view.ViewManager;
        public lookInfo: lookInfo.LookInfoUi;

        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
        }
        public show(type: number,str?: string,overObj?: Object,Fun?: Function,scope?: any): void {
            this.initUI(type,str,overObj,Fun,scope);
        }
        private initUI(type: number,str?: string,overObj?: Object,Fun?: Function,scope?: any): void {
            var self: LookInfoManager = this;
            if(!this.lookInfo) {
                this.lookInfo = new lookInfo.LookInfoUi();
            }
            this.BottomUIStage.addChild(this.lookInfo);
            this.lookInfo.setData(type,str,overObj,Fun,scope);
        }

        public hide(): void {
            if(this.lookInfo && this.lookInfo.parent) {
                this.lookInfo.parent.removeChild(this.lookInfo);
                this.lookInfo.clear();
            }
        }
        private load_end(): void {
            this.loaded = true;
        }
        private loading(type: number): void {
        }
	}
}
