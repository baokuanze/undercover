/**
 * Created by Administrator on 2017/8/9.
 */
if(!window.gameApp){
    var gameApp = {};
    window.gameApp = gameApp;
    try{
        var iosFunHandler = function(fun){
            return function(){
                var str = "";
                for(var i=0; i<arguments.length; i++){
                    str += "@"+(arguments[i]||"")
                }
                if(fun)fun(str.substring(1));
            };
        };
        gameApp["shareToFriend"] = iosFunHandler(iOS_shareToFriend);
        gameApp["addFriend"] = iosFunHandler(iOS_addFriend);
        gameApp["sendGift"] = iosFunHandler(iOS_sendGift);
        gameApp["joinTeam"] = iosFunHandler(iOS_joinTeam);
        gameApp["quitTeam"] = iosFunHandler(iOS_quitTeam);
        gameApp["nowPage"] = iosFunHandler(iOS_nowPage);
        gameApp["buyGameTicket"] = iosFunHandler(iOS_buyGameTicket);
        gameApp["gameEndAward"] = iosFunHandler(iOS_gameEndAward);
        gameApp["userSpeakBegin"] = iosFunHandler(iOS_userSpeakBegin);
        gameApp["userSpeakOver"] = iosFunHandler(iOS_userSpeakOver);
        gameApp["gameEndAward"] = iosFunHandler(iOS_gameEndAward);
        gameApp['toUserInfoAct'] = iosFunHandler(iOS_toUserInfoAct);
        gameApp["getUserInfo"] = iosFunHandler(iOS_getUserInfo);
        
        var s = navigator.userAgent.toLowerCase();
        if(s.indexOf("iPhone") > -1 || s.indexOf("iPad") > -1 || s.indexOf("iphone") > -1) {
        } else {
            gameApp["gamePageLoadRead"] = iosFunHandler(iOS_gamePageLoadRead);
        }
    }catch(e){
        // alert(e);
    }
}
window.gameApp.execute = function(fnName){
    if(fnName && arguments.length && this[fnName]){
        var args = [];
        for(var i=1; i<arguments.length; i++){
            args.push(arguments[i]);
        }
        this[fnName].apply(this,args);
    }else{
    }
};


(function(doc, win) {
var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 30 * (clientWidth / 750) + 'px';
    };
if (!doc.addEventListener) return;
win.addEventListener(resizeEvt, recalc, false);
doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);