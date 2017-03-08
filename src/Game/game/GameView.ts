class GameView extends View {

    private horizontalLine = 200;
    private sand;
    private obstacle;
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
    constructor (context, width, height) {
        super(context);

        this.global = context;

        this.init();
    }

    init () {
        const land = Draw.rect(null, {
            width: this.width,
            height: this.horizontalLine,
            y: this.height - this.horizontalLine,
        }).brush({
            width: this.width,
            height: this.horizontalLine,
            background: Const.mainColor,
        });

        this.addChild(land);

        // dragonBones.addMovieGroup(RES.getRes("Tenrun_ske_dbmv"), RES.getRes("tenrun_texture")); // 添加动画数据和贴图
        // var movie:dragonBones.Movie = dragonBones.buildMovie("tenrun"); // 创建 白鹭极速格式 的动画
        // console.log(movie, dragonBones.getMovieNames('dragonBones'), dragonBones.getMovieNames('Movie'));
        // movie.play("walk"); // 播放动画
        // this.addChild(movie); // 添加 Movie 到显示列表

        var texture = RES.getRes("sand_png");
        var config = RES.getRes("sand_json");
        this.sand = new particle.GravityParticleSystem(texture, config);

        this.sand.x = -280;
        // this.sand.y = 370;

        this.addChild(this.sand);

        var dragonbonesData = RES.getRes( "Tenrun_ske_json" );  
        var textureData = RES.getRes( "tenrun" );  
        var texture = RES.getRes( "tenrun_texture" );

        var dragonbonesFactory:dragonBones.EgretFactory = new dragonBones.EgretFactory();  
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));  
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));

        // var armature: dragonBones.Armature = dragonbonesFactory.buildArmature("Tenrun");
        var ar:dragonBones.EgretArmatureDisplay = dragonbonesFactory.buildArmatureDisplay("Tenrun");

        this.addChild(ar);
        ar.x = this.figurePoint.x;
        ar.y = this.figurePoint.y;
        ar.scaleX = -0.3;
        ar.scaleY = 0.3;
        ar.animation.timeScale = 2;

        ar.animation.play('run', 0);

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
        this.addChild(this.figureRect);

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
            }
        }, 20);

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
            // ar.animation.stop('run');
            
            // if still falling then cannot jump again
            console.log('falling: ' + isFalling);
            if (isFalling) {
                return;
            }

            ar.animation.gotoAndStop('run', 1);

            jumpTimer = setInterval(() => {

                // if jump to the highest point
                if (jump === 0) {
                    clearInterval(jumpTimer);
                    return;
                }

                ar.y = this.caculateHeight(jump++);
                
                this.figureRect.y = ar.y - this.figureRectOffset.y;

            }, 20);
        }, this);

        
        this.addEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => {
            
            clearInterval(jumpTimer);

            fall = -jump;
            jump = -22;
            isFalling = true;

            this.touchEnabled = false;

            fallTimer = setInterval(() => {

                if (fall >= 22) {
                    fall = 0;
                    isFalling = false;
                    this.touchEnabled = true;
                    clearInterval(fallTimer);
                    ar.animation.play('run', 0);

                    console.log(ar.y);

                    this.sand.start();
                    setTimeout(() => {
                        this.sand.stop();
                    }, 200);

                    return;
                }

                ar.y = this.caculateHeight(fall++);
                
                this.figureRect.y = ar.y - this.figureRectOffset.y;

            }, 20);
        }, this);

        this.touchEnabled = true;

        this.createObstacle();
    }

    caculateHeight (x) {
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
            this.createObstacle()
        });

        this.addChild(this.obstacle);
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