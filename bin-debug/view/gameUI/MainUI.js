var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mainUI;
(function (mainUI) {
    /**
     *
     * @author
     *
     */
    var MainUI = (function (_super) {
        __extends(MainUI, _super);
        function MainUI() {
            var _this = _super.call(this) || this;
            //---------------------------------------
            _this.civiliamNum = 0; //平民的人数
            _this.converNum = 0; //卧底的人数
            _this.isMyReady = false; //自己是否准备
            _this.cutDwnTime = null; //倒计时
            _this.totalPersonData = {}; //所有玩家数据
            _this.allVoteResult = {}; //投票结果
            _this.stateSpeak = false; //开关发言
            _this.my_plate_id = '';
            _this.myWords = ''; //我的词语
            _this.userCanVote = [];
            _this.skinName = "src/view/gameUI/MainUISkin.exml";
            return _this;
        }
        MainUI.prototype.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lb_youWord.fontFamily = "Heiti SC";
                this.lb_undercoverAndCivilian.fontFamily = "Heiti SC";
                this.lb_ready.fontFamily = "Heiti SC";
            }
            this.group_loading.alpha = 1;
            egret.Tween.get(this.img_loading, { loop: true }).to({ rotation: 360 }, 1000);
            this.group_loading.y = (this.stage.stageHeight - this.group_loading.height) / 2;
            var _self = this;
            //准备按钮动作
            this.img_btn_canReady.addEventListener(egret.TouchEvent.TOUCH_TAP, this.readyAc, this);
        };
        /**
         * 填充数据
         */
        MainUI.prototype.setData = function (obj, user_num) {
            egret.Tween.get(this.group_loading).to({ alpha: 0 }, 500);
            window['gameApp']['execute']('joinTeam', GameApp.Manager.dataManager.room_id, this.my_plate_id);
            this.hideGroup(user_num);
            this.fillPlayData(obj);
            this.readyFirst();
            window['gameApp']['userSpeaking_back'] = this.userSpeaking_back;
            window['gameApp']['userSpeakOver_back'] = this.userSpeakOver_back;
            //安卓
            window['userSpeaking_back'] = window['gameApp']['userSpeaking_back'];
            //ios       
            window['IOS_userSpeaking_back'] = window['gameApp']['userSpeaking_back'];
            //安卓关闭
            window['userSpeakOver_back'] = window['gameApp']['userSpeakOver_back'];
            //ios       
            window['IOS_userSpeakOver_back'] = window['gameApp']['userSpeakOver_back'];
        };
        /**
         * 用户聊天
         */
        MainUI.prototype.userSpeaking_back = function (plat_id) {
            socketio.IoConnect.getInstance().sendVoice(data.PomeloData.showPlayerSpeakImg, {
                plat_id: plat_id
            }, function (res) { console.log(res); }, this);
        };
        MainUI.prototype.userSpeakOver_back = function (plat_id) {
            socketio.IoConnect.getInstance().sendVoiceEnd(data.PomeloData.hidePlayerSpeakImg, {
                plat_id: plat_id
            }, function (res) { console.log(res); }, this);
        };
        /**
        * 填充玩家数据
        */
        MainUI.prototype.fillPlayData = function (obj) {
            for (var i in obj) {
                var gamePerson = new personItem.PersonItem();
                gamePerson.setData(obj[i]);
                this.setItemPos(parseInt(obj[i]['pos']), gamePerson);
                var id = obj[i]['plat_id'];
                this.totalPersonData[id] = obj[i];
                this.totalPersonData[id]['personItem'] = gamePerson;
            }
        };
        /**
         * 进入准备阶段倒计时
         */
        MainUI.prototype.readyFirst = function () {
            this.setAllCutDownTime(6);
            this.hideGroupControll(4);
        };
        /**
         * 放置玩家位置
         */
        MainUI.prototype.setItemPos = function (index, gamePerson) {
            if (index == 1) {
                this.group_item_1.addChild(gamePerson);
            }
            else if (index == 2) {
                this.group_item_2.addChild(gamePerson);
            }
            else if (index == 3) {
                this.group_item_3.addChild(gamePerson);
            }
            else if (index == 4) {
                this.group_item_4.addChild(gamePerson);
            }
            else if (index == 5) {
                this.group_item_5.addChild(gamePerson);
            }
            else if (index == 6) {
                this.group_item_6.addChild(gamePerson);
            }
        };
        /**
         * 点击准备按钮动作
         */
        MainUI.prototype.readyAc = function (e) {
            e.stopPropagation();
            var _self = this;
            if (!_self.isMyReady) {
                _self.isMyReady = true;
                socketio.IoConnect.getInstance().sendOperation(data.PomeloData.sendOperation_ready, {}, function (res) {
                    console.log('sendOperation_1_点击准备', res);
                }, this);
                _self.lb_des.text = '';
                _self.lb_title.text = '等待其他玩家进入...';
                if (_self.cutDwnTime) {
                    clearInterval(_self.cutDwnTime);
                    _self.cutDwnTime = null;
                }
                this.hideGroupControll(2);
            }
        };
        /**
         * 进来一个人加一条数据
         */
        MainUI.prototype.getAllPersonData = function (obj) {
            if (obj['room_id'] == GameApp.Manager.dataManager.room_id && obj['userData']['plat_id']) {
                var isHasMyData = false;
                var tempPlat_id = obj['userData']['plat_id'];
                if (this.totalPersonData[tempPlat_id]) {
                    isHasMyData = true;
                }
                if (!isHasMyData && obj['userData']) {
                    var gamePerson = new personItem.PersonItem();
                    gamePerson.setData(obj['userData']);
                    this.setItemPos(parseInt(obj['userData']['pos']), gamePerson);
                    this.totalPersonData[obj['userData']['plat_id']] = obj['userData'];
                    this.totalPersonData[tempPlat_id]['personItem'] = gamePerson;
                }
            }
        };
        /**
         * 玩家离开时调用
         */
        MainUI.prototype.leaveGame = function (obj) {
            //自己离开时            
            if (obj['room_id'] == GameApp.Manager.dataManager.room_id && obj['userData']) {
                if (obj['userData']['plat_id'] == GameApp.Manager.dataManager.userData['plat_id']) {
                    window['gameApp']['execute']('quitTeam', obj['room_id'], obj['userData']['plat_id']);
                    GameApp.Manager.controllerManager.gameMainController.hide();
                    GameApp.Manager.viewManager.loading.show();
                }
                else {
                    //其他人离开房间
                    var elementLen = this.group_personItem.numElements;
                    for (var i = 0; i < elementLen; i++) {
                        var item = this.group_personItem.getElementAt(i);
                        if (item.getElementAt(1)) {
                            var itemChild = item.getElementAt(1);
                            if (itemChild.plat_id == obj['userData']['plat_id']) {
                                itemChild.clear();
                                if (itemChild.parent) {
                                    itemChild.parent.removeChild(itemChild);
                                }
                                delete this.totalPersonData[obj['userData']['plat_id']];
                                break;
                            }
                        }
                    }
                }
            }
        };
        /**
        * 点击准备进入准备状态
        */
        MainUI.prototype.goReadyState = function (obj) {
            if (obj['userData'] && obj['userData']['plat_id']) {
                var tempPlat_id = obj['userData']['plat_id'];
                this.totalPersonData[tempPlat_id]['personItem'].goInReady();
            }
        };
        /**
         * 玩家全部到齐后推送玩家词语
         */
        MainUI.prototype.sendWords = function (obj) {
            this.speaking(0);
            GameApp.Manager.controllerManager.gameOverController.show(1, obj['word']);
            this.myWords = obj['word'];
            this.setCoverNum(parseInt(obj['civilian_num']), parseInt(obj['undercover_num']));
            this.lb_youWord.text = '我的词语：' + obj['word'];
            this.hideGroupControll(5);
            //关闭所有准备状态
            var elementLen = this.group_personItem.numElements;
            for (var i = 0; i < elementLen; i++) {
                var item = this.group_personItem.getElementAt(i);
                if (item.$children.length > 1) {
                    var itemChild = item['$children'][1];
                    itemChild.cancleReady();
                }
            }
        };
        /**
         * 玩家进入发言阶段
         */
        MainUI.prototype.isCanSpeack = function (obj) {
            if (obj['plat_id']) {
                if (obj['plat_id'] == GameApp.Manager.dataManager.userData['plat_id']) {
                    this.hideGroupControll(1);
                    this.setAllCutDownTime(1);
                }
                else {
                    this.hideGroupControll(3);
                    this.setAllCutDownTime(2, obj['plat_id']);
                    var _self = this;
                }
                for (var i in this.totalPersonData) {
                    if (i == obj['plat_id'] && this.totalPersonData[i]['personItem'].live && this.totalPersonData[i]['personItem'].online) {
                        this.totalPersonData[i]['personItem'].canSpeack();
                    }
                    else if (this.totalPersonData[i]['personItem'].group_userSpeaking.visible == true) {
                        this.totalPersonData[i]['personItem'].cancaleSpeack();
                    }
                }
            }
        };
        /**
         *  描述过后开始投票就要
         *  让玩家看到投票的按钮
         *  前提
         * 1： 玩家 不能投自己
         *  屏蔽掉自己的按钮
         * 2： 如果玩家掉线了，也能投票，
         * 但是投票过程中一直处于掉线状态
         */
        MainUI.prototype.stateVote = function (obj) {
            var isLive = false;
            for (var i in this.totalPersonData) {
                if (i == GameApp.Manager.dataManager.userData['plat_id'] &&
                    this.totalPersonData[i]['personItem'].live &&
                    this.totalPersonData[i]['personItem'].online) {
                    isLive = true;
                    break;
                }
            }
            //  this.totalPersonData
            if (this.userCanVote.length > 0) {
                //第二次投票
                for (var p = 0; p < this.userCanVote.length; p++) {
                    for (var t in this.totalPersonData) {
                        if (this.userCanVote[p] == this.totalPersonData[t]['plat_id']) {
                            this.totalPersonData[t]['personItem'].cancaleSpeack();
                            if (isLive) {
                                if (t != GameApp.Manager.dataManager.userData['plat_id'] &&
                                    this.totalPersonData[t]['personItem'].live &&
                                    this.totalPersonData[t]['personItem'].online) {
                                    this.totalPersonData[t]['personItem'].stateVote();
                                }
                            }
                            else {
                                this.totalPersonData[t]['personItem'].cancelVote();
                            }
                        }
                    }
                }
                this.userCanVote.length = 0;
            }
            else {
                //第一次投票
                for (var t in this.totalPersonData) {
                    this.totalPersonData[t]['personItem'].cancaleSpeack();
                    if (isLive) {
                        if (t != GameApp.Manager.dataManager.userData['plat_id'] &&
                            this.totalPersonData[t]['personItem'].live &&
                            this.totalPersonData[t]['personItem'].online) {
                            this.totalPersonData[t]['personItem'].stateVote();
                        }
                    }
                    else {
                        this.totalPersonData[t]['personItem'].cancelVote();
                    }
                }
            }
            //if(isLive){
            //this.hideGroupControll(2);
            //}
            this.hideGroupControll(2);
            this.setAllCutDownTime(3);
        };
        /**
         * 每位玩家点击投票都会有推送
         * 玩家点击投票推送的数据
         * type 19
         */
        MainUI.prototype.personClickVoteResult = function (obj) {
            if (!this.allVoteResult[obj['vote_to_id']]) {
                this.allVoteResult[obj['vote_to_id']] = [];
            }
            this.allVoteResult[obj['vote_to_id']].push(obj['vote_from_id']);
            //已经点了投票按钮
            if (!GameApp.Manager.dataManager.isCanVote) {
                for (var i in this.totalPersonData) {
                    this.totalPersonData[i]['personItem'].cancelVote();
                    for (var j in this.allVoteResult) {
                        if (i == j) {
                            this.totalPersonData[i]['personItem'].showListVotePerson(this.allVoteResult[j], this.totalPersonData);
                            break;
                        }
                    }
                }
            }
        };
        /**
         * 特殊投票
         * 平局的时候
         */
        MainUI.prototype.stateSpecialVote = function (obj) {
            if (obj && obj['users']) {
                var users = obj['users'], pos = '';
                this.userCanVote.length = 0;
                this.userCanVote = users;
                var isLive = false;
                for (var i in this.totalPersonData) {
                    if (i == GameApp.Manager.dataManager.userData['plat_id'] &&
                        this.totalPersonData[i]['personItem'].live &&
                        this.totalPersonData[i]['personItem'].online) {
                        isLive = true;
                        break;
                    }
                }
                if (isLive) {
                    for (var t in this.totalPersonData) {
                        this.totalPersonData[t]['personItem'].cancelVote();
                        this.totalPersonData[t]['personItem'].clearData();
                        for (var a = 0; a < users.length; a++) {
                            if (users[a] == this.totalPersonData[t]['plat_id']) {
                                this.totalPersonData[t]['delete'] = true;
                            }
                        }
                    }
                    //清理说话
                    for (var q in this.totalPersonData) {
                        if (!this.totalPersonData[q]['delete']) {
                            this.totalPersonData[q]['personItem'].clearPersonWord();
                        }
                    }
                    for (var j = 0; j < users.length; j++) {
                        var tempId = users[j];
                        if (this.totalPersonData[tempId] && tempId != GameApp.Manager.dataManager.userData['plat_id'] &&
                            this.totalPersonData[tempId]['personItem'].live &&
                            this.totalPersonData[tempId]['personItem'].online) {
                            this.totalPersonData[tempId]['personItem'].stateVote();
                        }
                        if (pos == "") {
                            pos += this.totalPersonData[tempId]['personItem'].pos;
                        }
                        else {
                            pos += "，" + this.totalPersonData[tempId]['personItem'].pos;
                        }
                    }
                }
                else {
                    for (var i in this.totalPersonData) {
                        this.totalPersonData[i]['personItem'].cancelVote();
                    }
                }
                GameApp.Manager.controllerManager.gameOverController.show(2, pos);
                //if(isLive) {
                //this.hideGroupControll(2);
                //}
                this.hideGroupControll(2);
                this.setAllCutDownTime(5);
                GameApp.Manager.dataManager.isCanVote = true;
                //清数据                
                this.allVoteResult = {};
            }
        };
        /**
         * 展示投票结果
         * 哪个玩家是卧底
         * 哪个玩家是平民
         * type 17
         */
        MainUI.prototype.voteResult = function (obj) {
            if (obj && obj['users']) {
                var self = this;
                setTimeout(function () {
                    for (var i in self.totalPersonData) {
                        for (var j in obj['users']) {
                            if (obj['users'][j]['plat_id'] == i) {
                                if (obj['users'][j]['role'] == 1) {
                                    self.civiliamNum -= 1;
                                }
                                else if (obj['users'][j]['role'] == 2) {
                                    self.converNum -= 1;
                                }
                                self.setCoverNum(self.civiliamNum, self.converNum);
                                self.totalPersonData[i]['personItem'].showVoteResult(obj['users'][j]['role']);
                                self.totalPersonData[i]['personItem'].live = false;
                            }
                        }
                        /**
                         * 清理掉所有投票人数
                         * 隐藏掉所有的投票按钮
                         * 隐藏掉所有的说话动画小图
                         * 隐藏掉所有投票列表group
                         * 清理说话的文字
                         */
                        self.totalPersonData[i]['personItem'].clearData();
                        self.totalPersonData[i]['personItem'].cancelVote();
                        self.totalPersonData[i]['personItem'].hideUersSpeakingImg();
                        self.totalPersonData[i]['personItem'].hideListVotePerson();
                        self.totalPersonData[i]['personItem'].clearPersonWord();
                    }
                    self.hideGroupControll(2);
                    self.setAllCutDownTime(4);
                    GameApp.Manager.dataManager.isCanVote = true;
                    self.allVoteResult = {};
                }, 1500);
            }
        };
        /**
         * 游戏结束推送
         * 推送结算页面
         * type 20
         */
        MainUI.prototype.getGameResult = function (obj) {
            this.closeSpeakImg();
            if (this.totalPersonData) {
                obj['totalPerson'] = this.totalPersonData;
            }
            GameApp.Manager.controllerManager.gameOverController.show(0, '', obj, function () {
            }, this);
            if (obj['reward'] && obj['reward'] != null) {
                window['gameApp']['execute']('gameEndAward', obj['reward']['gold'], '0');
            }
            else {
                window['gameApp']['execute']('gameEndAward', '0', '0');
            }
            GameApp.Manager.dataManager.isCanVote = true;
        };
        /**
         * 重置数据
         */
        MainUI.prototype.resetAllData = function (obj) {
            var _self = this;
            _self.speaking(0);
            if (obj && obj['users']) {
                //清理数据
                _self.clear();
                _self.fillPlayData(obj['users']);
                _self.readyFirst();
            }
        };
        /**
         * 玩家掉线
         */
        MainUI.prototype.offLine = function (obj) {
            if (obj['room_id'] == GameApp.Manager.dataManager.room_id && obj['userData']) {
                var tempPlat_id = obj['userData']['plat_id'];
                if (this.totalPersonData && obj['userData']['plat_id'] && this.totalPersonData[tempPlat_id]) {
                    this.totalPersonData[tempPlat_id]['personItem'].showOffLine();
                    this.totalPersonData[tempPlat_id]['personItem'].setPlayerOffLine();
                    this.totalPersonData[tempPlat_id]['personItem'].hideUersSpeakingImg();
                }
            }
        };
        /**
         * 进入下一轮游戏发言
         */
        MainUI.prototype.nextPlayGame = function () {
            GameApp.Manager.controllerManager.gameOverController.show(3, '开始本轮发言！');
            var _self = this;
            // _self.speaking(0);
        };
        /**
         * 点击按钮说话后玩家头像上面的小图标亮起
         * type == 1 开启小图标高亮状态
         * type == 0 关闭小图标
         */
        MainUI.prototype.playerSpeakImgState = function (obj, type) {
            if (obj['room_id'] == GameApp.Manager.dataManager.room_id && obj['userData']) {
                var elementLen = this.group_personItem.numElements;
                for (var i = 0; i < elementLen; i++) {
                    var item = this.group_personItem.getElementAt(i);
                    if (item.getElementAt(1)) {
                        var itemChild = item.getElementAt(1);
                        if (obj['userData']['plat_id'] == itemChild.plat_id) {
                            if (type == 1) {
                                itemChild.showUserSpeakingImg();
                            }
                            else {
                                itemChild.hideUersSpeakingImg();
                            }
                            break;
                        }
                    }
                }
            }
        };
        /**
        * type 26发送词语推送
        */
        MainUI.prototype.sendUserWords = function (obj) {
            if (obj['room_id'] == GameApp.Manager.dataManager.room_id && obj['userData']) {
                var elementLen = this.group_personItem.numElements;
                var words = obj['userData']['msg']['userSpeakWords'];
                for (var i = 0; i < elementLen; i++) {
                    var item = this.group_personItem.getElementAt(i);
                    if (item.getElementAt(1)) {
                        var itemChild = item.getElementAt(1);
                        if (obj['userData']['plat_id'] == itemChild.plat_id) {
                            itemChild.sendWords(words);
                            break;
                        }
                    }
                }
            }
        };
        /**
         * type 27
         * 玩家发送文字信息
         */
        MainUI.prototype.startSendWord = function (obj) {
            var _this = this;
            if (obj['room_id'] == GameApp.Manager.dataManager.room_id) {
                this.setAllCutDownTime(7);
                var plat_id = GameApp.Manager.dataManager.userData['plat_id'];
                if (this.totalPersonData[plat_id]['personItem'].live && this.totalPersonData[plat_id]['personItem'].online) {
                    window['showUserSpeak'](function (str) {
                        var msg = {
                            plat_id: GameApp.Manager.dataManager.userData['plat_id'],
                            userSpeakWords: str,
                            room_id: GameApp.Manager.dataManager.room_id
                        };
                        socketio.IoConnect.getInstance().chatOperation(data.PomeloData.sendPlayWords, msg, function (res) {
                            // console.log('------------点击发送之后的', res)
                        }, _this);
                        _this.hideGroupControll(6);
                    }, '描述你的词语，求含蓄');
                }
                else if (!this.totalPersonData[plat_id]['personItem'].live || !this.totalPersonData[plat_id]['personItem'].online) {
                    this.setAllCutDownTime(7);
                    this.hideGroupControll(6);
                }
            }
        };
        /**
         * 特殊投票
         * type 28
         */
        MainUI.prototype.specialDescribe = function (obj) {
            var users = obj['users'];
            this.userCanVote.length = 0;
            this.userCanVote = users;
            var pos = '';
            for (var j = 0; j < users.length; j++) {
                var tempId = users[j];
                if (pos == "") {
                    pos += this.totalPersonData[tempId]['personItem'].pos;
                }
                else {
                    pos += "，" + this.totalPersonData[tempId]['personItem'].pos;
                }
            }
            for (var i = 0; i < users.length; i++) {
                var plat_id = users[i];
                if (plat_id == GameApp.Manager.dataManager.userData['plat_id']) {
                    // console.log('plat_id', plat_id, '11111');
                    this.setAllCutDownTime(8, '', pos);
                    (function (window, self) {
                        window['showUserSpeak'](function (str) {
                            var msg = {
                                plat_id: GameApp.Manager.dataManager.userData['plat_id'],
                                userSpeakWords: str,
                                room_id: GameApp.Manager.dataManager.room_id
                            };
                            socketio.IoConnect.getInstance().specialDescribe(data.PomeloData.sendPlayWords, msg, function (res) {
                                // console.log('------------特殊投票点击发送之后的', res)
                            }, self);
                            self.hideGroupControll(6);
                        }, '重新描述你的词语，求含蓄');
                    })(window, this);
                    break;
                }
                else {
                    this.setAllCutDownTime(8, '', pos);
                    this.hideGroupControll(6);
                }
            }
        };
        MainUI.prototype.specialDescribeAlert = function (obj) {
            if (obj && obj['users']) {
                var users = obj['users'], pos = '';
                var isLive = false;
                for (var t in this.totalPersonData) {
                    this.totalPersonData[t]['personItem'].cancelVote();
                    this.totalPersonData[t]['personItem'].clearData();
                    this.totalPersonData[t]['personItem'].clearPersonWord();
                }
                for (var j = 0; j < users.length; j++) {
                    var tempId = users[j];
                    if (pos == "") {
                        pos += this.totalPersonData[tempId]['personItem'].pos;
                    }
                    else {
                        pos += "，" + this.totalPersonData[tempId]['personItem'].pos;
                    }
                }
                GameApp.Manager.controllerManager.gameOverController.show(2, pos);
                this.hideGroupControll(5);
                GameApp.Manager.dataManager.isCanVote = true;
                //清数据                
                this.allVoteResult = {};
            }
        };
        /**
         * 1 开始发言
         * 0 关闭发言
         */
        MainUI.prototype.speaking = function (type) {
            if (type == 0 && this.stateSpeak) {
                this.stateSpeak = false;
                window['gameApp']['execute']('userSpeakOver');
                this.closeSpeakImg();
            }
            else if (type == 1 && !this.stateSpeak) {
                this.stateSpeak = true;
                window['gameApp']['execute']('userSpeakBegin');
            }
        };
        /**
        * 关闭说话的图片
        */
        MainUI.prototype.closeSpeakImg = function () {
            var id = GameApp.Manager.dataManager.userData['plat_id'];
            for (var i in this.totalPersonData) {
                if (i == id) {
                    // socketio.IoConnect.getInstance().chatOperation(2, {}, function (e) {
                    // }, this);
                    break;
                }
            }
        };
        /**
         * 设置卧底和平民人数
         */
        MainUI.prototype.setCoverNum = function (civilianNum, undercoverNum) {
            this.civiliamNum = civilianNum;
            this.converNum = undercoverNum;
            if (this.civiliamNum < 0) {
                this.civiliamNum = 0;
            }
            if (this.civiliamNum > 4) {
                this.civiliamNum = 4;
            }
            if (this.converNum < 0) {
                this.converNum = 0;
            }
            if (this.converNum > 2) {
                this.converNum = 2;
            }
            this.lb_undercoverAndCivilian.text = this.converNum + '卧底/' + this.civiliamNum + '平民';
        };
        /**
        * 发言的人倒计时
        * type  1 自己发言 2他人发言 3开始投票 4投票结果 5特殊投票 6准备阶段倒计时 7公共的发送词语
        * plat_id 用户id
        */
        MainUI.prototype.setAllCutDownTime = function (type, plat_id, str) {
            var cutDwnTempTime = 0;
            var _self = this;
            if (_self.cutDwnTime) {
                clearInterval(_self.cutDwnTime);
                _self.cutDwnTime = null;
                window['hideSendTime']();
            }
            if (type == 1 || type == 2) {
                cutDwnTempTime = GameApp.Manager.dataManager.descriptionTime;
                if (type == 1) {
                    _self.lb_des.text = '用语音描述自己的词语, 求含蓄';
                }
                else {
                    _self.lb_des.text = '注意听他人的描述';
                }
            }
            else if (type == 3) {
                cutDwnTempTime = GameApp.Manager.dataManager.voteTime;
                _self.lb_des.text = '怀疑谁是卧底，就投他一票';
            }
            else if (type == 4) {
                cutDwnTempTime = GameApp.Manager.dataManager.voteResultTime;
                _self.lb_des.text = '';
            }
            else if (type == 5) {
                cutDwnTempTime = GameApp.Manager.dataManager.spacialVoteTime;
                _self.lb_des.text = '怀疑谁是卧底，就投他一票';
            }
            else if (type == 6) {
                cutDwnTempTime = GameApp.Manager.dataManager.readyCutDownTime;
                _self.lb_ready.text = '';
            }
            else if (type == 7) {
                cutDwnTempTime = GameApp.Manager.dataManager.commonSendWordsTime;
            }
            else if (type == 8) {
                cutDwnTempTime = GameApp.Manager.dataManager.commonSendWordsTime;
            }
            _self.setCutDownWord(type, cutDwnTempTime, plat_id, str);
            _self.cutDwnTime = setInterval(function () {
                cutDwnTempTime -= 1;
                _self.setCutDownWord(type, cutDwnTempTime, plat_id, str);
                if (cutDwnTempTime <= 0) {
                    clearInterval(_self.cutDwnTime);
                    _self.cutDwnTime = null;
                    _self.hideGroupControll(5);
                    if (type == 7) {
                        window['hideSendTime']();
                    }
                }
            }, 1000);
        };
        /**
         * 设置倒计时时间
         * 设置全部的倒计时
         */
        MainUI.prototype.setCutDownWord = function (type, cutDwnTempTime, plat_id, str) {
            if (type == 1) {
                this.lb_title.textFlow = (new egret.HtmlTextParser).parser('<font color="#f0545e" size="42">‘我’</font>' +
                    '<font color="#292929" size="42">' + '的描述(' + '</font>' +
                    '<font color="#292929" size="42">' + cutDwnTempTime + '</font>' +
                    '<font color="#292929" size="42">' + 's)' + '</font>');
            }
            else if (type == 2) {
                var userName = Tools.getInstance().getStringLen(this.totalPersonData[plat_id]['user_name'], 14);
                this.lb_title.textFlow = (new egret.HtmlTextParser).parser('<font color="#f0545e" size="42">' + '‘' + userName + '’' + '</font>' +
                    '<font color="#292929" size="42">' + '的描述(' + '</font>' +
                    '<font color="#292929" size="42">' + cutDwnTempTime + '</font>' +
                    '<font color="#292929" size="42">' + 's)' + '</font>');
            }
            else if (type == 3) {
                this.lb_title.text = '请投票（' + cutDwnTempTime + 's）';
            }
            else if (type == 4) {
                this.lb_title.text = '投票结果（' + cutDwnTempTime + 's）';
            }
            else if (type == 5) {
                this.lb_title.text = '请投票（' + cutDwnTempTime + 's）';
            }
            else if (type == 6) {
                this.lb_ready.text = '准备（' + cutDwnTempTime + 's）';
            }
            else if (type == 7) {
                this.lb_title.text = '大家的描述时间（' + cutDwnTempTime + 's）';
                window['fillTime'](cutDwnTempTime, this.myWords);
            }
            else if (type == 8) {
                this.lb_title.text = str + '的描述时间（' + cutDwnTempTime + 's）';
                window['fillTime'](cutDwnTempTime, this.myWords);
            }
        };
        /**
         *  type = 1 看到发言按钮 并且能跳过 （自己发言）
         *  type = 2 看到发言按钮 不能跳过   （投票，投票结果，准备到发言）
         *  type = 3 看不到发言按钮 看不到跳过（别人发言）
         *  type = 4 只有准备按钮
         *  type = 5  重置所有转太
         *  type = 6 发送词语
         */
        MainUI.prototype.hideGroupControll = function (type) {
            try {
                this.group_groupControll.visible = false;
                this.group_btn_ready.visible = false;
                this.showGroupControll(type);
            }
            catch (e) {
                alert('切换转太' + e);
            }
        };
        /**
         * 设置状态
         */
        MainUI.prototype.showGroupControll = function (type) {
            if (type == 1) {
                this.group_groupControll.visible = true;
            }
            else if (type == 2) {
                this.group_groupControll.visible = true;
            }
            else if (type == 3) {
                this.group_groupControll.visible = true;
                this.group_btn_ready.visible = true;
            }
            else if (type == 4) {
                this.group_groupControll.visible = false;
                this.group_btn_ready.visible = true;
            }
            else if (type == 5) {
                this.group_groupControll.visible = false;
                this.group_btn_ready.visible = false;
            }
            else if (type == 6) {
                this.group_groupControll.visible = true;
                this.group_btn_ready.visible = false;
            }
        };
        /**
         * 隐藏一些人数
         */
        MainUI.prototype.hideGroup = function (num) {
            var elementLen = this.group_personItem.numElements;
            for (var i = 0; i < elementLen; i++) {
                var item = this.group_personItem.getElementAt(i);
                if (i < num) {
                    item.visible = true;
                }
                else {
                    item.visible = false;
                }
            }
        };
        /**
         * 清理数据
         */
        MainUI.prototype.playerList = function () {
            var elementLen = this.group_personItem.numElements;
            for (var i = 0; i < elementLen; i++) {
                var item = this.group_personItem.getElementAt(i);
                if (item.getElementAt(1)) {
                    var itemChild = item.getElementAt(1);
                    itemChild.clear();
                    if (itemChild.parent) {
                        itemChild.parent.removeChild(itemChild);
                    }
                }
            }
        };
        /**
         * 重置所有数据
         */
        MainUI.prototype.resetMainUiData = function () {
            this.totalPersonData = {};
            this.allVoteResult = {};
            this.userCanVote.length = 0;
            this.lb_ready.text = '准备';
            this.lb_title.text = '';
            this.lb_des.text = '';
            this.lb_youWord.text = '你的词语';
            this.lb_undercoverAndCivilian.text = '0卧底/0平民';
            this.isMyReady = false;
            this.civiliamNum = 0;
            this.converNum = 0;
            GameApp.Manager.dataManager.isCanVote = true;
        };
        MainUI.prototype.clear = function () {
            this.playerList();
            this.resetMainUiData();
        };
        return MainUI;
    }(eui.Component));
    mainUI.MainUI = MainUI;
    __reflect(MainUI.prototype, "mainUI.MainUI");
})(mainUI || (mainUI = {}));
