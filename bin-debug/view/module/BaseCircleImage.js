var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var module;
(function (module) {
    /**
     *
     * @author
     *
     */
    var BaseCircleImage = (function (_super) {
        __extends(BaseCircleImage, _super);
        function BaseCircleImage() {
            var _this = _super.call(this) || this;
            _this.anX = 0;
            _this.anY = 0;
            _this.isAnX = false;
            _this.img = new eui.Image();
            _this.imgMask = new egret.Shape;
            _this.addChild(_this.img);
            _this.addChild(_this.imgMask);
            _this.img.mask = _this.imgMask;
            return _this;
        }
        BaseCircleImage.prototype.setData = function (url, cir, anX, anY, kuang) {
            //            console.log("url       ",url)
            this.anX = anX;
            this.anY = anY;
            if (anX > 0 || anY > 0) {
                this.isAnX = true;
            }
            //            if(kuang>0){
            //                this.imgK=new egret.Shape();
            //                this.imgK.graphics.clear();
            //                this.imgK.graphics.beginFill(0xf5ecfe);
            //                this.imgK.graphics.drawCircle((cir) / 2,(cir ) / 2,(cir + kuang*2) / 2);
            //                this.imgK.graphics.endFill();
            ////                this.imgK.cacheAsBitmap=true;
            //                this.addChildAt(this.imgK,0);
            //            }
            this.img.width = cir;
            this.img.height = cir;
            RES.getResByUrl(url, this.load_end, this, RES.ResourceItem.TYPE_IMAGE);
            this.imgMask.graphics.clear();
            this.imgMask.graphics.beginFill(0xff0000);
            this.imgMask.graphics.drawCircle(cir / 2, cir / 2, cir / 2);
            this.imgMask.graphics.endFill();
            //            this.imgMask.width = cir; this.imgMask.height = cir;
        };
        BaseCircleImage.prototype.setBack = function (cir, color, kuang) {
            this.imgK = new egret.Shape();
            this.imgK.graphics.clear();
            this.imgK.graphics.beginFill(color);
            this.imgK.graphics.drawCircle((cir) / 2, (cir) / 2, (cir) / 2);
            this.imgK.graphics.endFill();
            //            this.imgK.cacheAsBitmap = true;
            this.addChild(this.imgK);
            if (kuang > 0) {
                this.imgK = new egret.Shape();
                this.imgK.graphics.clear();
                this.imgK.graphics.beginFill(0xffffff);
                this.imgK.graphics.drawCircle((cir) / 2, (cir) / 2, (cir + kuang * 2) / 2);
                this.imgK.graphics.endFill();
                //                this.imgK.cacheAsBitmap = true;
                this.addChildAt(this.imgK, 0);
            }
            this.width = cir;
            this.height = cir;
        };
        BaseCircleImage.prototype.load_end = function (source) {
            if (!source) {
                this.img.source = 'notImg';
            }
            else {
                this.img.texture = source;
            }
            if (this.isAnX) {
                this.img.x = this.img.x - this.img.width / 2;
                this.img.y = this.img.y - this.img.height / 2;
                this.imgMask.x = this.img.x;
                this.imgMask.y = this.img.y;
            }
        };
        BaseCircleImage.prototype.clear = function () {
            this.img.source = null;
            this.img.x = 0;
            this.img.y = 0;
            this.imgMask.x = 0;
            this.imgMask.x = 0;
            this.imgMask.graphics.clear();
            this.anX = 0;
            this.anY = 0;
            this.isAnX = false;
            if (this.imgK) {
                this.imgK.graphics.clear();
                if (this.imgK.parent)
                    this.imgK.parent.removeChild(this.imgK);
                this.imgK = null;
            }
            if (this.backSp) {
                this.backSp.graphics.clear();
                if (this.backSp.parent)
                    this.backSp.parent.removeChild(this.backSp);
                this.backSp = null;
            }
        };
        return BaseCircleImage;
    }(eui.Group));
    module.BaseCircleImage = BaseCircleImage;
    __reflect(BaseCircleImage.prototype, "module.BaseCircleImage");
})(module || (module = {}));
