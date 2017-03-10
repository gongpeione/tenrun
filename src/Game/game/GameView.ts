/// <reference path="../../lib/Fetch.ts" />


class GameView extends View {

    private horizontalLine = 200;
    private sand;
    private land;
    private figure: dragonBones.EgretArmatureDisplay
    private obstacle: egret.Sprite;
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

    private speed = 0;

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

        const self = this;
        function hit () {
            isHit = this.hitTest(this.figureRect, this.obstacle);
            // console.log(isHit);
            if (isHit) {
                egret.stopTick(hit, this);
                this.gameover();
            }
            return false;
        }
        egret.startTick(hit, this);

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.jump, this);        
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.falling, this);

        this.touchEnabled = true;

        this.createObstacle();
        this.addChild(this.obstacle);

        // Create a physics world, where bodies and constraints live
        // Init p2.js
        const world = new p2.World();
        world.sleepMode = p2.World.BODY_SLEEPING;
        world.gravity = [ 0, 100 ];

        // Add a plane
        // const planeShape = new p2.Plane();
        // const planeBody = new p2.Body();
        // planeBody.position[1] =  500;
        // planeBody.angle = 180;
        // planeBody.addShape(planeShape);
        // world.addBody(planeBody);

        // Add a box
        const boxShape = new p2.Box({ width: 200, height: 100 });
        const boxBody = new p2.Body({ mass: 10, position:[200, 3], angle: 45 });
        boxBody.addShape(boxShape);
        world.addBody(boxBody);

        const debugDraw = new p2DebugDraw(world);
 
        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        debugDraw.setSprite(sprite);

        const startSign = new Button({
            x: boxBody.position[0],
            y: boxBody.position[1],
            // rotation: boxBody.angle,
            width: 300,
            height: 80,
            background: Const.btnColor,
            text: {
                text: 'Game start',
                style: {
                    textColor: 0xffffff,
                    size: 50
                }
            }
        });
        // const box = Draw.rect(null, {
        //     x: boxBody.position[0],
        //     y: boxBody.position[1],
        //     width: 200,
        //     height: 100,
        //     rotation: boxBody.angle
        // }).brush({
        //     background: 0xff0000
        // });
        this.addChild(startSign);

        // const plane = Draw.rect(null, {
        //     x: 0,
        //     y: planeBody.position[1],
        //     width: 2000,
        //     height: 10
        // }).brush({
        //     background: 0x00ff00
        // });
        // this.addChild(plane);

        function animate(){
            requestAnimationFrame(animate);

            // Move physics bodies forward in time
            world.step(60 / 1000);

            // Render scene
            // console.log(boxBody.position[0], boxBody.position[1])
            startSign.x = boxBody.position[0];
            startSign.y = boxBody.position[1];
            // startSign.rotation = boxBody.angle;
        }
        // this.addEventListener(egret.Event.ENTER_FRAME, animate, this);
        animate();
        
    }

     private createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        console.log(texture);
        return result;
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

        // this.fallCounter = -this.jumpCounter;
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
        
        // const maxHeight = 180;
        const randomHeight = this.randomHeight(100, 195);
        if (!this.obstacle) {
            this.obstacle = Draw.rect(null, {
                width: 60,
                height: randomHeight,
                x: this.width,
                y: this.height - this.horizontalLine - randomHeight + 20
            }).brush({
                background: Const.mainColor,
            });
        } else {
            Draw.rect(this.obstacle, {
                width: 60,
                height: randomHeight,
                x: this.width,
                y: this.height - this.horizontalLine - randomHeight + 20
            }).brush({
                background: Const.mainColor,
            });
        }

        // this.addChild(world);
        
        const tw = egret.Tween.get( this.obstacle );
        tw.to({ x: -100 }, 2000 - this.speed).call(() => {
            this.score += 100;
            this.scoreText.text = this.score + '';
            this.createObstacle();
        });

        this.speed <= 1000 && (this.speed += 10);
    }

    randomHeight(min, max) {
        return Math.random() * (max - min) + min;
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

    gameover () {

        egret.Tween.removeAllTweens();
        clearInterval(this.jumpTimer);
        clearInterval(this.fallTimer);                
        this.touchEnabled = false;

        this.addChild(Draw.rect(null, {
            width: this.width,
            height: this.height,
            alpha: .8
        }).brush({
            background: 0xff000000
        }));

        const retry = new Button({
            width: 200,
            height: 100,
            background: Const.btnColor,
            text: {
                text: 'Retry',
                style: {
                    size: 50
                }
            }
        })
        .on(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => {
            this.global.game();
        }, this)
        .center(true, true, this, {
            x: -100,
            y: 0
        });

        this.addChild(retry);

        const home = new Button({
            width: 200,
            height: 100,
            background: Const.btnColor,
            text: {
                text: 'Home',
                style: {
                    size: 50
                }
            }
        })
        .on(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => {
            this.global.main();
        }, this)
        .center(true, true, this, {
            x: 100,
            y: 0
        });
        
        this.addChild(home);

        const localStorage = egret.localStorage;
        const username = localStorage.getItem('username');
        
        fetch('https://node.geeku.net/tenrun/score', {
            method: egret.HttpMethod.POST,
            body: {
                name: username,
                score: this.score
            }
        }).then(res => {
            console.log(res);
        })
    }
}