// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var Util = (function () {
    function Util() {
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
    Util.sendJson1 = function (url, data, callBack, isPost, scope, ismask) {
        if (isPost === void 0) { isPost = true; }
        if (ismask === void 0) { ismask = true; }
        var loader = new controller.util.BaseURLLoader();
        //        loader.sendJson(url,data,callBack,isPost,scope,ismask);
        loader.sendJsonp(url, "callback", data, callBack, scope);
    };
    Util.sendJsonp = function (url, data, callBack, scope) {
        var loader = new controller.util.BaseURLLoader();
        loader.sendJsonp(url, "callback", data, callBack, scope);
    };
    return Util;
}());
__reflect(Util.prototype, "Util");
