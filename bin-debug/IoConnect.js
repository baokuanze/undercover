var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var socketio;
(function (socketio) {
    /**
     *
     * @author
     *
     */
    var IoConnect = (function () {
        function IoConnect() {
            this.pomelo = window["pomelo"];
            this.icount = 0;
            this.cl = false;
            this.host = "123.206.190.223";
            this.port = "3015";
            this.cltime = 0;
            this.initbo = false;
            this.gateConnect = false;
            window["ioconnect"] = this;
        }
        IoConnect.getInstance = function () {
            return this._intance;
        };
        IoConnect.prototype.connectError = function () {
            // console.log("重连gate");
            // var self:IoConnect=this;
            // setTimeout(function(){
            // self.initPomelo(self.bid,self.uid);    
            // },1000)
        };
        /*
            初始化pomelo
         */
        IoConnect.prototype.initPomelo = function (game_id, plat_id, time, sign, ticket_cost, fun, scope) {
            this.fun = fun;
            this.scope = scope;
            this.game_id = game_id;
            this.plat_id = plat_id;
            var self = this;
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
        };
        //链接服务器
        IoConnect.prototype.connectServer = function (host, port, param, scope) {
            var self = this;
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
            });
        };
        /**
         * 断开socket
         */
        IoConnect.prototype.disconnect = function () {
            this.pomelo.disconnect();
        };
        /***
         * socket 监听一些状态
         */
        IoConnect.prototype.connectok = function (res) {
            this.icount = 2;
            var self = this;
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
                    var d = new Date();
                    console.log('heartbeat timeout' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
                    self.cltime = 0;
                    self.cl = true;
                    self.chonglian();
                    GameApp.Manager.controllerManager.gameOverController.show(4);
                });
            }
            this.cl = false;
        };
        /**
         * 断线重连中
         */
        IoConnect.prototype.chonglian = function () {
            if (this.cl) {
                this.icount = 0;
                console.log("断线重连中");
                this.gateConnect = false;
                if (this.cltime == 0) {
                    this.cltime = 1000;
                    var self = this;
                    if (IoConnect.getInstance().icount != 2) {
                        socketio.IoConnect.getInstance().initPomelo(GameApp.Manager.dataManager.game_id, GameApp.Manager.dataManager.plat_id, GameApp.Manager.dataManager.time, GameApp.Manager.dataManager.sign, GameApp.Manager.dataManager.ticket_cost, self.fun, self.scope);
                    }
                    else {
                        socketio.IoConnect.getInstance().chonglian();
                    }
                }
            }
        };
        /*
            socket接收消息
        */
        IoConnect.prototype.onMessage = function (res, ml) {
            if (ml === void 0) { ml = true; }
            console.log('推送数据', res);
            var allData = JSON.parse(res['data']);
            if (res['type'] == data.PomeloData.goInGame) {
                GameApp.Manager.viewManager.gameMainManager.mainUI.getAllPersonData(allData);
            }
            if (res['type'] == data.PomeloData.leaveGame) {
                GameApp.Manager.viewManager.gameMainManager.mainUI.leaveGame(allData);
            }
            if (res['type'] == data.PomeloData.sendOperation_otherReady) {
                GameApp.Manager.viewManager.gameMainManager.mainUI.goReadyState(allData);
            }
            if (res['type'] == data.PomeloData.sendWords) {
                GameApp.Manager.viewManager.gameMainManager.mainUI.sendWords(allData);
            }
            if (res['type'] == data.PomeloData.isCanSPeack) {
                GameApp.Manager.viewManager.gameMainManager.mainUI.isCanSpeack(allData);
            }
            if (res['type'] == data.PomeloData.startVote) {
                GameApp.Manager.viewManager.gameMainManager.mainUI.stateVote(allData);
            }
            if (res['type'] == data.PomeloData.personClickVote) {
                GameApp.Manager.viewManager.gameMainManager.mainUI.personClickVoteResult(allData);
            }
            if (res['type'] == data.PomeloData.voteResult) {
                GameApp.Manager.viewManager.gameMainManager.mainUI.voteResult(allData);
            }
            if (res['type'] == data.PomeloData.stateSpecialVote) {
                GameApp.Manager.viewManager.gameMainManager.mainUI.stateSpecialVote(allData);
            }
            if (res['type'] == data.PomeloData.putGameResult) {
                GameApp.Manager.viewManager.gameMainManager.mainUI.getGameResult(allData);
            }
            if (res['type'] == data.PomeloData.resetAllPersonData) {
                GameApp.Manager.viewManager.gameMainManager.mainUI.resetAllData(allData);
            }
            if (res['type'] == data.PomeloData.offLine) {
                GameApp.Manager.viewManager.gameMainManager.mainUI.offLine(allData);
            }
            if (res['type'] == data.PomeloData.nextPlayGame) {
            }
            if (res['type'] == data.PomeloData.showPlayerSpeakImg) {
                GameApp.Manager.viewManager.gameMainManager.mainUI.playerSpeakImgState(allData, 1);
            }
            if (res['type'] == data.PomeloData.hidePlayerSpeakImg) {
                GameApp.Manager.viewManager.gameMainManager.mainUI.playerSpeakImgState(allData, 2);
            }
            if (res['type'] == data.PomeloData.sendPlayWords) {
                GameApp.Manager.viewManager.gameMainManager.mainUI.sendUserWords(allData);
            }
            if (res['type'] == data.PomeloData.startSendWord) {
                GameApp.Manager.viewManager.gameMainManager.mainUI.startSendWord(allData);
            }
            if (res['type'] == data.PomeloData.specialDescribe) {
                GameApp.Manager.viewManager.gameMainManager.mainUI.specialDescribe(allData);
            }
            if (res['type'] == data.PomeloData.specialTime) {
                GameApp.Manager.viewManager.gameMainManager.mainUI.specialDescribeAlert(allData);
            }
        };
        /*
            socket发送消息
            type =1 第一次进入
            type = 2 断线重连
        */
        IoConnect.prototype.enterGame = function (type, msg, fun, scope) {
            this.pomelo.request("game.gameHandler.enterGame", { type: type, data: JSON.stringify(msg) }, function (data) {
                if (fun) {
                    fun.call(scope, data);
                }
            });
        };
        /**
         * type :1 准备操作
         */
        IoConnect.prototype.sendOperation = function (type, msg, fun, scope) {
            this.pomelo.request("game.gameHandler.sendOperation", { type: type, data: JSON.stringify(msg) }, function (data) {
                if (fun) {
                    fun.call(scope, data);
                }
            });
        };
        /**
         * type: 1, //发言
         * type: 2, //发言结束
         */
        IoConnect.prototype.chatOperation = function (type, msg, fun, scope) {
            this.pomelo.request("chat.chatHandler.chatOperation", { type: type, data: JSON.stringify(msg) }, function (data) {
                if (fun) {
                    fun.call(scope, data);
                }
            });
        };
        /**
         * 发送语音
         */
        IoConnect.prototype.sendVoice = function (type, msg, fun, scope) {
            this.pomelo.request("chat.chatHandler.sendVoice", { type: type, data: JSON.stringify(msg) }, function (data) {
                if (fun) {
                    fun.call(scope, data);
                }
            });
        };
        /**
         * 关闭语音
         */
        IoConnect.prototype.sendVoiceEnd = function (type, msg, fun, scope) {
            this.pomelo.request("chat.chatHandler.sendVoiceEnd", { type: type, data: JSON.stringify(msg) }, function (data) {
                if (fun) {
                    fun.call(scope, data);
                }
            });
        };
        IoConnect.prototype.specialDescribe = function (type, msg, fun, scope) {
            this.pomelo.request("chat.chatHandler.specialDescribe", { type: type, data: JSON.stringify(msg) }, function (data) {
                if (fun) {
                    fun.call(scope, data);
                }
            });
        };
        IoConnect.prototype.upload = function (type, msg, fun, scope) {
            this.pomelo.request("file.uploadHandler.upload", { type: type, content: JSON.stringify(msg) }, function (data) {
                //  console.log("接收自己监听:" + JSON.stringify(data)+" "+fun);
                if (fun) {
                    fun.call(scope, data);
                }
            });
        };
        IoConnect.prototype.relaveMessage = function (data) {
        };
        IoConnect.prototype.trace = function (msg) {
            console.log(msg);
        };
        return IoConnect;
    }());
    IoConnect._intance = new IoConnect();
    socketio.IoConnect = IoConnect;
    __reflect(IoConnect.prototype, "socketio.IoConnect");
})(socketio || (socketio = {}));
