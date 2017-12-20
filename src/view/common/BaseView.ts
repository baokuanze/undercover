class BaseView {
	protected state;
	//游戏舞台层
	protected UIStage: eui.UILayer;
	//游戏底层UI层
	protected BottomUIStage: eui.Group;
	//游戏特效层
	protected GameEffect: eui.Group;
	//游戏TopUI层
	protected TopUIStage: eui.Group;

	public constructor(viewManager) {
		this.state = egret.MainContext.instance.stage;
		this.UIStage = viewManager.UIStage;
		this.BottomUIStage = viewManager.BottomUIStage;
		this.GameEffect = viewManager.GameEffect;
		this.TopUIStage = viewManager.TopUIStage;
	}
}