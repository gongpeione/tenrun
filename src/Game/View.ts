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
        
        this.addEventListener(AlertEvent.MSG, (e: AlertEvent) => {

            const alert = new Button({
                y: this.height - 200,
                width: 400,
                height: 80,
                background: Const.btnColor,
                alpha: .6,
                text: {
                    text: e.msg,
                    style: {
                        size: 30,
                        color: 0xfffff
                    }
                }
            })
            .center(true, false, this);

            this.addChild(alert);

            setTimeout(() => {
                const tw = egret.Tween.get(alert);
                tw.to({ alpha: 0 }, 1000).call(() => {
                    this.removeChild(alert);
                });
            }, 3000);

        }, this);
    }

}