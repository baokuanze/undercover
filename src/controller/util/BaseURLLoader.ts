module controller.util {
	/**
	 *
	 * @author 
	 *
	 */
    export class BaseURLLoader extends egret.URLLoader {
        private yu: any;
        private callback: Function;
        private ismask: boolean = true;
        public constructor() {
            super();
            this.dataFormat = egret.URLLoaderDataFormat.TEXT;
        }
//        public doPost(url: string,data: string,callBack: Function,zyy?: any): void {
//            this.yu = zyy;
//            this.callback = callBack;
//            this.addEventListener(egret.Event.COMPLETE,this.load_COMPLETE,this);
//            var request: egret.URLRequest = new egret.URLRequest(url);
//            request.method = egret.URLRequestMethod.POST;
//            request.data = new egret.URLVariables(data);
//            this.load(request);
//        }
        private load_COMPLETE(event: egret.Event): void {
            //            if(!this.ismask) return;
            // GameApp.Manager.viewManager.removeLoading();
            //var loader: egret.URLLoader = <egret.URLLoader> event.target;
            this.removeEventListener(egret.Event.COMPLETE,this.load_COMPLETE,this);
            var data: egret.URLVariables = this.data;
            var obj: Object = JSON.parse(data.toString());
            this.yu ? this.callback.call(this.yu,obj) : this.callback(obj);
            this.callback = null;
            this.yu = null;
        }
        public sendJson(url: string,data: Object,callBack: Function,isPost: Boolean = true,scope?: any,ismask: boolean = true): void {
            this.ismask = ismask;
            if(ismask)
                // GameApp.Manager.viewManager.createLoading();
            this.yu = scope;
            this.callback = callBack;

            var _data: string = "";
            if(data) {
                for(var key in data) {
                    _data += key + "=" + data[key] + "&";
                }
                if(_data.length > 0) _data = _data.substring(0,_data.length - 1);
            }
            this.addEventListener(egret.Event.COMPLETE,this.load_COMPLETE,this);
            var request: egret.URLRequest = new egret.URLRequest(url);
//            request.method = isPost ? egret.URLRequestMethod.POST : egret.URLRequestMethod.GET;
            request.method = egret.URLRequestMethod.GET;
            request.data = new egret.URLVariables(_data);

            this.load(request);
//            var request = new egret.HttpRequest();
//            request.responseType = egret.HttpResponseType.TEXT;
//            request.open(GameApp.Manager.dataManager.IP + "/mainPage",egret.HttpMethod.POST);
//            request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
//            request.send(params);
//            request.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
//            request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
//            request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
        }
        public sendJsonp(url: string,para: string,data: Object,callBack: Function,scope: any): void {
            this.yu = scope;
            this.callback = callBack;
            var _data: string = "";
            if(data) {
                for(var key in data) {
                    _data += key + "=" + data[key] + "&";
                }
                if(_data.length > 0) _data = "&" + _data.substring(0,_data.length - 1);
            }
            var req: egret.URLRequest = new egret.URLRequest(url + "?" + para + "=");
            req.method =  egret.URLRequestMethod.POST;
            this._request = req;
            JsonpReq.process(this,_data);
            this.addEventListener(egret.Event.COMPLETE,this.load_COMPLETE1,this);
            
//            this.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
//            this.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
        }
        
        private load_COMPLETE1(event: egret.Event): void {
            event.stopPropagation();
            console.log("返回jsonp");
            this.removeEventListener(egret.Event.COMPLETE,this.load_COMPLETE1,this);
            var data: egret.URLVariables = this.data;
            console.log("返  54回jsonp:" + data["st"]);
            this.yu ? this.callback.call(this.yu,data) : this.callback(data);
            this.yu = null;
            this.callback = null;
           
        }
        
        private onPostProgress(event: egret.ProgressEvent):void{
            console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
        }
        private onGetIOError(event: egret.IOErrorEvent): void {
            console.log("get error : " + event);
        }
    }
}
