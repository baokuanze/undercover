module gameOver {
	/**
	 *
	 * @author 
	 *
	 */
	export class GameOverManager extends BaseView{
        private loaded = false;
        public obj: Object;
        private viewManager: view.ViewManager;
        public gameOver: gameOver.GameOverUi;

        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
        }
        public show(type: number,str?:string,overObj?:Object,Fun?:Function,scope?:any): void {
            this.initUI(type,str,overObj,Fun,scope);
//            if(!this.loaded) {
//                this.loading(type);
//            } else {
//                this.initUI(type);
//            }
        }
        private initUI(type: number,str?: string,overObj?: Object,Fun?: Function,scope?: any): void {
            var self: GameOverManager = this;
            if(!this.gameOver) {
                this.gameOver = new GameOverUi();
            }
            this.UIStage.addChild(this.gameOver);
            this.gameOver.setData(type,str,overObj,Fun,scope);
//            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid + "&");
//            Util.sendJson1(GameApp.Manager.dataManager.IP + "/getEnterPage",{ "user_id": GameApp.Manager.dataManager.uid,"bid": GameApp.Manager.dataManager.bid,sign: sign },function(obj: Object) {
//                if(obj["st"] == 1) {
//                    this.topGroupRank.setData(obj["data"]);
//                }
//            },true,self)
        }

        public hide(): void {
            if(this.gameOver && this.gameOver.parent) {
                this.gameOver.parent.removeChild(this.gameOver);
                this.gameOver.clear();
            }
        }
        private load_end(): void {
            this.loaded = true;
//            this.initUI();
        }
        private loading(type:number): void {
//            this.load_end(type);
            //GameApp.Manager.controllerManager.loader.moduleLoading(["topEnter"],this.load_end,this);
        }
	}
}
