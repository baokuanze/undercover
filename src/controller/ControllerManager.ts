module controller {
	export class ControllerManager {
		public loader: loader.LoaderManagers;
		public gameMainController:mainUI.gameMainController;
		public gameOverController: gameOver.GameOverControll;
		public lookInfoController: lookInfo.LookInfoControll;
		public constructor() {
			this.loader = new loader.LoaderManagers();
			this.gameMainController = new mainUI.gameMainController();
			this.gameOverController = new gameOver.GameOverControll();
			this.lookInfoController = new lookInfo.LookInfoControll();
		}

		/**
		 * 进入主游戏
		 */
		public start() {
			var self: ControllerManager = this;
			this.loader.mainLoading(["public"], function () {
				socketio.IoConnect.getInstance().initPomelo(GameApp.Manager.dataManager.game_id,
					GameApp.Manager.dataManager.plat_id,
					GameApp.Manager.dataManager.time,
					GameApp.Manager.dataManager.sign,
					GameApp.Manager.dataManager.ticket_cost,
					self.pomeloOK, self);
			}, this);
		}
		public pomeloOK(): void {
			//链接socket成功之后要做的事情
			GameApp.Manager.viewManager.loading.loadingUI.showBtnImg();
		}
	}
}