module lookInfo {
	/**
	 *
	 * @author 
	 *
	 */
	export class LookInfoControll {
        public constructor() {

        }
        public show(type: number,str?: string,overObj?: Object,Fun?: Function,scope?: any) {
            GameApp.Manager.viewManager.lookInfoManager.show(type,str,overObj,Fun,scope);
        }
        public hide() {
            GameApp.Manager.viewManager.lookInfoManager.hide();
        }
	}
}
