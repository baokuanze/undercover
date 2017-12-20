module gameOver {
	/**
	 *
	 * @author 
	 *
	 */
	export class GameOverControll {
		public constructor() {
    		
		}
        public show(type: number,str?: string,overObj?: Object,Fun?: Function,scope?:any){
            GameApp.Manager.viewManager.gameOverUiManager.show(type,str,overObj,Fun,scope);
		}
		public hide(){
            GameApp.Manager.viewManager.gameOverUiManager.hide();
		}
	}
}
