// TypeScript file

/**
 *
 * @author 
 *
 */
class Util {
    public constructor() {
    }
    //创建POST请求
//    public static doPost(url: string,data: string,callBack: Function,zyy: any) {
//        var loader: controller.util.BaseURLLoader = new controller.util.BaseURLLoader();
//        loader.doPost(url,data,callBack,zyy);
//    }
//    public static sendJson(url: string,data: Object,callBack: Function,isPost: Boolean = true,scope?: any,ismask: boolean = true): void {
//        var loader: controller.util.BaseURLLoader = new controller.util.BaseURLLoader();
//        loader.sendJson(GameApp.Manager.dataManager.IP + url,data,callBack,isPost,scope,ismask);
//    }
    
    public static sendJson1(url: string,data: Object,callBack: Function,isPost: Boolean = true,scope?: any,ismask: boolean = true): void {
        var loader: controller.util.BaseURLLoader = new controller.util.BaseURLLoader();
//        loader.sendJson(url,data,callBack,isPost,scope,ismask);
        loader.sendJsonp(url,"callback",data,callBack,scope);
    }
    public static sendJsonp(url: string,data: Object,callBack: Function,scope: any): void {
        var loader: controller.util.BaseURLLoader = new controller.util.BaseURLLoader();
        loader.sendJsonp(url,"callback",data,callBack,scope);
    }
}

