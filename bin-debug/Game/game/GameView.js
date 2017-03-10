/// <reference path="../../lib/Fetch.ts" />
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView(context, width, height) {
        var _this = _super.call(this, context) || this;
        _this.horizontalLine = 200;
        _this.score = 0;
        _this.figurePoint = {
            x: 200,
            y: 370
        };
        _this.figureRectPoint = {
            x: 150,
            y: 290
        };
        _this.figureRectOffset = {
            x: _this.figurePoint.x - _this.figureRectPoint.x,
            y: _this.figurePoint.y - _this.figureRectPoint.y
        };
        _this.isFalling = false;
        _this.jumpCounter = -22;
        _this.fallCounter = 0;
        _this.speed = 0;
        _this.global = context;
        _this.init();
        return _this;
    }
    GameView.prototype.init = function () {
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
        var jump = -22;
        var jumpTimer;
        var fall = 0;
        var fallTimer;
        var isFalling = false;
        var isHit = false;
        var self = this;
        function hit() {
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
        var world = new p2.World();
        world.sleepMode = p2.World.BODY_SLEEPING;
        world.gravity = [0, 100];
        // Add a plane
        // const planeShape = new p2.Plane();
        // const planeBody = new p2.Body();
        // planeBody.position[1] =  500;
        // planeBody.angle = 180;
        // planeBody.addShape(planeShape);
        // world.addBody(planeBody);
        // Add a box
        var boxShape = new p2.Box({ width: 200, height: 100 });
        var boxBody = new p2.Body({ mass: 10, position: [200, 3], angle: 45 });
        boxBody.addShape(boxShape);
        world.addBody(boxBody);
        var debugDraw = new p2DebugDraw(world);
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        debugDraw.setSprite(sprite);
        var startSign = new Button({
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
        function animate() {
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
    };
    GameView.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        console.log(texture);
        return result;
    };
    GameView.prototype.createSand = function () {
        var sandTexture = RES.getRes("sand_png");
        var sandConfig = RES.getRes("sand_json");
        this.sand = new particle.GravityParticleSystem(sandTexture, sandConfig);
        this.sand.x = -280;
    };
    GameView.prototype.createLand = function () {
        this.land = Draw.rect(null, {
            width: this.width,
            height: this.horizontalLine,
            y: this.height - this.horizontalLine,
        }).brush({
            width: this.width,
            height: this.horizontalLine,
            background: Const.mainColor,
        });
    };
    GameView.prototype.createScore = function () {
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
    };
    GameView.prototype.loadFigure = function () {
        var dragonbonesData = RES.getRes("Tenrun_ske_json");
        var textureData = RES.getRes("tenrun");
        var texture = RES.getRes("tenrun_texture");
        var dragonbonesFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
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
    };
    GameView.prototype.jump = function (e) {
        var _this = this;
        // if still falling then cannot jump again
        if (this.isFalling) {
            return;
        }
        this.figure.animation.gotoAndStop('run', 1);
        this.jumpTimer = setInterval(function () {
            // if jump to the highest point
            if (_this.jumpCounter === 0) {
                clearInterval(_this.jumpTimer);
                _this.falling(e);
                return;
            }
            _this.figure.y = _this.caculateHeight(_this.jumpCounter++);
            _this.figureRect.y = _this.figure.y - _this.figureRectOffset.y;
        }, 20);
    };
    GameView.prototype.falling = function (e) {
        var _this = this;
        clearInterval(this.jumpTimer);
        // this.fallCounter = -this.jumpCounter;
        this.jumpCounter = -22;
        this.isFalling = true;
        this.touchEnabled = false;
        this.fallTimer = setInterval(function () {
            if (_this.fallCounter >= 22) {
                _this.fallCounter = 0;
                _this.isFalling = false;
                _this.touchEnabled = true;
                clearInterval(_this.fallTimer);
                _this.figure.animation.play('run', 0);
                _this.sand.start();
                setTimeout(function () {
                    _this.sand.stop();
                }, 200);
                return;
            }
            _this.figure.y = _this.caculateHeight(_this.fallCounter++);
            _this.figureRect.y = _this.figure.y - _this.figureRectOffset.y;
        }, 20);
    };
    GameView.prototype.caculateHeight = function (x) {
        // when y equals 380(highest point), x equals ±22
        return 0.5 * (Math.pow(x, 2)) + 150;
    };
    GameView.prototype.createObstacle = function () {
        var _this = this;
        // const maxHeight = 180;
        var randomHeight = this.randomHeight(100, 195);
        if (!this.obstacle) {
            this.obstacle = Draw.rect(null, {
                width: 60,
                height: randomHeight,
                x: this.width,
                y: this.height - this.horizontalLine - randomHeight + 20
            }).brush({
                background: Const.mainColor,
            });
        }
        else {
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
        var tw = egret.Tween.get(this.obstacle);
        tw.to({ x: -100 }, 2000 - this.speed).call(function () {
            _this.score += 100;
            _this.scoreText.text = _this.score + '';
            _this.createObstacle();
        });
        this.speed <= 1000 && (this.speed += 10);
    };
    GameView.prototype.randomHeight = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    GameView.prototype.hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        // console.log(rect1, rect2);
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    };
    GameView.prototype.gameover = function () {
        var _this = this;
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
        var retry = new Button({
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
            .on(egret.TouchEvent.TOUCH_END, function (e) {
            _this.global.game();
        }, this)
            .center(true, true, this, {
            x: -100,
            y: 0
        });
        this.addChild(retry);
        var home = new Button({
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
            .on(egret.TouchEvent.TOUCH_END, function (e) {
            _this.global.main();
        }, this)
            .center(true, true, this, {
            x: 100,
            y: 0
        });
        this.addChild(home);
        var localStorage = egret.localStorage;
        var username = localStorage.getItem('username');
        fetch('https://node.geeku.net/tenrun/score', {
            method: egret.HttpMethod.POST,
            body: {
                name: username,
                score: this.score
            }
        }).then(function (res) {
            console.log(res);
        });
    };
    return GameView;
}(View));
__reflect(GameView.prototype, "GameView");
//# sourceMappingURL=GameView.js.map