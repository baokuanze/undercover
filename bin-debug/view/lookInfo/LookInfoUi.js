var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lookInfo;
(function (lookInfo) {
    /**
     *
     * @author
     *
     */
    var LookInfoUi = (function (_super) {
        __extends(LookInfoUi, _super);
        function LookInfoUi() {
            var _this = _super.call(this) || this;
            _this.skinName = 'src/view/lookInfo/LookInfo.exml';
            return _this;
        }
        LookInfoUi.prototype.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lb_playName.fontFamily = "Heiti SC";
                this.lb_age.fontFamily = "Heiti SC";
                this.lb_pos.fontFamily = "Heiti SC";
                this.lb_gift.fontFamily = "Heiti SC";
                this.lb_add.fontFamily = "Heiti SC";
                this.lb_lookInfo.fontFamily = "Heiti SC";
            }
            var _self = this;
            this.grop_total.anchorOffsetX = this.grop_total.width / 2;
            this.grop_total.anchorOffsetY = this.grop_total.height / 2;
            this.grop_total.x = (this.stage.stageWidth - this.grop_total.width) / 2 + this.grop_total.anchorOffsetX;
            this.grop_total.y = (this.stage.stageHeight - this.grop_total.height) / 2 + this.grop_total.anchorOffsetY;
            this.img_btn_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                egret.Tween.get(this.grop_total).to({ scaleX: 0, scaleY: 0 }, 300, egret.Ease.sineIn).call(function () {
                    GameApp.Manager.controllerManager.lookInfoController.hide();
                });
            }, this);
            this.rect_btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                egret.Tween.get(this.grop_total).to({ scaleX: 0, scaleY: 0 }, 300, egret.Ease.sineIn).call(function () {
                    GameApp.Manager.controllerManager.lookInfoController.hide();
                });
            }, this);
            this.grop_total.scaleX = 0;
            this.grop_total.scaleY = 0;
            this.rect_btn_sendGift.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                e.stopPropagation();
                window['gameApp']['execute']('sendGift', _self.user_id, _self.user_name);
            }, this);
            this.rect_btn_addFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                e.stopPropagation();
                window['gameApp']['execute']('addFriend', _self.user_id, _self.user_name);
            }, this);
            this.rect_btn_lookInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                e.stopPropagation();
                window['gameApp']['execute']('toUserInfoAct', _self.user_id);
            }, this);
            var g_tw = this.group_threeTotal.width;
            var g_aw = this.group_addFriend.width;
            if (!Tools.getInstance().isIphone()) {
                this.group_sendGift.visible = true;
                this.group_threeTotal.visible = true;
                var tempW = (g_tw - g_aw * 3) / 4;
                this.group_sendGift.x = tempW;
                this.group_sendGift.y = 0;
                this.group_addFriend.x = (tempW * 2) + g_aw;
                ;
                this.group_addFriend.y = 0;
                this.grop_lookInfo.x = (tempW * 3) + (g_aw * 2);
                this.grop_lookInfo.y = 0;
            }
            else {
                this.group_sendGift.visible = false;
                var tempW = (g_tw - g_aw * 2) / 3;
                this.group_addFriend.x = tempW;
                this.group_addFriend.y = 0;
                this.grop_lookInfo.x = (tempW * 2) + g_aw;
                this.grop_lookInfo.y = 0;
                this.group_threeTotal.visible = true;
            }
        };
        LookInfoUi.prototype.setData = function (type, str, Obj, Fun, scope) {
            this.lb_playName.text = Obj['user_name'];
            this.user_name = Obj['user_name'];
            this.user_id = Obj['user_id'];
            var person = new module.BaseCircleImage();
            person.setData(Obj['head_img'], 140);
            this.group_img.addChild(person);
            egret.Tween.get(this.grop_total).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.sineOut);
            window['gameApp']['getUserInfo_back'] = this.getUserInfo_back;
            //安卓
            window['getUserInfo_back'] = window['gameApp']['getUserInfo_back'];
            //ios       
            window['IOS_getUserInfo_back'] = window['gameApp']['getUserInfo_back'];
            window['gameApp']['execute']('getUserInfo', this.user_id);
        };
        /**
         * 客户端调用我的方法
         */
        LookInfoUi.prototype.getUserInfo_back = function (res) {
            var str = res + '';
            var tempRes = str.substr(0, 1);
            var tempRes2 = str.substr(1, 2);
            var temRes3 = str.substr(3);
            var city = GameApp.Manager.dataManager.allCity[temRes3] + '';
            GameApp.Manager.viewManager.lookInfoManager.lookInfo.lb_pos.text = city || '未知地区';
            if (parseInt(tempRes) == 1 || parseInt(tempRes) == 0) {
                GameApp.Manager.viewManager.lookInfoManager.lookInfo.img_sex.source = 'lf_man';
            }
            else {
                GameApp.Manager.viewManager.lookInfoManager.lookInfo.img_sex.source = 'lf_woman';
            }
            if (parseInt(tempRes2) < 10) {
                var tempRes4 = parseInt(res.substr(2, 1));
            }
            else {
                var tempRes4 = parseInt(tempRes2);
            }
            GameApp.Manager.viewManager.lookInfoManager.lookInfo.lb_age.text = tempRes4 + '岁';
        };
        LookInfoUi.prototype.clear = function () {
            egret.Tween.removeTweens(this.grop_total);
            this.lb_playName.text = '';
            this.lb_age.text = '0岁';
            this.lb_pos.text = '未知地区';
            this.grop_total.scaleX = 0;
            this.grop_total.scaleY = 0;
            this.user_id = '';
            this.user_name = '';
            this.group_img.removeChildren();
        };
        return LookInfoUi;
    }(eui.Component));
    lookInfo.LookInfoUi = LookInfoUi;
    __reflect(LookInfoUi.prototype, "lookInfo.LookInfoUi");
})(lookInfo || (lookInfo = {}));
