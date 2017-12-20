module personItem {
	/**
	 *
	 * @author 
	 *
	 */
    export class PersonItem extends eui.Component {
        private readyGroup: eui.Group;           //投票group
        private img_btn_vote: eui.Image;         //投票按钮
        private lb_personName: eui.Label;        //头片人的名字
        private group_voteListPerson: eui.Group;     //投票人数
        private group_voteResult: eui.Group;     //投票结果
        private img_voteResult: eui.Image;      //投票结果的图片（平民 卧底(默认) 平局）
        private img_personIndex: eui.Image;      //投票人数位置
        private img_personImg: eui.Image;        //人物头像
        public plat_id: string;                 //plat_id   
        public group_reayed: eui.Group;          //已准备
        public lb_readyed: eui.Label;            //已准备文字
        public img_personSpeack: eui.Image;      //可以说话
        public isVote: boolean = false;          //是否投过票
        public pos: string = '';                  //玩家的位置
        public live: boolean = true;             //是否活着
        public lb_offLine: eui.Label;            //链接中
        public group_offLine: eui.Group;         //掉线中
        public online: boolean = true;           //是否还在线
        public s_speack: eui.Image;              //说话
        public nt: number = 0;
        public nindex: number = 1;
        public maxt: number = 0;
        public group_userSpeaking: eui.Group;    //正在说话
        public lb_playSpeak: eui.Label;
        public grop_playerHead: eui.Group;
        public playName: string = '';
        public url: string = '';
        // public personWordArr: Array<personSpeakWords.PersonSpeakWords> //发送文字
        public personWords:personSpeakWords.PersonSpeakWords

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

        public constructor() {
            super();
            this.skinName = 'src/view/personItem/PersonItem.exml'
        }
        public childrenCreated(): void {
            if (Tools.getInstance().isIphone()) {
                this.lb_personName.fontFamily = "Heiti SC";
                this.lb_readyed.fontFamily = "Heiti SC";
                this.lb_offLine.fontFamily = 'Heiti SC';
                this.lb_playSpeak.fontFamily = 'Heiti SC';
            }
            var _self = this;
            //点击投票
            this.img_btn_vote.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
                e.stopPropagation();
                if (GameApp.Manager.dataManager.isCanVote) {
                    GameApp.Manager.dataManager.isCanVote = false;
                    socketio.IoConnect.getInstance().sendOperation(data.PomeloData.playerVote, { target_id: _self.plat_id }, function (res) {
                        console.log('点击投票', res);
                    }, this);
                }
            }, this);

            this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
                e.stopPropagation();
                if (_self.plat_id == GameApp.Manager.dataManager.userData['plat_id']) {
                    return;
                }
                var userAllData = {
                    user_id: _self.plat_id,
                    user_name: _self.playName,
                    head_img: _self.url
                }
                GameApp.Manager.controllerManager.lookInfoController.show(1, '', userAllData);
            }, this);
        }

        public setData(obj: Object): void {
            this.plat_id = obj['plat_id'] + '';
            var n = this.plat_id.substr(this.plat_id.length - 1, 1);
            var url = GameApp.Manager.dataManager.imgUrl+'/' + n + '/' + this.plat_id + '/' + this.plat_id + '.jpg';
            console.log(url,'---url')
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
            } else {
                this.cancleReady();
            }
            egret.Ticker.getInstance().register(this.tx, this);
        }
        /**
         * 发送玩家写的文字
         */
        public sendWords(str: string): void {
            var self = this;
            if(this.personWords && this.personWords.parent){
                this.personWords.parent.removeChild(this.personWords);
            }
            this.personWords = new personSpeakWords.PersonSpeakWords();
            this.personWords .fillWord(str);
            self.addChild(this.personWords );
            this.personWords.y = 35;
            this.personWords.x = self.width - 170;
            this.personWords.group_message.scaleX = 0;
            this.personWords.group_message.scaleY = 0;
            egret.Tween.get(this.personWords.group_message).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.sineInOut);
        }

        public load_end(source: egret.Texture): void {
            if (!source) {
                this.img_personImg.source = 'home_json.notImg'
            } else {
                this.img_personImg.source = source;
            }
        }

        private tx(ct: number): void {
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
        }

        /**
         *清理数据 
         */
        public clearPersonWord() {
            if (this.personWords && this.personWords.parent) {
                this.personWords.clearWods();
                this.personWords.parent.removeChild(this.personWords);
            }
        }

        /**
         * 显示准备
         */
        public goInReady(): void {
            this.group_reayed.visible = true;
        }
        /**
         * 取消准备
         */
        public cancleReady(): void {
            this.group_reayed.visible = false;
        }
        /***
         * 显示
         * 谁在描述
         */
        public canSpeack(): void {
            this.group_userSpeaking.visible = true;
        }
        /**
         * 关闭谁在描述
         */
        public cancaleSpeack(): void {
            this.group_userSpeaking.visible = false;
        }
        //开始投票        
        public stateVote(): void {
            this.img_btn_vote.visible = true;
        }
        //结束投票
        public cancelVote(): void {
            this.img_btn_vote.visible = false;
        }
        /**
         * 是平民还是卧底胜利
         */
        public showVoteResult(type?: number): void {
            if (type == 1) {
                this.img_voteResult.source = 'home_civilian'
            } else {
                this.img_voteResult.source = 'home_undercover'
            }
            this.group_voteResult.visible = true;
        }
        /**
         * 隐藏掉是平民还是卧底胜利
         */
        public hideVoteResult(): void {
            this.group_voteResult.visible = false;
        }
        //展示投票列表
        public showListVotePerson(arr: Array<string>, obj?: Object): void {
            this.clearData();
            for (var i = 0; i < arr.length; i++) {
                var tempPlateId = arr[i] + '';
                var n = tempPlateId.substr(tempPlateId.length - 1, 1);
                var urlImg = GameApp.Manager.dataManager.imgUrl+'/' + n + '/' + tempPlateId + '/' + tempPlateId + '.jpg';
                var person: module.BaseCircleImage = new module.BaseCircleImage();
                person.setData(urlImg, 30);
                this.group_voteListPerson.addChild(person);
            }
            this.group_voteListPerson.visible = true;
        }
        /**
         * 隐藏掉投票列表
         */
        public hideListVotePerson(): void {
            this.group_voteListPerson.visible = false;
        }
        /**
         * 显示掉线
         */
        public showOffLine(): void {
            this.group_offLine.visible = true;
        }
        /**
        * 隐藏掉线
        */
        public hideOffLine(): void {
            this.group_offLine.visible = false;
        }
        /**
         * 正在说话
         */
        public showUserSpeakingImg(): void {
            this.img_personSpeack.visible = true;
        }
        /**
         * 取消说话
         */
        public hideUersSpeakingImg(): void {
            this.img_personSpeack.visible = false;
        }
        /**
         * 让用户掉线
         */
        public setPlayerOffLine(): void {
            this.online = false;
        }
        /**
         * 获取用户在不在线
         */
        public getPlayerOffLine() {
            return this.online;
        }
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

        public clear(): void {
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

        }
        /**
         * 清理掉投票人数
         */
        public clearData(): void {
            while (this.group_voteListPerson.numElements > 0) {
                var item: module.BaseCircleImage = <module.BaseCircleImage>this.group_voteListPerson.getElementAt(this.group_voteListPerson.numElements - 1);
                if (item.parent) {
                    item.parent.removeChild(item);
                }
            }
        }
    }
}











