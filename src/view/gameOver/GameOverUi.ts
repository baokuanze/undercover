module gameOver {
	/**
	 *
	 * @author 
	 *
	 */
    export class GameOverUi extends eui.Component {
        //------------------------------结算页面的
        public img_gameOverResult: eui.Image;        //平民胜利图片
        public lb_goldNum: eui.Label;                //金币数量
        public lb_civilianWord: eui.Label;           //平民词语
        public lb_undercover: eui.Label;             //卧底词语
        public group_over: eui.Group;                //Group
        public group_civilian: eui.Group;            //平民group
        public group_undercover: eui.Group;          //卧底Group
        public img_btn_closeOverPage: eui.Image;     //关闭
        public colseTimeIntval: any = null;          //倒计时
        public lb_gameOverCutDown: eui.Label;        //倒计时文字
        public group_goldNum: eui.Group;             //金币group
        //------------------------------提示语弹窗
        public lb_Word: eui.Label;                   //描述
        public lb_myWord: eui.Label;                 //我的词语
        public lb_myWordCutDown: eui.Label;          //我的倒计时
        public group_myWord: eui.Group;              //词语的弹窗
        public img_btn_myWord: eui.Image;            //我的词语弹窗按钮
        //-----------------------------回调函数用
        public fun: Function = null;
        public scope: any = null
        public rect_over: eui.Rect;
        public img_fenge: eui.Image;
        public group_btn: eui.Group;
        //----------------------------特殊情况
        public group_resetVote: eui.Group;//特殊情况投票
        public lb_resetVote: eui.Label;
        public img_btn_resetVote: eui.Image;
        public lb_voteTime: eui.Label;
        //------------------------------同局中进入下一轮发言弹窗提示
        public group_nextSpeak: eui.Group;
        public lb_nextGameWord: eui.Label;
        public lb_nextGameTime: eui.Label;
        public img_btn_nextGame: eui.Image;
        //-------------------------------断线重连
        public group_reOnLine: eui.Group;
        public lb_reLine: eui.Label;
        public lb_sure: eui.Label;
        public btn_reline: eui.Rect;
        //--------------------------------我开始描述
        public group_mySpeak: eui.Group;
        public lb_ciyu: eui.Label;
        public edit_yourWord: eui.EditableText;
        public btn_imgYourWord: eui.Image;
        public lb_yourWordTime: eui.Label;

        public constructor() {
            super();
            this.skinName = 'src/view/gameOver/GameOver.exml'
        }

        public childrenCreated(): void {
            if (Tools.getInstance().isIphone()) {
                this.lb_civilianWord.fontFamily = "Heiti SC";
                this.lb_undercover.fontFamily = "Heiti SC";
                this.lb_gameOverCutDown.fontFamily = "Heiti SC";
                this.lb_Word.fontFamily = "Heiti SC";
                this.lb_myWord.fontFamily = "Heiti SC";
                this.lb_myWordCutDown.fontFamily = "Heiti SC";
                this.lb_resetVote.fontFamily = "Heiti SC";
                this.lb_voteTime.fontFamily = "Heiti SC";
                this.lb_ciyu.fontFamily = 'Heiti SC';
                this.lb_yourWordTime.fontFamily = 'Heiti SC';
                this.edit_yourWord.fontFamily = 'Heiti SC'
            }
            // this.edit_yourWord.onfocusOut()
            var _self = this;
            this.img_btn_closeOverPage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (this.colseTimeIntval) {
                    clearInterval(this.colseTimeIntval);
                    this.colseTimeIntval = null;
                }
                if (_self.fun) {
                    _self.fun.call(_self.scope)
                }
                GameApp.Manager.controllerManager.gameOverController.hide();
            }, this)

            this.img_btn_myWord.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (this.colseTimeIntval) {
                    clearInterval(this.colseTimeIntval);
                    this.colseTimeIntval = null;
                }
                GameApp.Manager.controllerManager.gameOverController.hide();
            }, this)

            this.img_btn_resetVote.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (this.colseTimeIntval) {
                    clearInterval(this.colseTimeIntval);
                    this.colseTimeIntval = null;
                }
                GameApp.Manager.controllerManager.gameOverController.hide();
            }, this);
            this.btn_reline.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                e.preventDefault();
                GameApp.Manager.controllerManager.gameOverController.hide();
            }, this);

            this.img_btn_nextGame.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (this.colseTimeIntval) {
                    clearInterval(this.colseTimeIntval);
                    this.colseTimeIntval = null;
                }
                GameApp.Manager.controllerManager.gameOverController.hide();
            }, this)
            this.group_over.visible = false;
            this.group_myWord.visible = false;
            this.group_resetVote.visible = false;
            this.group_reOnLine.visible = false;
            this.group_nextSpeak.visible = false;
            this.group_mySpeak.visible = false;

            this.group_over.y = (this.stage.stageHeight - this.group_over.height) / 2;
            this.group_over.x = (this.stage.stageWidth - this.group_over.width) / 2;

            // this.group_myWord.y = (this.stage.stageHeight - this.group_myWord.height) / 2;
            // this.group_myWord.x = (this.stage.stageWidth - this.group_myWord.width) / 2;

            this.group_resetVote.y = (this.stage.stageHeight - this.group_resetVote.height) / 2;
            this.group_resetVote.x = (this.stage.stageWidth - this.group_resetVote.width) / 2;

            this.group_nextSpeak.y = (this.stage.stageHeight - this.group_nextSpeak.height) / 2;
            this.group_nextSpeak.x = (this.stage.stageWidth - this.group_nextSpeak.width) / 2;

            // this.group_reOnLine.y = (this.stage.stageHeight - this.group_reOnLine.height) / 2;
            // this.group_reOnLine.x = (this.stage.stageWidth - this.group_reOnLine.width) / 2;
        }
		/**
		 * type 0为结算页面  1为我的词语 2:玩家**和**投票是一样的在次投票所产生的 3：下一轮投票 4：掉线
		 * obj{"winner":2,"win":true,"reward":{"gold":100},"winners":[13285674],"losers":[13285673]}"
		 */
        public setData(type: number, str?: string, obj?: Object, fun?: Function, scope?: any): void {
            this.resetAllGroupState()
            if (type == 0) {
                if (obj) {
                    try {
                        var civilianArr = obj['civilian'] ? obj['civilian'] : [];
                        var undercoverArr = obj['undercover'] ? obj['undercover'] : [];
                        var totalPerson = obj['totalPerson'] ? obj['totalPerson'] : [];
                    } catch (e) {
                    }

                    var win = obj['win']; //1赢了   -1输了
                    var winner = obj['winner']; //1平民 2卧底
                    this.lb_civilianWord.textFlow = (new egret.HtmlTextParser).parser(
                        '<font color="#292929" size="30">平民用词：</font>' +
                        '<font color="#f0545e" size="32" bold=true>' + obj['civilian_word'] + '</font>'
                    );
                    this.lb_undercover.textFlow = (new egret.HtmlTextParser).parser(
                        '<font color="#292929" size="30">卧底用词：</font>' +
                        '<font color="#f0545e" size="32" bold=true>' + obj['undercover_word'] + '</font>'
                    );

                    if (winner == 1 && win == 1) {
                        this.img_gameOverResult.source = 'end_civilian_sucess'
                    } else if (winner == 1 && win == -1) {
                        this.img_gameOverResult.source = 'end_undercover_failure'
                    } else if (winner == 2 && win == 1) {
                        this.img_gameOverResult.source = 'end_undercover_sucess'
                    } else if (winner == 2 && win == -1) {
                        this.img_gameOverResult.source = 'end_civilian_failure'
                    }

                    for (var j in totalPerson) {
                        for (var i = 0; i < civilianArr.length; i++) {
                            if (civilianArr[i] == j) {
                                var tempPlateId = totalPerson[j]['plat_id'] + '';
                                var n = tempPlateId.substr(tempPlateId.length - 1, 1);
                                var urlImg = GameApp.Manager.dataManager.imgUrl+'/' + n + '/' + tempPlateId + '/' + tempPlateId + '.jpg';
                                var person: module.BaseCircleImage = new module.BaseCircleImage();
                                person.setData(urlImg, 60);
                                this.group_civilian.addChild(person);
                            }
                        }
                        for (var t = 0; t < undercoverArr.length; t++) {
                            if (undercoverArr[t] == j) {
                                var tempPlateId = totalPerson[j]['plat_id'] + '';
                                var n = tempPlateId.substr(tempPlateId.length - 1, 1);
                                var urlImg = GameApp.Manager.dataManager.imgUrl+'/' + n + '/' + tempPlateId + '/' + tempPlateId + '.jpg';
                                var person: module.BaseCircleImage = new module.BaseCircleImage();
                                person.setData(urlImg, 60);
                                this.group_undercover.addChild(person);
                            }
                        }
                    }

                    if (obj['reward'] && obj['reward'] != null) {
                        this.group_goldNum.visible = true;
                        this.lb_goldNum.text = '金币+' + obj['reward']['gold'];
                    }
                    this.group_over.visible = true;
                }
            } else if (type == 1) {
                this.lb_myWord.text = str;
                this.group_myWord.visible = true;
            } else if (type == 2) {
                this.lb_resetVote.text = '玩家 ' + str + ' 的投票数是相同，请再次描述！';
                this.group_resetVote.visible = true;
            } else if (type == 3) {
                this.lb_nextGameWord.text = str;
                this.group_nextSpeak.visible = true;
            } else if (type == 4) {
                this.group_reOnLine.visible = true;
            } else if (type == 5) {
                this.group_mySpeak.visible = false;
                // this.addEventListener('task',()=>{
                //     console.log('---')
                // },this)
                // this.dispatchEvent('tap', (e) => {
                //     this.edit_yourWord.setFocus();
                // }, this);
            }
            if (fun) {
                this.fun = fun;
                this.scope = scope;
            }
            if (type != 4) {
                this.cutDwonTime(type);
            }
        }

		/**
		 * 倒计时
		 */
        public cutDwonTime(type: number): void {
            var _self = this;
            if (this.colseTimeIntval) {
                clearInterval(this.colseTimeIntval);
                this.colseTimeIntval = null;
            }
            var cutNum;
            if (type == 0) {
                cutNum = GameApp.Manager.dataManager.gameOverAccountsTime;
                _self.lb_gameOverCutDown.text = '(确定' + cutNum + 's)'
            } else if (type == 1) {
                cutNum = GameApp.Manager.dataManager.assigningWordsTime;
                _self.lb_myWordCutDown.text = '(确定' + cutNum + 's)'
            } else if (type == 2) {
                cutNum = GameApp.Manager.dataManager.specialWordTime;
                _self.lb_voteTime.text = '(确定' + cutNum + 's)'
            } else if (type == 3) {
                cutNum = GameApp.Manager.dataManager.stateNextGameTime;
                _self.lb_nextGameTime.text = '(确定' + cutNum + 's)'
            }

            this.colseTimeIntval = setInterval(function () {
                cutNum -= 1;
                if (type == 0) {
                    _self.lb_gameOverCutDown.text = '(确定' + cutNum + 's)'
                } else if (type == 1) {
                    _self.lb_myWordCutDown.text = '(确定' + cutNum + 's)'
                } else if (type == 2) {
                    _self.lb_voteTime.text = '(确定' + cutNum + 's)'
                } else if (type == 3) {
                    _self.lb_nextGameTime.text = '(确定' + cutNum + 's)'
                }
                if (cutNum <= 0) {
                    clearInterval(_self.colseTimeIntval);
                    _self.colseTimeIntval = null;
                    GameApp.Manager.controllerManager.gameOverController.hide();
                }
            }, 980);
        }

        /**
         * 重置所有 group 状态
         */
        public resetAllGroupState(): void {
            this.group_over.visible = false;
            this.group_myWord.visible = false;
            this.group_resetVote.visible = false;
            this.group_nextSpeak.visible = false;
            this.group_reOnLine.visible = false;
            this.group_mySpeak.visible = false;
        }

		/**
		 * 重置所有数据
		 */
        public clear(): void {
            this.group_over.visible = false;
            this.group_myWord.visible = false;
            this.group_resetVote.visible = false;
            this.group_goldNum.visible = false;
            this.group_reOnLine.visible = false;

            this.lb_gameOverCutDown.text = '(确认10s)';
            this.lb_myWordCutDown.text = '(确认10s)';
            this.lb_voteTime.text = '(确认5s)';
            this.lb_voteTime.text = '(确定' + GameApp.Manager.dataManager.stateNextGameTime + 's)'
            if (this.colseTimeIntval) {
                clearInterval(this.colseTimeIntval);
                this.colseTimeIntval = null;
            }

            while (this.group_civilian.numElements > 0) {
                var item: module.BaseCircleImage = <module.BaseCircleImage>this.group_civilian.getElementAt(this.group_civilian.numElements - 1);
                if (item.parent) {
                    item.parent.removeChild(item);
                }
            }
            while (this.group_undercover.numElements > 0) {
                var item: module.BaseCircleImage = <module.BaseCircleImage>this.group_undercover.getElementAt(this.group_undercover.numElements - 1);
                if (item.parent) {
                    item.parent.removeChild(item);
                }
            }
        }
    }
}
