module module {
	/**
	 *
	 * @author 
	 *
	 */
	export class BaseCircleImage extends eui.Group{
        
    	public data:Object;
    	private img:eui.Image;
    	private imgMask:egret.Shape;
    	private imgK:egret.Shape;
    	private backSp:egret.Shape;
        private anX: number = 0;
        private anY: number = 0;
        private isAnX: boolean = false;
		public constructor() {
    		super();
            this.img = new eui.Image();
            this.imgMask = new egret.Shape;
            this.addChild(this.img);
            this.addChild(this.imgMask);
            this.img.mask=this.imgMask;
		}
        public setData(url: string,cir: number,anX?: number,anY?: number,kuang?:number):void{
//            console.log("url       ",url)
            this.anX = anX;
            this.anY = anY;
            if(anX > 0 || anY > 0) {
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
            RES.getResByUrl(url,this.load_end,this,RES.ResourceItem.TYPE_IMAGE);
            this.imgMask.graphics.clear();
            this.imgMask.graphics.beginFill(0xff0000);
            this.imgMask.graphics.drawCircle(cir / 2,cir / 2,cir / 2);
            this.imgMask.graphics.endFill();
            
//            this.imgMask.width = cir; this.imgMask.height = cir;
		}
        public setBack(cir:number,color:number,kuang?:number):void{
            this.imgK = new egret.Shape();
            this.imgK.graphics.clear();
            this.imgK.graphics.beginFill(color);
            this.imgK.graphics.drawCircle((cir) / 2,(cir) / 2,(cir) / 2);
            this.imgK.graphics.endFill();
//            this.imgK.cacheAsBitmap = true;
            this.addChild(this.imgK);
            if(kuang > 0) {
                this.imgK = new egret.Shape();
                this.imgK.graphics.clear();
                this.imgK.graphics.beginFill(0xffffff);
                this.imgK.graphics.drawCircle((cir) / 2,(cir) / 2,(cir + kuang * 2) / 2);
                this.imgK.graphics.endFill();
//                this.imgK.cacheAsBitmap = true;
                this.addChildAt(this.imgK,0);
            }
            this.width=cir;this.height=cir;
        }
        
        private load_end(source: egret.Texture): void {
            if(!source){
                this.img.source ='notImg'
            }else{
                this.img.texture = source;
            }
            if(this.isAnX) {
                this.img.x=this.img.x-this.img.width/2;
                this.img.y=this.img.y-this.img.height/2;
                this.imgMask.x=this.img.x;
                this.imgMask.y = this.img.y;
            }
        }
        
        public clear():void{
            this.img.source=null;
            this.img.x=0;
            this.img.y=0;
            this.imgMask.x=0;
            this.imgMask.x=0;
            this.imgMask.graphics.clear();
            this.anX = 0;
            this.anY = 0;
            this.isAnX=false;
            if(this.imgK){
                this.imgK.graphics.clear();
                if(this.imgK.parent)
                    this.imgK.parent.removeChild(this.imgK);
                this.imgK=null;
            }
            if(this.backSp) {
                this.backSp.graphics.clear();
                if(this.backSp.parent)
                    this.backSp.parent.removeChild(this.backSp);
                this.backSp = null;
            }
        }
	}
}
