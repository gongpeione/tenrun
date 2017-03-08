/// <reference path="../const.ts" />

class Brush {
    public sprite: egret.Sprite;
    public type: string
    constructor (sprite: egret.Sprite, type: string) {
        this.sprite = sprite;
        this.type = type;
    }

    brush (style) {
        switch (this.type) {
            case 'rect': this.brushRect(style); break;
        }
        return this.sprite;
    }

    brushRect (style: RectStyle) {
        if (style.background) {
            this.sprite.graphics.beginFill(style.background);
        }
        if (style.lineWidth && style.lineColor) {
            this.sprite.graphics.lineStyle(style.lineWidth, style.lineColor);
        } 
        this.sprite.graphics.drawRect(style.x || 0, style.y || 0, style.width || 0, style.height || 0);
        this.sprite.graphics.endFill();
    }
}

interface Shape {
    name?: string,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    scrollRect?: egret.Rectangle,
    scaleX?: number,
    scaleY?: number,
    rotation?: number,
    skewX?: number,
    skewY?: number,
    alpha?: number
}
interface RectStyle {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    background?,
    lineWidth?: number,
    lineColor?
}
interface TextStyle {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    size?: number,
    color?,
    textColor?,
    fontFamily?,
    textAlign?: string,
    verticalAlign?: string,
    strokeColor?
    bold?: boolean,
    italic?: boolean,
    textFlow?: Array<egret.ITextElement>,
    type?: string,
    inputType?: string
}
function drawText () {
    
}
class Draw {

    public static rect (sprite: egret.Sprite, shape: Shape) {

        sprite = sprite || new egret.Sprite();
        const _shape = {
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
        }

        if (shape.scrollRect) {
            sprite.scrollRect = shape.scrollRect;
            sprite.cacheAsBitmap = true;
        }

        const shapeMerged = Object.assign(_shape, shape);
        console.log(shapeMerged);

        Object.assign(sprite, shapeMerged);

        return new Brush(sprite, 'rect');
    }

    public static circle (sprite: egret.Sprite = new egret.Sprite()) {
        return new Brush(sprite, 'circle');
    }

    public static line (sprite: egret.Sprite = new egret.Sprite()) {
        return new Brush(sprite, 'line');
    }

    public static text (text: string, style: TextStyle = {}) {
        
        const newText = new egret.TextField();

        if ('textFlow' in style) {
            newText.textFlow = style.textFlow;
        }

        newText.text = text;
        
        for (let prop in style) {
            newText[prop] = style[prop]
        }
        
        return newText;
    }

    public static container () {

    }

}