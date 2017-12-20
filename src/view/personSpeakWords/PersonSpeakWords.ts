module personSpeakWords {
	export class PersonSpeakWords extends eui.Component{
		public lb_message:eui.Label;
		public img_downArrow:eui.Image;
		public group_messageContainer:eui.Group;
		public group_message:eui.Group;
		public constructor() {
			super();
			this.skinName = 'src/view/personSpeakWords/PersonSpeakWords.exml';
		}
		public childrenCreated():void{
		 if (Tools.getInstance().isIphone()) {
                this.lb_message.fontFamily = "Heiti SC";
            }
		}
		public fillWord(des:string){
			this.lb_message.text = des;
			var _self = this;
			setTimeout(function() {
				var height = _self.group_messageContainer.height;
				_self.img_downArrow.y = height-4;
				_self.group_message.anchorOffsetX = _self.group_message.width/2;
				_self.group_message.anchorOffsetY = _self.group_message.height+5;
			}, 5);
		}
		public clearWods(){
			this.lb_message.text = '';
		}
	}
}