/// <reference path="../const.ts" />
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Brush = (function () {
    function Brush(sprite, type) {
        this.sprite = sprite;
        this.type = type;
    }
    Brush.prototype.brush = function (style) {
        switch (this.type) {
            case 'rect':
                this.brushRect(style);
                break;
        }
        return this.sprite;
    };
    Brush.prototype.brushRect = function (style) {
        if (style.background) {
            this.sprite.graphics.beginFill(style.background);
        }
        if (style.lineWidth && style.lineColor) {
            this.sprite.graphics.lineStyle(style.lineWidth, style.lineColor);
        }
        this.sprite.graphics.drawRect(style.x || 0, style.y || 0, style.width || 0, style.height || 0);
        this.sprite.graphics.endFill();
    };
    return Brush;
}());
__reflect(Brush.prototype, "Brush");
function drawText() {
}
var Draw = (function () {
    function Draw() {
    }
    Draw.rect = function (sprite, shape) {
        sprite = sprite || new egret.Sprite();
        var _shape = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            scaleX: 1,
            scaleY: 1,
            skewX: 0,
            skewY: 0,
            rotation: 0,
            alpha: 1
        };
        if (shape.scrollRect) {
            sprite.scrollRect = shape.scrollRect;
            sprite.cacheAsBitmap = true;
        }
        var shapeMerged = Object.assign(_shape, shape);
        console.log(shapeMerged);
        Object.assign(sprite, shapeMerged);
        return new Brush(sprite, 'rect');
    };
    Draw.circle = function (sprite) {
        if (sprite === void 0) { sprite = new egret.Sprite(); }
        return new Brush(sprite, 'circle');
    };
    Draw.line = function (sprite) {
        if (sprite === void 0) { sprite = new egret.Sprite(); }
        return new Brush(sprite, 'line');
    };
    Draw.text = function (text, style) {
        if (style === void 0) { style = {}; }
        var newText = new egret.TextField();
        if ('textFlow' in style) {
            newText.textFlow = style.textFlow;
        }
        newText.text = text;
        for (var prop in style) {
            newText[prop] = style[prop];
        }
        return newText;
    };
    Draw.container = function () {
    };
    return Draw;
}());
__reflect(Draw.prototype, "Draw");
//# sourceMappingURL=Draw.js.map