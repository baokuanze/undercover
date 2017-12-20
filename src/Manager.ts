class Manager {

	public stage:egret.DisplayObjectContainer;
	public dataManager: data.DataManagers;
	public controllerManager: controller.ControllerManager;
	public viewManager: view.ViewManager;

	/**
	 * 实例化这些对象
	 */
	public constructor(_stage: egret.DisplayObjectContainer) {
		this.stage = _stage;
		this.dataManager = new data.DataManagers();
		this.controllerManager = new controller.ControllerManager();
		this.viewManager = new view.ViewManager(this);
	}
	/**
	 * 获取URL参数
	 */
	public start() {
		GameApp.Manager.dataManager.game_id = Tools.getInstance().getUrlAttribute("game_id");
		GameApp.Manager.dataManager.plat_id = Tools.getInstance().getUrlAttribute("plat_id");
		GameApp.Manager.dataManager.time = Tools.getInstance().getUrlAttribute("time");
		GameApp.Manager.dataManager.sign = Tools.getInstance().getUrlAttribute("sign");
		GameApp.Manager.dataManager.ticket_cost = Tools.getInstance().getUrlAttribute("ticket_cost");
		this.startGame();
	}

	/**
	 * 开始进入游戏
	 */
	public startGame(): void {
		var _self = this;
		this.controllerManager.loader.preloading(function() {
            _self.controllerManager.start();
        },this);
	}
}