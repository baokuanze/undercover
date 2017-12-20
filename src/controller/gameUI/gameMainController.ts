module mainUI {
	export class gameMainController {
		public constructor() {
		}
        public show(): void
        { 
            GameApp.Manager.viewManager.gameMainManager.show();
        }
        public hide(): void
        { 
            GameApp.Manager.viewManager.gameMainManager.hide();
        }
	}
}