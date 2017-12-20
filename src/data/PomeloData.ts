module data {
	/**
	 *
	 * @author 
	 *
	 */
    export class PomeloData {
        public static firstComeInGame:number = 1;               //第一次进入游戏
        public static reconnetGame:number = 2;                  //断线重连后进入游戏
        public static goInGame: number = 11;                    //进入游戏广播
        public static sendOperation_ready: number = 1;          //准备
        public static leaveGame: number = 13;                   //离开房间的时候
        public static sendOperation_otherReady:number= 12;      //别人准备的时候
        public static sendWords:number = 14;                    //推送词语
        public static isCanSPeack:number = 15;                  //该谁发言
        public static startVote:number = 16;                    //开始投票
        public static voteResult: number = 17;                  //投票结果
        public static stateSpecialVote:number = 18;             //开始特殊投票
        public static playerVote:number = 2;                    //玩家开始投票
        public static personClickVote:number = 19;             //个人投票结果推送
        public static jumpMySelfSpeak:number = 3;               //跳过我的描述
        public static putGameResult:number = 20;                //推送最后结果
        public static resetAllPersonData:number = 21;           //重置所有状态
        public static offLine:number = 22;                      //掉线
        public static nextPlayGame:number = 23;                 //下一轮游戏开始
        public static showPlayerSpeakImg:number = 24;           //显示用户发言开始
        public static hidePlayerSpeakImg: number = 25;          //关闭用户发言开始
        public static getPersonNum:number = 14;                 //获取卧底数量
        public static sendPlayWords:number = 26;                //发送玩家的词语
        public static startSendWord:number = 27;                //显示发言弹窗
        public static specialDescribe:number = 28;              //特殊投票
        public static specialTime:number = 29;                  //特殊投票的时间弹窗

        public constructor() {
        }
    }
}
