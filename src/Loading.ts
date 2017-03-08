class Loading extends egret.Sprite{

    private global;
    public constructor (global) {
        super();

        this.global = global;

        this.createView();
    }
    private textField:egret.TextField;

    private textField_power:egret.TextField;

    private bg:egret.Bitmap;

    private logo:egret.Bitmap;

    private uiContainer:egret.DisplayObjectContainer;

    private w:number;

    private h:number;

    private bgUrl = "resource/assets/Artboard.png";

    private createView():void {

        this.w = this.global.width;
        this.h = this.global.height;

        this.textField = new egret.TextField();
        this.textField.y = 500;
        this.textField.textColor = 0x333333;
        this.textField.size = 23;
        this.textField.width = this.w;
        this.textField.height = 100;
        this.textField.fontFamily = "Black";
        this.textField.textAlign = "center";

        this.textField_power = new egret.TextField();
        this.textField_power.y = this.h * 0.9;
        this.textField_power.textColor = 0x333333;
        this.textField_power.width = this.w;
        this.textField_power.height = 100;
        this.textField_power.size = 20;
        this.textField_power.text = "Powered by Egret Engine";
        this.textField_power.fontFamily = "Black";
        this.textField_power.textAlign = "center";

        var urlLoader:egret.URLLoader = new egret.URLLoader();
        urlLoader.addEventListener(egret.Event.COMPLETE,this.onComplete,this);
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        urlLoader.load(new egret.URLRequest(this.bgUrl));

        this.bg = new egret.Bitmap();

        this.uiContainer = new egret.DisplayObjectContainer();
        this.addChild(this.uiContainer);

        this.addChildAt(this.bg,0);

        this.addChild(this.textField);

        this.addChild(this.textField_power);

    }
    private onComplete(e:egret.Event):void{
        var urlLoader:egret.URLLoader = <egret.URLLoader>e.target;
        var texture = urlLoader.data;
        if(urlLoader._request.url == this.bgUrl) {
            this.bg.texture = texture;
            this.bg.scaleX = this.w/640;
            this.bg.scaleY = this.h/960;
        }

    }
    public setProgress(current, total):void {
        var num:number = Math.floor((current/total)*100);
        this.textField.text = "游戏加载中…" + num + "%";
    }
    public onLoadComplete(callback:Function,thisObj):void{
        callback.call(thisObj);
    }
}