module loader {
	export class MainLoading extends eui.Component {
		private lblText0: eui.Label;
		private lblText: eui.Label;
		private lb_version: eui.Label;
		private img_btn_fastPlay: eui.Group;
		private grop_top: eui.Group;
		private img_top_wodi: eui.Image;
		private img_top_wodiMask: egret.Shape;
		private img_test: egret.Shape;
		private lb_edit: eui.EditableText;
		public constructor() {
			super();
			this.skinName = 'src/view/loader/MainLoading.exml';

		}
		public childrenCreated(): void {
			if (Tools.getInstance().isIphone()) {
				this.lblText.fontFamily = "Heiti SC";
				this.lblText0.fontFamily = "Heiti SC";
				this.lb_version.fontFamily = "Heiti SC";
			}
			this.lb_version.text = '当前版本：' + GameApp.Manager.dataManager.version;
			this.img_btn_fastPlay.alpha = 0;
			this.img_btn_fastPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
				GameApp.Manager.controllerManager.gameMainController.show()
				GameApp.Manager.viewManager.loading.hide();
				// GameApp.Manager.controllerManager.gameOverController.show(5);
			}, this, false);

			this.img_top_wodiMask = new egret.Shape();
			this.img_top_wodiMask.graphics.clear();
			this.img_top_wodiMask.graphics.beginFill(0x00ff00);
			this.img_top_wodiMask.graphics.drawRoundRect(0, 0, 180, 180, 60, 60);
			this.img_top_wodiMask.graphics.endFill();
			this.grop_top.addChild(this.img_top_wodiMask);
			this.img_top_wodi.mask = this.img_top_wodiMask;

			if (!Tools.getInstance().isIphone()) {
				window['gameApp']['execute']('gamePageLoadRead');
			}
		}
		public setProgress(current, total): void {
			this.lblText.text = "" + parseInt(current / total * 100 + "") + "%"
		}
		public showBtnImg() {
			var _self = this;
			_self.lblText.visible = false;
			_self.img_btn_fastPlay.alpha = 1
			// egret.Tween.get(_self.img_btn_fastPlay, { loop: true }).to({ alpha: 1 }, 1000).wait(500).to({ alpha: 0 }, 800);
		}
		public resetLoading(): void {
			this.img_btn_fastPlay.alpha = 0;
			this.lblText.visible = true;
		}
		public clear(): void {
			this.img_top_wodiMask = null;
		}
	}
}