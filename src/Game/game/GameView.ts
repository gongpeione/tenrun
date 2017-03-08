class GameView extends View {

    private horizontalLine = 200;
    private sand;
    private land;
    private figure: dragonBones.EgretArmatureDisplay
    private obstacle;
    private scoreText: egret.TextField;
    private score = 0;
    private figureRect;
    private figurePoint = {
        x: 200,
        y: 370
    };
    private figureRectPoint = {
        x: 150,
        y: 290
    };
    private figureRectOffset = {
        x: this.figurePoint.x - this.figureRectPoint.x,
        y: this.figurePoint.y - this.figureRectPoint.y
    }

    private isFalling = false;
    private jumpTimer;
    private jumpCounter = -22;
    private fallTimer;
    private fallCounter = 0;


    constructor (context, width, height) {
        super(context);

        this.global = context;

        this.init();
    }

    init () {

        this.createLand();
        this.addChild(this.land);
        
        this.createSand();
        this.addChild(this.sand);

        this.loadFigure();
        this.addChild(this.figure);
        this.addChild(this.figureRect);

        // this.createScore();
        // this.addChildAt(this.score, 99);

        this.scoreText = new egret.TextField();
        this.scoreText.text = this.score + '';
        this.scoreText.textColor = Const.btnColor;
        this.scoreText.width = 400;
        this.scoreText.size = 40;
        this.scoreText.x = this.width - this.scoreText.width - 20;
        this.scoreText.y = 20;
        this.scoreText.textAlign = egret.HorizontalAlign.RIGHT;
        this.addChild(this.scoreText);

        let jump = -22;
        let jumpTimer;
        let fall = 0;
        let fallTimer;
        let isFalling = false;
        let isHit = false;

        let hit = setInterval(() => {
            isHit = this.hitTest(this.figureRect, this.obstacle);
            // console.log(isHit);
            if (isHit) {
                egret.Tween.removeAllTweens();
                clearInterval(hit);
                clearInterval(this.jumpTimer);
                clearInterval(this.fallTimer);
            }
        }, 50);

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.jump, this);        
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.falling, this);

        this.touchEnabled = true;

        this.createObstacle();
        this.addChild(this.obstacle);
    }

    createSand () {
        const sandTexture = RES.getRes("sand_png");
        const sandConfig = RES.getRes("sand_json");
        this.sand = new particle.GravityParticleSystem(sandTexture, sandConfig);

        this.sand.x = -280;
    }

    createLand () {
        this.land =  Draw.rect(null, {
            width: this.width,
            height: this.horizontalLine,
            y: this.height - this.horizontalLine,
        }).brush({
            width: this.width,
            height: this.horizontalLine,
            background: Const.mainColor,
        });
    }

    createScore () {
        this.scoreText = Draw.text('0', {
            x: this.width - 200,
            y: 20,
            width: 300,
            height: 40,
            size: 40,
            textAlign: egret.HorizontalAlign.RIGHT,
            textColor: Const.mainColor
        });
        console.log(this.score);
    }

    loadFigure () {
        const dragonbonesData = RES.getRes( "Tenrun_ske_json" );  
        const textureData = RES.getRes( "tenrun" );  
        const texture = RES.getRes( "tenrun_texture" );

        const dragonbonesFactory:dragonBones.EgretFactory = new dragonBones.EgretFactory();  
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));  
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));

        // var armature: dragonBones.Armature = dragonbonesFactory.buildArmature("Tenrun");
        this.figure = dragonbonesFactory.buildArmatureDisplay("Tenrun");

        this.figure.x = this.figurePoint.x;
        this.figure.y = this.figurePoint.y;
        this.figure.scaleX = -0.3;
        this.figure.scaleY = 0.3;
        this.figure.animation.timeScale = 2;

        this.figure.animation.play('run', 0);

        // Create a rect fit figure that use to hitTest
        this.figureRect = Draw.rect(null, {
            x: this.figureRectPoint.x,
            y: this.figureRectPoint.y,
            width: 100,
            height: 160,
            alpha: .4
        }).brush({
            width: 100,
            height: 160,
            background: 0xeeeeee,
        });
    }

    jump (e: egret.TouchEvent) {

        // if still falling then cannot jump again
        if (this.isFalling) {
            return;
        }

        this.figure.animation.gotoAndStop('run', 1);

        this.jumpTimer = setInterval(() => {

            // if jump to the highest point
            if (this.jumpCounter === 0) {
                clearInterval(this.jumpTimer);
                this.falling(e);
                return;
            }

            this.figure.y = this.caculateHeight(this.jumpCounter++);
            
            this.figureRect.y = this.figure.y - this.figureRectOffset.y;

        }, 20);
    }

    falling (e: egret.TouchEvent) {

        clearInterval(this.jumpTimer);

        this.fallCounter = -this.jumpCounter;
        this.jumpCounter = -22;
        this.isFalling = true;

        this.touchEnabled = false;

        this.fallTimer = setInterval(() => {

            if (this.fallCounter >= 22) {

                this.fallCounter = 0;
                this.isFalling = false;
                this.touchEnabled = true;

                clearInterval(this.fallTimer);
                
                this.figure.animation.play('run', 0);

                this.sand.start();
                setTimeout(() => {
                    this.sand.stop();
                }, 200);

                return;
            }

            this.figure.y = this.caculateHeight(this.fallCounter++);
            
            this.figureRect.y = this.figure.y - this.figureRectOffset.y;

        }, 20);
    }

    caculateHeight (x) {
        // when y equals 380(highest point), x equals ±22
        return 0.5 * (x ** 2) + 150;
    }

    createObstacle () {
        
        if (!this.obstacle) {
            this.obstacle = Draw.rect(null, {
                width: 60,
                height: 100,
                x: this.width,
                y: this.height - this.horizontalLine - 80
            }).brush({
                width: 60,
                height: 100,
                background: Const.mainColor,
            });
        } else {
            this.obstacle.x = this.width;
        }
        
        const tw = egret.Tween.get( this.obstacle );
        tw.to({ x: -100 }, 2000).call(() => {
            this.score += 100;
            this.scoreText.text = this.score + '';
            this.createObstacle();
        });
    }

    hitTest(obj1: egret.DisplayObject, obj2: egret.DisplayObject):boolean {
        var rect1:egret.Rectangle = obj1.getBounds();
        var rect2:egret.Rectangle = obj2.getBounds();
        // console.log(rect1, rect2);
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;

        return rect1.intersects(rect2);
    }
}