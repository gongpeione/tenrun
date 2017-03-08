class View extends egret.DisplayObjectContainer {

    global;
    backBtn;
    constructor (context) {
        super();

        this.global = context;

        this.width = this.global.width;
        this.height = this.global.height;

        this.backBtn = new Button({
            width: 60,
            height: 60,
            x: 10,
            y: 10,
            background: Const.btnColor,
            text: {
                text: '<',
                style: {
                    size: 30
                }
            }
        })
        .on(egret.TouchEvent.TOUCH_END, (e) => {
            this.global.main();
        }, this)

        this.addChild(this.backBtn);

        const bgColor = Draw.rect(null, {
            width: this.width,
            height: this.height
        })
        .brush({
            width: this.width,
            height: this.height,
            background: 0xffffff
        });

        this.addChildAt(bgColor, 0);
    }

}