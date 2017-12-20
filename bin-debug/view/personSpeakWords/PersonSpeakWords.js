var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var personSpeakWords;
(function (personSpeakWords) {
    var PersonSpeakWords = (function (_super) {
        __extends(PersonSpeakWords, _super);
        function PersonSpeakWords() {
            var _this = _super.call(this) || this;
            _this.skinName = 'src/view/personSpeakWords/PersonSpeakWords.exml';
            return _this;
        }
        PersonSpeakWords.prototype.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lb_message.fontFamily = "Heiti SC";
            }
        };
        PersonSpeakWords.prototype.fillWord = function (des) {
            this.lb_message.text = des;
            var _self = this;
            setTimeout(function () {
                var height = _self.group_messageContainer.height;
                _self.img_downArrow.y = height - 4;
                _self.group_message.anchorOffsetX = _self.group_message.width / 2;
                _self.group_message.anchorOffsetY = _self.group_message.height + 5;
            }, 5);
        };
        PersonSpeakWords.prototype.clearWods = function () {
            this.lb_message.text = '';
        };
        return PersonSpeakWords;
    }(eui.Component));
    personSpeakWords.PersonSpeakWords = PersonSpeakWords;
    __reflect(PersonSpeakWords.prototype, "personSpeakWords.PersonSpeakWords");
})(personSpeakWords || (personSpeakWords = {}));
