module socketio {
	/**
	 *
	 * @author 
	 *
	 */
    export class IoConnect {
        public static _intance: IoConnect = new IoConnect();
        public pomelo = window["pomelo"];
        public icount: number = 0;
        public cl: boolean = false;
        public host = "123.206.190.223";
        private port = "3015";
        public cltime: number = 0;
        public initbo: boolean = false;
        private gateTimer: any;
        private gateConnect: boolean = false;

        private game_id;
        private plat_id;
        private timerVar: any;
        private fun: Function;
        private scope: any;
        public constructor() {
            window["ioconnect"] = this;
        }
        public static getInstance(): IoConnect {
            return this._intance;
        }
        public connectError(): void {
            // console.log("重连gate");
            // var self:IoConnect=this;
            // setTimeout(function(){
            // self.initPomelo(self.bid,self.uid);    
            // },1000)
        }
        /*
            初始化pomelo
         */
        public initPomelo(game_id, plat_id, time, sign, ticket_cost, fun: Function, scope: any): void {
            this.fun = fun;
            this.scope = scope;
            this.game_id = game_id;
            this.plat_id = plat_id;
            var self: IoConnect = this;
            this.pomelo = window["pomelo"];
            this.icount = 0;
            this.pomelo.init({
                host: this.host,
                port: this.port,
                log: true
            }, function () {
                self.connectServer(self.host, self.port, { game_id: game_id, plat_id: plat_id, time: time, sign: sign, ticket_cost: ticket_cost }, scope);
            });
            clearTimeout(this.timerVar);
            // this.timerVar = setTimeout(function () {
            //     if (!self.gateConnect) {
            //         self.cltime = 0;
            //         self.cl = true;
            //         self.chonglian();
            //     }
            // }, 2000);
        }
        //链接服务器
        public connectServer(host, port, param, scope): void {
            var self: IoConnect = this;
            this.icount = 1;
            self.pomelo.request("connector.entryHandler.entry", param, function (res) {
                console.log(res, 'res');
                if (res['code'] == 200) {
                    clearTimeout(this.timerVar);
                    self.gateConnect = true;
                    console.log('链接成功：', JSON.parse(res['data']));
                    var data = JSON.parse(res['data']);
                    GameApp.Manager.dataManager.userData = data.userData;
                    var tempScope = scope || this.scope;
                    if (self.fun) {
                        self.fun.call(tempScope);
                        self.fun = null;
                    }
                    self.connectok(res);
                }
            })
        }
        /**
         * 断开socket
         */
        public disconnect(): void {
            this.pomelo.disconnect();
        }
        /***
         * socket 监听一些状态
         */
        public connectok(res): void {
            this.icount = 2;
            var self: IoConnect = this;
            if (!this.initbo) {
                this.initbo = true;
                this.pomelo.on("onMsg", this.onMessage);
                this.pomelo.on('error', function () {
                    console.log('error');
                });
                this.pomelo.on('onKick', function () {
                    console.log('onKick');
                });
                this.pomelo.on('close', function () {
                    console.log('close:' + self.cl);
                    this.cltime = 0;
                    GameApp.Manager.controllerManager.gameOverController.show(4);
                });
                this.pomelo.on('io-error', function () {
                    console.log('io-error');
                    GameApp.Manager.controllerManager.gameOverController.show(4);
                });
                this.pomelo.on('heartbeat timeout', function () {
                    console.log('heartbeat timeout');
                    var d: Date = new Date();
                    console.log('heartbeat timeout' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
                    self.cltime = 0;
                    self.cl = true;
                    self.chonglian();
                    GameApp.Manager.controllerManager.gameOverController.show(4);
                });
            }
            this.cl = false;
        }
        /**
         * 断线重连中
         */
        public chonglian(): void {
            if (this.cl) {
                this.icount = 0;
                console.log("断线重连中");
                this.gateConnect = false;
                if (this.cltime == 0) {
                    this.cltime = 1000;
                    var self: IoConnect = this;
                    if (IoConnect.getInstance().icount != 2) {
                        socketio.IoConnect.getInstance().initPomelo(GameApp.Manager.dataManager.game_id,
                            GameApp.Manager.dataManager.plat_id,
                            GameApp.Manager.dataManager.time,
                            GameApp.Manager.dataManager.sign,
                            GameApp.Manager.dataManager.ticket_cost,
                            self.fun, self.scope);
                    } else {
                        socketio.IoConnect.getInstance().chonglian();
                    }
                }
            }
        }
        /*
            socket接收消息
        */
        private onMessage(res, ml: boolean = true): void {
            console.log('推送数据', res);
            var allData = JSON.parse(res['data']);
            if (res['type'] == data.PomeloData.goInGame) {//type=11 每个人进来都推一次
                GameApp.Manager.viewManager.gameMainManager.mainUI.getAllPersonData(allData);
            }
            if (res['type'] == data.PomeloData.leaveGame) {//type=13 每离开一个人时会调用一次
                GameApp.Manager.viewManager.gameMainManager.mainUI.leaveGame(allData);
            }
            if (res['type'] == data.PomeloData.sendOperation_otherReady) { //type = 12别人准备的时候
                GameApp.Manager.viewManager.gameMainManager.mainUI.goReadyState(allData);
            }
            if (res['type'] == data.PomeloData.sendWords) {// 14推送词语
                GameApp.Manager.viewManager.gameMainManager.mainUI.sendWords(allData);
            }
            if (res['type'] == data.PomeloData.isCanSPeack) {//15该谁发言了
                GameApp.Manager.viewManager.gameMainManager.mainUI.isCanSpeack(allData);
            }
            if (res['type'] == data.PomeloData.startVote) {//16 开始展示投票按钮
                GameApp.Manager.viewManager.gameMainManager.mainUI.stateVote(allData);
            }
            if (res['type'] == data.PomeloData.personClickVote) {//19 个人点击投票推送
                GameApp.Manager.viewManager.gameMainManager.mainUI.personClickVoteResult(allData);
            }
            if (res['type'] == data.PomeloData.voteResult) { //17 展示投票列表
                GameApp.Manager.viewManager.gameMainManager.mainUI.voteResult(allData);
            }
            if (res['type'] == data.PomeloData.stateSpecialVote) {//18 特殊投票
                GameApp.Manager.viewManager.gameMainManager.mainUI.stateSpecialVote(allData);
            }
            if (res['type'] == data.PomeloData.putGameResult) {   //20 游戏结束后推送结果
                GameApp.Manager.viewManager.gameMainManager.mainUI.getGameResult(allData);
            }
            if (res['type'] == data.PomeloData.resetAllPersonData) {//21 游戏结束后进入下一轮游戏前重置所有数据
                GameApp.Manager.viewManager.gameMainManager.mainUI.resetAllData(allData);
            }
            if (res['type'] == data.PomeloData.offLine) {//22 掉线推送
                GameApp.Manager.viewManager.gameMainManager.mainUI.offLine(allData);
            }
            if (res['type'] == data.PomeloData.nextPlayGame) {//23  同一局游戏一轮投票后推送
                // GameApp.Manager.viewManager.gameMainManager.mainUI.nextPlayGame();
            }
            if (res['type'] == data.PomeloData.showPlayerSpeakImg) {//24 显示用户发言的小图片
                GameApp.Manager.viewManager.gameMainManager.mainUI.playerSpeakImgState(allData, 1);
            }
            if (res['type'] == data.PomeloData.hidePlayerSpeakImg) {//25 关闭用户发言的小图片
                GameApp.Manager.viewManager.gameMainManager.mainUI.playerSpeakImgState(allData, 2);
            }
            if (res['type'] == data.PomeloData.sendPlayWords) {   //26 发送文字推送
                GameApp.Manager.viewManager.gameMainManager.mainUI.sendUserWords(allData);
            }
            if (res['type'] == data.PomeloData.startSendWord) {   //27 显示发送的文字弹窗
                GameApp.Manager.viewManager.gameMainManager.mainUI.startSendWord(allData);
            }
            if (res['type'] == data.PomeloData.specialDescribe) {//28
                GameApp.Manager.viewManager.gameMainManager.mainUI.specialDescribe(allData);
            }
            if(res['type'] == data.PomeloData.specialTime){//29  推送弹窗位置信息
                GameApp.Manager.viewManager.gameMainManager.mainUI.specialDescribeAlert(allData);
            }
        }

        /*
            socket发送消息
            type =1 第一次进入
            type = 2 断线重连
        */
        public enterGame(type: number, msg: Object, fun: Function, scope: any): void {
            this.pomelo.request("game.gameHandler.enterGame", { type: type, data: JSON.stringify(msg) }, function (data) {
                if (fun) {
                    fun.call(scope, data);
                }
            });
        }
        /**
         * type :1 准备操作
         */
        public sendOperation(type: number, msg: Object, fun: Function, scope: any): void {
            this.pomelo.request("game.gameHandler.sendOperation", { type: type, data: JSON.stringify(msg) }, function (data) {
                if (fun) {
                    fun.call(scope, data);
                }
            });
        }
        /**
         * type: 1, //发言
         * type: 2, //发言结束
         */
        public chatOperation(type: number, msg: Object, fun: Function, scope: any): void {
            this.pomelo.request("chat.chatHandler.chatOperation", { type: type, data: JSON.stringify(msg) }, function (data) {
                if (fun) {
                    fun.call(scope, data);
                }
            });
        }
        /**
         * 发送语音 
         */
        public sendVoice(type: number, msg: Object, fun: Function, scope: any): void {
            this.pomelo.request("chat.chatHandler.sendVoice", { type: type, data: JSON.stringify(msg) }, function (data) {
                if (fun) {
                    fun.call(scope, data);
                }
            });
        }
        /**
         * 关闭语音
         */
        public sendVoiceEnd(type: number, msg: Object, fun: Function, scope: any): void {
            this.pomelo.request("chat.chatHandler.sendVoiceEnd", { type: type, data: JSON.stringify(msg) }, function (data) {
                if (fun) {
                    fun.call(scope, data);
                }
            });
        }

        public specialDescribe(type: number, msg: Object, fun: Function, scope: any):void {
            this.pomelo.request("chat.chatHandler.specialDescribe", { type: type, data: JSON.stringify(msg) }, function (data) {
                if (fun) {
                    fun.call(scope, data);
                }
            });
        }



        public upload(type: number, msg: Object, fun: Function, scope: any): void {
            this.pomelo.request("file.uploadHandler.upload", { type: type, content: JSON.stringify(msg) }, function (data) {
                //  console.log("接收自己监听:" + JSON.stringify(data)+" "+fun);
                if (fun) {
                    fun.call(scope, data);
                }
            });
        }
        public relaveMessage(data): void {
        }
        private trace(msg: string): void {
            console.log(msg);
        }
    }
}
