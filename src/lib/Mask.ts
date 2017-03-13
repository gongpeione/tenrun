class Mask extends egret.DisplayObjectContainer {
    hole;
    context;
    gap;
    background: number;
    private maskChunks: Array<egret.Sprite> = [];
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
        // top
        this.maskChunks.push(Draw.rect(null, {
            width: this.context.width,
            height: this.hole.y - this.gap,
            // alpha: .8
        }).brush({
            background: this.background
        }));

        // right
        this.maskChunks.push(Draw.rect(null, {
            x: this.hole.x + this.hole.width + this.gap,
            y: this.hole.y - this.gap,
            width: this.context.width - this.hole.x - this.hole.width - this.gap,
            height: this.hole.height + this.gap * 2,
            // alpha: .8
        }).brush({
            background: this.background
        }));

        // bottom
        this.maskChunks.push(Draw.rect(null, {
            y: this.hole.y + this.hole.height + this.gap,
            width: this.context.width,
            height: this.context.height - this.hole.y - this.hole.height - this.gap,
            // alpha: .8
        }).brush({
            background: this.background
        }));

        // left
        this.maskChunks.push(Draw.rect(null, {
            y: this.hole.y - this.gap,
            width: this.hole.x - this.gap,
            height: this.hole.height + this.gap * 2,
            // alpha: .8
        }).brush({
            background: this.background
        }));

        this.maskChunks.forEach(chunk => {
            chunk.touchEnabled = true;
            this.addChild(chunk);
        });
    }
}