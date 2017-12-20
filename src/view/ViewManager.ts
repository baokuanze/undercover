module view {
	export class ViewManager {
		private manager: Manager;
		//游戏舞台层
		private UIStage: eui.UILayer;
		//游戏底层UI层
		public BottomUIStage: eui.Group;
		//游戏特效层
		public GameEffect: eui.Group;
		//游戏TopUI层
		public TopUIStage: eui.Group;
		//加载视图
		public loading: loader.Loading;
		//主页视图
		public gameMainManager:mainUI.GameMainManager;
		//结算页面
		public gameOverUiManager:gameOver.GameOverManager;
		//个人信息界面
		public lookInfoManager:lookInfo.LookInfoManager;

		public constructor(manager: Manager) {
			this.manager = manager;
			this.initView();
			this.loading = new loader.Loading(this);
			this.gameMainManager = new mainUI.GameMainManager(this);
			this.gameOverUiManager = new gameOver.GameOverManager(this);
			this.lookInfoManager = new lookInfo.LookInfoManager(this);
		}
		//加载所有底层视图（0-1...）；
		public initView() {
			this.UIStage = new eui.UILayer();
			this.BottomUIStage = new eui.Group();
			this.GameEffect = new eui.Group();
			this.TopUIStage = new eui.Group();

			this.UIStage.addChild(this.BottomUIStage);
			this.UIStage.addChild(this.GameEffect);
			this.UIStage.addChild(this.TopUIStage);
			this.manager.stage.addChild(this.UIStage);
			
			//特效层不让点击
			this.GameEffect.touchChildren = false;
			this.GameEffect.touchEnabled = false;
		}
	}
}