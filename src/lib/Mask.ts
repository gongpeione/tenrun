class Mask extends egret.DisplayObjectContainer {
    hole;
    context;
    gap;
    background: number;
    constructor (hole, context, style?) {
        super();

        this.hole = hole;
        this.context= context;

        style = style || {};
        
        this.gap = style.gap || 10;        
        this.background = style.background || 0xff000000;
        this.alpha = style.alpha || .8;

        this.init();
    }

    init () {
        const top = Draw.rect(null, {
            width: this.context.width,
            height: this.hole.y - this.gap,
            // alpha: .8
        }).brush({
            background: this.background
        });

        const right = Draw.rect(null, {
            x: this.hole.x + this.hole.width + this.gap,
            y: this.hole.y - this.gap,
            width: this.context.width - this.hole.x - this.hole.width - this.gap,
            height: this.hole.height + this.gap * 2,
            // alpha: .8
        }).brush({
            background: this.background
        });

        const bottom = Draw.rect(null, {
            y: this.hole.y + this.hole.height + this.gap,
            width: this.context.width,
            height: this.context.height - this.hole.y - this.hole.height - this.gap,
            // alpha: .8
        }).brush({
            background: this.background
        });

        const left = Draw.rect(null, {
            y: this.hole.y - this.gap,
            width: this.hole.x - this.gap,
            height: this.hole.height + this.gap * 2,
            // alpha: .8
        }).brush({
            background: this.background
        });

        this.addChild(top);
        this.addChild(right);
        this.addChild(bottom);
        this.addChild(left);
    }
}