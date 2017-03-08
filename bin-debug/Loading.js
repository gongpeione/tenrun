var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Loading = (function (_super) {
    __extends(Loading, _super);
    function Loading(global) {
        var _this = _super.call(this) || this;
        _this.bgUrl = "resource/assets/Artboard.png";
        _this.global = global;
        _this.createView();
        return _this;
    }
    Loading.prototype.createView = function () {
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
        var urlLoader = new egret.URLLoader();
        urlLoader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        urlLoader.load(new egret.URLRequest(this.bgUrl));
        this.bg = new egret.Bitmap();
        this.uiContainer = new egret.DisplayObjectContainer();
        this.addChild(this.uiContainer);
        this.addChildAt(this.bg, 0);
        this.addChild(this.textField);
        this.addChild(this.textField_power);
    };
    Loading.prototype.onComplete = function (e) {
        var urlLoader = e.target;
        var texture = urlLoader.data;
        if (urlLoader._request.url == this.bgUrl) {
            this.bg.texture = texture;
            this.bg.scaleX = this.w / 640;
            this.bg.scaleY = this.h / 960;
        }
    };
    Loading.prototype.setProgress = function (current, total) {
        var num = Math.floor((current / total) * 100);
        this.textField.text = "游戏加载中…" + num + "%";
    };
    Loading.prototype.onLoadComplete = function (callback, thisObj) {
        callback.call(thisObj);
    };
    return Loading;
}(egret.Sprite));
__reflect(Loading.prototype, "Loading");
//# sourceMappingURL=Loading.js.map