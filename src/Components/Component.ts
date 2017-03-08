class Component extends egret.Sprite {
    constructor () {
        super()
    }

    center (x: boolean, y: boolean, context, offset = { x: 0, y: 0 }) {
        if (x) {
            this.x = (context.width - this.width) / 2 + offset.x;
        }

        if (y) {
            this.y = (context.height - this.height) / 2 + offset.y;
        }

        return this;
    }

    disable () {
        this.alpha = .5;
        this.touchEnabled = false;

        return this;
    }

    enable () {
        this.alpha = 1;
        this.touchEnabled = true;

        return this;
    }

    public on (event, callback, context) {
        this.touchEnabled = true;
        this.addEventListener(event, callback, context);

        return this;
    }
}