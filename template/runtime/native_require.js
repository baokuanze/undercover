
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"polyfill/promise.js",
	"bin-debug/view/common/BaseView.js",
	"bin-debug/Manager.js",
	"bin-debug/controller/gameUI/gameMainController.js",
	"bin-debug/controller/gameUI/gameOverController.js",
	"bin-debug/controller/gameUI/lookInfoController.js",
	"bin-debug/controller/loader/LoaderManagers.js",
	"bin-debug/controller/Util.js",
	"bin-debug/controller/util/BaseURLLoader.js",
	"bin-debug/data/DataManagers.js",
	"bin-debug/data/PomeloData.js",
	"bin-debug/data/Tools.js",
	"bin-debug/GameApp.js",
	"bin-debug/IoConnect.js",
	"bin-debug/JsonpReq.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/controller/ControllerManager.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/view/gameOver/GameOverManager.js",
	"bin-debug/view/gameOver/GameOverUi.js",
	"bin-debug/view/gameUI/GameMainManager.js",
	"bin-debug/view/gameUI/MainUI.js",
	"bin-debug/view/loader/Loading.js",
	"bin-debug/view/loader/MainLoading.js",
	"bin-debug/view/lookInfo/LookInfoManager.js",
	"bin-debug/view/lookInfo/LookInfoUi.js",
	"bin-debug/view/module/BaseCircleImage.js",
	"bin-debug/view/personItem/PersonItem.js",
	"bin-debug/view/personSpeakWords/PersonSpeakWords.js",
	"bin-debug/view/ViewManager.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "GameApp",
		frameRate: 60,
		scaleMode: "fixedWidth",
		contentWidth: 750,
		contentHeight: 1334,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};