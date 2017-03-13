class StartView extends View {

    btns;
    constructor (context, width, height) {
        super(context);

        // this.width = width;
        // this.height = height;
        this.global = context;

        // this.removeChildren();

        this.removeChild(this.backBtn);

        this.init();
    }

    init () {

        const bg = new egret.Bitmap();

        bg.texture = RES.getRes('start_bg');

        this.addChildAt(bg, 1);

        const localStorage = egret.localStorage;
        
        const username = localStorage.getItem('username');

    
        this.btns = this.addBtns();

        
        if (!username) {
            
            this.register();

        } else {
            this.btns.forEach(btn => {
                btn.enable();
            });
        }
        
    }

    addBtns () {
        const btnOffsetY = 200;

        const startGame = new Button({
            width: 200,
            height: 100,
            background: Const.btnColor,
            text: {
                text: 'Start',
                style: {
                    size: 50
                }
            }
        })
        .on(egret.TouchEvent.TOUCH_END, (e) => {
            this.global.game();
        }, this)
        .center(true, true, this, {
            x: 0,
            y: btnOffsetY
        })
        .disable();

        this.addChild(startGame);

        const rank = new Button({
            width: 100,
            height: 100,
            background: Const.btnColor,
            text: {
                text: 'Rank',
                style: {
                    size: 30
                }
            }
        })
        .center(true, true, this, {
            x: -170,
            y: btnOffsetY
        })
        .on(egret.TouchEvent.TOUCH_END, () => {
            console.log('rank');
        }, this)
        .disable();

        this.addChild(rank);

        const mask = new Mask(rank, this, {
            alpha: .8
        });
        this.addChildAt(mask, 9999);

        this.addChild(
            (
                new Button(
                    {
                        width: 200,
                        x: this.width - 250,
                        text: {
                            text: 'Close', 
                            style: { size: 40 } 
                        }
                })
            )
            .on(egret.TouchEvent.TOUCH_END, () => {
                this.removeChild(mask);
            }, this)
        );


        return [startGame, rank];
    }

    register () {

        const mask = Draw.rect(null, {
            width: this.width,
            height: this.height,
            alpha: .8
        }).brush({
            width: this.width,
            height: this.height,
            background: 0xff000000
        });

        this.addChild(mask);

        let usernameInput;
        usernameInput = new Input({
            background: 0x884422,
            padding: 20,
            inputStyle: {
                width: 400,
                height: 40,
                textColor: 0xffffff
            }
        })
        .center(true, false, this);

        this.addChild(usernameInput);

        const submitUsername = new Button({
            width: 200,
            height: 80,
            background: 0xB36029,
            y: 80,
            // background: 0x43453e,
            text: {
                text: 'Submit',
                style: {
                    size: 30
                }
            }
        })
        .on(egret.TouchEvent.TOUCH_END, (e) => {

            console.log(usernameInput.input.text);
            if (!usernameInput.input.text) {
                const empty: AlertEvent = new AlertEvent(AlertEvent.MSG, true);
                empty.msg = 'Username cannot be empty';
                this.dispatchEvent(empty);
                console.log(empty);
                return;
            } else {
                localStorage.setItem('username', usernameInput.input.text);

                this.btns.forEach(btn => {
                    btn.enable();
                });

                this.removeChild(submitUsername);
                this.removeChild(usernameInput);
                this.removeChild(mask);
            }

            

        }, this)
        .center(true, false, this, {
            x: 0,
            y: 0
        });

        this.addChild(submitUsername);
        
    }
}