var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var personItem;
(function (personItem) {
    /**
     *
     * @author
     *
     */
    var PersonItem = (function (_super) {
        __extends(PersonItem, _super);
        // private static cacheDict: Object = {};
        // public static produce(mtype: string = "1", index: number = 0): PersonItem {
        //     if (PersonItem.cacheDict[mtype] == null) {
        //         PersonItem.cacheDict[mtype] = [];
        //     }
        //     var dict: PersonItem[] = PersonItem.cacheDict[mtype];
        //     var theFighter: PersonItem;
        //     if (dict.length > 0) {
        //         theFighter = dict.pop();
        //     } else {
        //         theFighter = new PersonItem();
        //     }
        //     return theFighter;
        // }
        // /**回收*/
        // public static reclaim(obj: PersonItem, mtype: string = "1"): void {
        //     if (PersonItem.cacheDict[mtype] == null) {
        //         PersonItem.cacheDict[mtype] = [];
        //     }
        //     var dict: PersonItem[] = PersonItem.cacheDict[mtype];
        //     if (dict.indexOf(obj) == -1) {
        //         dict.push(obj);
        //         obj.clear();
        //     }
        // }
        function PersonItem() {
            var _this = _super.call(this) || this;
            _this.isVote = false; //是否投过票
            _this.pos = ''; //玩家的位置
            _this.live = true; //是否活着
            _this.online = true; //是否还在线
            _this.nt = 0;
            _this.nindex = 1;
            _this.maxt = 0;
            _this.playName = '';
            _this.url = '';
            _this.skinName = 'src/view/personItem/PersonItem.exml';
            return _this;
        }
        PersonItem.prototype.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lb_personName.fontFamily = "Heiti SC";
                this.lb_readyed.fontFamily = "Heiti SC";
                this.lb_offLine.fontFamily = 'Heiti SC';
                this.lb_playSpeak.fontFamily = 'Heiti SC';
            }
            var _self = this;
            //点击投票
            this.img_btn_vote.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                e.stopPropagation();
                if (GameApp.Manager.dataManager.isCanVote) {
                    GameApp.Manager.dataManager.isCanVote = false;
                    socketio.IoConnect.getInstance().sendOperation(data.PomeloData.playerVote, { target_id: _self.plat_id }, function (res) {
                        console.log('点击投票', res);
                    }, this);
                }
            }, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                e.stopPropagation();
                if (_self.plat_id == GameApp.Manager.dataManager.userData['plat_id']) {
                    return;
                }
                var userAllData = {
                    user_id: _self.plat_id,
                    user_name: _self.playName,
                    head_img: _self.url
                };
                GameApp.Manager.controllerManager.lookInfoController.show(1, '', userAllData);
            }, this);
        };
        PersonItem.prototype.setData = function (obj) {
            this.plat_id = obj['plat_id'] + '';
            var n = this.plat_id.substr(this.plat_id.length - 1, 1);
            var url = GameApp.Manager.dataManager.imgUrl + '/' + n + '/' + this.plat_id + '/' + this.plat_id + '.jpg';
            console.log(url, '---url');
            this.url = url;
            RES.getResByUrl(url, this.load_end, this, RES.ResourceItem.TYPE_IMAGE);
            this.img_personIndex.source = 'home_index' + obj['pos'];
            this.playName = obj['user_name'] ? obj['user_name'] : '*****';
            this.lb_personName.text = Tools.getInstance().getStringLen(this.playName, 14);
            this.pos = obj['pos'];
            this.live = obj['live'];
            this.online = obj['online'];
            if (obj['readyState']) {
                this.goInReady();
            }
            else {
                this.cancleReady();
            }
            egret.Ticker.getInstance().register(this.tx, this);
        };
        /**
         * 发送玩家写的文字
         */
        PersonItem.prototype.sendWords = function (str) {
            var self = this;
            if (this.personWords && this.personWords.parent) {
                this.personWords.parent.removeChild(this.personWords);
            }
            this.personWords = new personSpeakWords.PersonSpeakWords();
            this.personWords.fillWord(str);
            self.addChild(this.personWords);
            this.personWords.y = 35;
            this.personWords.x = self.width - 170;
            this.personWords.group_message.scaleX = 0;
            this.personWords.group_message.scaleY = 0;
            egret.Tween.get(this.personWords.group_message).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.sineInOut);
        };
        PersonItem.prototype.load_end = function (source) {
            if (!source) {
                this.img_personImg.source = 'home_json.notImg';
            }
            else {
                this.img_personImg.source = source;
            }
        };
        PersonItem.prototype.tx = function (ct) {
            this.nt += ct;
            if (this.nt >= this.maxt) {
                this.nt = 0;
                this.nindex++;
                this.img_personSpeack.source = "s_" + this.nindex;
                if (this.nindex == 3) {
                    this.nindex = 0;
                    this.maxt = 300;
                }
            }
        };
        /**
         *清理数据
         */
        PersonItem.prototype.clearPersonWord = function () {
            if (this.personWords && this.personWords.parent) {
                this.personWords.clearWods();
                this.personWords.parent.removeChild(this.personWords);
            }
        };
        /**
         * 显示准备
         */
        PersonItem.prototype.goInReady = function () {
            this.group_reayed.visible = true;
        };
        /**
         * 取消准备
         */
        PersonItem.prototype.cancleReady = function () {
            this.group_reayed.visible = false;
        };
        /***
         * 显示
         * 谁在描述
         */
        PersonItem.prototype.canSpeack = function () {
            this.group_userSpeaking.visible = true;
        };
        /**
         * 关闭谁在描述
         */
        PersonItem.prototype.cancaleSpeack = function () {
            this.group_userSpeaking.visible = false;
        };
        //开始投票        
        PersonItem.prototype.stateVote = function () {
            this.img_btn_vote.visible = true;
        };
        //结束投票
        PersonItem.prototype.cancelVote = function () {
            this.img_btn_vote.visible = false;
        };
        /**
         * 是平民还是卧底胜利
         */
        PersonItem.prototype.showVoteResult = function (type) {
            if (type == 1) {
                this.img_voteResult.source = 'home_civilian';
            }
            else {
                this.img_voteResult.source = 'home_undercover';
            }
            this.group_voteResult.visible = true;
        };
        /**
         * 隐藏掉是平民还是卧底胜利
         */
        PersonItem.prototype.hideVoteResult = function () {
            this.group_voteResult.visible = false;
        };
        //展示投票列表
        PersonItem.prototype.showListVotePerson = function (arr, obj) {
            this.clearData();
            for (var i = 0; i < arr.length; i++) {
                var tempPlateId = arr[i] + '';
                var n = tempPlateId.substr(tempPlateId.length - 1, 1);
                var urlImg = GameApp.Manager.dataManager.imgUrl + '/' + n + '/' + tempPlateId + '/' + tempPlateId + '.jpg';
                var person = new module.BaseCircleImage();
                person.setData(urlImg, 30);
                this.group_voteListPerson.addChild(person);
            }
            this.group_voteListPerson.visible = true;
        };
        /**
         * 隐藏掉投票列表
         */
        PersonItem.prototype.hideListVotePerson = function () {
            this.group_voteListPerson.visible = false;
        };
        /**
         * 显示掉线
         */
        PersonItem.prototype.showOffLine = function () {
            this.group_offLine.visible = true;
        };
        /**
        * 隐藏掉线
        */
        PersonItem.prototype.hideOffLine = function () {
            this.group_offLine.visible = false;
        };
        /**
         * 正在说话
         */
        PersonItem.prototype.showUserSpeakingImg = function () {
            this.img_personSpeack.visible = true;
        };
        /**
         * 取消说话
         */
        PersonItem.prototype.hideUersSpeakingImg = function () {
            this.img_personSpeack.visible = false;
        };
        /**
         * 让用户掉线
         */
        PersonItem.prototype.setPlayerOffLine = function () {
            this.online = false;
        };
        /**
         * 获取用户在不在线
         */
        PersonItem.prototype.getPlayerOffLine = function () {
            return this.online;
        };
        /**
         * 重置 准备，说话，投票，投票结束后的谁胜利状态
         */
        //        public resetAllVotePersonState(): void {
        //            this.cancleReady();
        //            this.cancaleSpeack();
        //            this.cancelVote();
        //            this.hideVoteResult();
        //            this.hideOffLine();
        //        }
        //        
        //        
        PersonItem.prototype.clear = function () {
            this.isVote = false;
            this.clearData();
            this.clearPersonWord();
            this.hideUersSpeakingImg();
            this.img_personImg.source = null;
            this.lb_personName.text = '';
            this.hideListVotePerson();
            this.maxt = 0;
            this.nt = 0;
            this.nindex = 0;
            //this.resetAllVotePersonState();
            egret.Ticker.getInstance().unregister(this.tx, this);
        };
        /**
         * 清理掉投票人数
         */
        PersonItem.prototype.clearData = function () {
            while (this.group_voteListPerson.numElements > 0) {
                var item = this.group_voteListPerson.getElementAt(this.group_voteListPerson.numElements - 1);
                if (item.parent) {
                    item.parent.removeChild(item);
                }
            }
        };
        return PersonItem;
    }(eui.Component));
    personItem.PersonItem = PersonItem;
    __reflect(PersonItem.prototype, "personItem.PersonItem");
})(personItem || (personItem = {}));
