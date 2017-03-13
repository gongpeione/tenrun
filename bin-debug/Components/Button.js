/// <reference path="../lib/Draw.ts" />
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(buttonStyle) {
        var _this = _super.call(this) || this;
        // Object.assign(this, buttonStyle);
        _this.width = buttonStyle.width || 200;
        _this.height = buttonStyle.height || 100;
        _this.init(buttonStyle);
        _this.cacheAsBitmap = true;
        _this.disabled = false;
        return _this;
    }
    Button.prototype.init = function (buttonStyle) {
        var _this = this;
        this.addRect(buttonStyle);
        if (buttonStyle.img) {
            this.addImg(buttonStyle);
        }
        if (buttonStyle.text) {
            this.addText(buttonStyle);
        }
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            _this.alpha = .8;
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            _this.alpha = 1;
        }, this);
    };
    Button.prototype.addRect = function (buttonStyle) {
        var rect = Draw.rect(null, {
            x: buttonStyle.x || 0,
            y: buttonStyle.y || 0,
            width: this.width,
            height: this.height,
            rotation: buttonStyle.rotation || 0,
        }).brush({
            width: this.width || 0,
            height: this.height || 0,
            background: buttonStyle.background || 0x000000
        });
        this.addChild(rect);
    };
    Button.prototype.addImg = function (buttonStyle) {
        var img = this.img = new egret.Bitmap();
        img.texture = RES.getRes(buttonStyle.img);
        img.width = this.width;
        img.height = this.height;
        this.addChild(img);
    };
    Button.prototype.addText = function (buttonStyle) {
        buttonStyle.text.style = buttonStyle.text.style || {};
        var text = this.text = Draw.text(buttonStyle.text.text, {
            x: buttonStyle.x || 0,
            y: buttonStyle.y || 0,
            width: this.width,
            height: this.height,
            textColor: buttonStyle.text.style.textColor || 0xffffff,
            size: buttonStyle.text.style.size || 20,
            textAlign: egret.HorizontalAlign.CENTER,
            verticalAlign: egret.VerticalAlign.MIDDLE
        });
        text.cacheAsBitmap = true;
        this.addChild(text);
    };
    Button.prototype.update = function (newStyle) {
        // this.removeChildren()
        // this.init(newStyle);
        console.log(newStyle.text);
        this.text.text = newStyle.text;
        return this;
    };
    return Button;
}(Component));
__reflect(Button.prototype, "Button");
//# sourceMappingURL=Button.js.map