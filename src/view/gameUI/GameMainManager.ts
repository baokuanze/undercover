module mainUI {
	export class GameMainManager extends BaseView {
		private viewManager: view.ViewManager;
		public mainUI:mainUI.MainUI;
		public constructor(viewManager) {
			super(viewManager);
			this.viewManager = viewManager;
		}
		public show():void{
			if(!this.mainUI){
				this.mainUI = new mainUI.MainUI();
			}
			this.BottomUIStage.addChild(this.mainUI);
			var _self = this;
            //所有人都包含的            
            socketio.IoConnect.getInstance().enterGame(data.PomeloData.firstComeInGame,{},function(res) {
                if(res['code']==200){
                    console.log('enterGame',res)
                    var resData = JSON.parse(res['data']);
                    GameApp.Manager.dataManager.room_id = resData['room_id'];

                    _self.mainUI.setData(resData['users'],resData['user_num']);
                }
            },this)
		}
		public hide():void{
			if(this.mainUI &&　this.mainUI.parent){
				this.mainUI.clear();
				this.mainUI.parent.removeChild(this.mainUI);
			}
		}
	}
}