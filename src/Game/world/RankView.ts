class RankView extends View {

    constructor (context, width, height) {

        super(context);

        // this.width = width;
        // this.height = height;
        this.global = context;

        this.init();
    }

    init () {

        const rect = Draw.rect(null, {
            width: this.width,
            height: this.height,
        }).brush({
            width: 100,
            height: 100,
            background: 0xff000000
        });

        this.addChild(rect);

        const btn = new Button({
            width: 400,
            height: 100,
            img: 'btn',
            background: 0x43453e,
            text: {
                text: 'Rank',
                style: {
                    size: 50
                }
            }
        });

        this.addChild(btn);

        btn.update({
            width: 400,
            height: 100,
            img: 'btn',
            // background: 0x43453e,
            text: {
                text: '开始游戏',
                style: {
                    size: 50
                }
            }
        });

        btn.on(egret.TouchEvent.TOUCH_END, (e) => {
            console.log(btn);
            // btn.disable();
        }, this);

        btn.center(true, true, this);
    }
}