/// <reference path="../lib/Draw.ts" />

interface buttonStyle extends Shape {
    background?: number,
    img?: string,
    text: {
        text, style?: TextStyle
    }
}
class Button extends Component {
    width: number;
    height: number;
    disabled: boolean;
    img;
    text;
    constructor (buttonStyle: buttonStyle) {
        super();

        // Object.assign(this, buttonStyle);

        this.width = buttonStyle.width || 200;
        this.height = buttonStyle.height || 100;
        
        this.init(buttonStyle);

        this.cacheAsBitmap = true;

        this.disabled = false;
    }

    private init (buttonStyle) {
        this.addRect(buttonStyle);

        if (buttonStyle.img) {
            this.addImg(buttonStyle);
        }
        
        if (buttonStyle.text) {
            this.addText(buttonStyle);
        }

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            this.alpha = .8;
        }, this);

        this.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            this.alpha = 1;
        }, this);
    }

    private addRect (buttonStyle) {
        const rect = Draw.rect(null, {
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
    }

    private addImg (buttonStyle) {
        const img:egret.Bitmap = this.img = new egret.Bitmap();
        img.texture = RES.getRes(buttonStyle.img);
        img.width = this.width;
        img.height = this.height;
        this.addChild(img);
    }

    private addText (buttonStyle) {
        buttonStyle.text.style = buttonStyle.text.style || {};
        const text = this.text = Draw.text(buttonStyle.text.text, {
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
    }

    public update (newStyle) {
        // this.removeChildren()
        // this.init(newStyle);

        console.log(newStyle.text);
        this.text.text = newStyle.text;

        return this;
    }
    
}