var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var data;
(function (data) {
    /**
     *
     * @author
     *
     */
    var PomeloData = (function () {
        function PomeloData() {
        }
        return PomeloData;
    }());
    PomeloData.firstComeInGame = 1; //第一次进入游戏
    PomeloData.reconnetGame = 2; //断线重连后进入游戏
    PomeloData.goInGame = 11; //进入游戏广播
    PomeloData.sendOperation_ready = 1; //准备
    PomeloData.leaveGame = 13; //离开房间的时候
    PomeloData.sendOperation_otherReady = 12; //别人准备的时候
    PomeloData.sendWords = 14; //推送词语
    PomeloData.isCanSPeack = 15; //该谁发言
    PomeloData.startVote = 16; //开始投票
    PomeloData.voteResult = 17; //投票结果
    PomeloData.stateSpecialVote = 18; //开始特殊投票
    PomeloData.playerVote = 2; //玩家开始投票
    PomeloData.personClickVote = 19; //个人投票结果推送
    PomeloData.jumpMySelfSpeak = 3; //跳过我的描述
    PomeloData.putGameResult = 20; //推送最后结果
    PomeloData.resetAllPersonData = 21; //重置所有状态
    PomeloData.offLine = 22; //掉线
    PomeloData.nextPlayGame = 23; //下一轮游戏开始
    PomeloData.showPlayerSpeakImg = 24; //显示用户发言开始
    PomeloData.hidePlayerSpeakImg = 25; //关闭用户发言开始
    PomeloData.getPersonNum = 14; //获取卧底数量
    PomeloData.sendPlayWords = 26; //发送玩家的词语
    PomeloData.startSendWord = 27; //显示发言弹窗
    PomeloData.specialDescribe = 28; //特殊投票
    PomeloData.specialTime = 29; //特殊投票的时间弹窗
    data.PomeloData = PomeloData;
    __reflect(PomeloData.prototype, "data.PomeloData");
})(data || (data = {}));
