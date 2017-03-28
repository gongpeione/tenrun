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
        _this.isPause = false;
        _this.jumpCounter = -22;
        _this.fallCounter = 0;
        _this.speed = 0;
        _this.global = context;
        _this.init();
        return _this;
    }
    GameView.prototype.init = function () {
        var _this = this;
        this.createLand();
        this.addChild(this.land);
        this.createSand();
        this.addChild(this.sand);
        this.loadFigure();
        this.addChild(this.figure);
        this.addChild(this.figureRect);
        this.pauseBtn = new Button({
            width: 120,
            height: 60,
            x: 80,
            y: 10,
            background: Const.btnColor,
            text: {
                text: 'Pause',
                style: {
                    size: 30
                }
            }
        })
            .on(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            e.stopPropagation();
            if (_this.isPause) {
                _this.play();
                _this.isPause = false;
                _this.pauseBtn.update({
                    text: 'Pause'
                });
            }
            else {
                _this.pause();
                _this.isPause = true;
                _this.pauseBtn.update({
                    text: 'Play'
                });
            }
        }, this);
        this.addChild(this.pauseBtn);
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
        var isHit = false;
        this.bg = RES.getRes("bg");
        var bgPlay;
        var overPlay;
        if (localStorage.getItem('music') === 'ON') {
            bgPlay = this.bg.play(0, -1);
            bgPlay.volume = .2;
        }
        function hit() {
            isHit = this.hitTest(this.figureRect, this.obstacle);
            // console.log(isHit);
            if (isHit) {
                if (localStorage.getItem('music') === 'ON') {
                    this.overbg = RES.getRes("hit");
                    overPlay = this.overbg.play(0, 1);
                    bgPlay && bgPlay.stop();
                }
                egret.stopTick(hit, this);
                this.gameover();
            }
            return false;
        }
        egret.startTick(hit, this);
        this.backBtn.on(egret.TouchEvent.TOUCH_END, function () {
            overPlay && overPlay.stop();
            bgPlay && bgPlay.stop();
            egret.stopTick(hit, _this);
        }, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.jump, this, true);        
        // this.addEventListener(egret.TouchEvent.TOUCH_END, this.falling, this, true);
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
        boxBody.displays = [this.figure];
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
        this.addChild(startSign);
        function animate() {
            requestAnimationFrame(animate);
            // Move physics bodies forward in time
            world.step(60 / 1000);
            // Render scene
            // console.log(boxBody.position[0], boxBody.position[1])
            startSign.x = boxBody.position[0];
            startSign.y = boxBody.position[1];
            // startSign.rotation = boxBody.angle;
            debugDraw.drawDebug();
        }
        // this.addEventListener(egret.Event.ENTER_FRAME, animate, this);
        animate();
        if (!localStorage.getItem('gameTutorialed')) {
            var gameTutorial = new AlertEvent(AlertEvent.MSG, true);
            gameTutorial.msg = '长按跳跃，跳跃高度与长按时间有关';
            this.dispatchEvent(gameTutorial);
            localStorage.setItem('gameTutorialed', 'true');
            this.pause();
            setTimeout(function () {
                _this.play();
            }, 3000);
        }
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
        var _this = this;
        var dragonbonesData = RES.getRes("TenrunB_ske_json");
        var textureData = RES.getRes("TenrunB_tex_json");
        var texture = RES.getRes("TenrunB_tex_png");
        var dragonbonesFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        // var armature: dragonBones.Armature = dragonbonesFactory.buildArmature("Tenrun");
        this.figure = dragonbonesFactory.buildArmatureDisplay("Tenrun");
        this.figure.x = this.figurePoint.x;
        this.figure.y = this.figurePoint.y;
        // this.figure.scaleX = -0.3;
        // this.figure.scaleY = 0.3;
        // this.figure.animation.timeScale = 2;
        this.figure.animation.play('run', 0);
        var ar = this.figure._armature;
        // ar.getSlot('head_boundingBox').boundingBoxData.x = this.figure.x - this.figure.width / 2;
        // ar.getSlot('head_boundingBox').boundingBoxData.y = this.figure.y - this.figure.height / 2;
        // console.log(ar.getSlot('rightLeg_boundingBox'));
        this.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
            console.log(
            // ar.display,
            // e.stageX - this.figure.x, 
            // e.stageY - this.figure.y, 
            // ar.getSlot('head_boundingBox').boundingBoxData, 
            ar.getSlot('head_boundingBox').containsPoint(e.stageX - _this.figure.x, e.stageY - _this.figure.y));
        }, this);
        // const world = new p2.World();
        // world.sleepMode = p2.World.BODY_SLEEPING;
        // world.gravity = [ 0, 100 ];
        // const debugDraw = new p2DebugDraw(world);
        // var sprite: egret.Sprite = new egret.Sprite();
        // this.addChild(sprite);
        // debugDraw.setSprite(sprite);
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
        // if still falling or click pause btn then cannot jump again
        if (this.isFalling || e.target === this.pauseBtn) {
            return;
        }
        this.figure.animation.gotoAndStop('run', 1);
        this.jumpTimer = setInterval(function () {
            if (_this.isPause) {
                return;
            }
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
        if (e.target === this.pauseBtn) {
            return;
        }
        clearInterval(this.jumpTimer);
        this.fallCounter = -this.jumpCounter;
        this.jumpCounter = -22;
        this.isFalling = true;
        this.touchEnabled = false;
        this.fallTimer = setInterval(function () {
            if (_this.isPause) {
                return;
            }
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
        // const maxHeight = 180;
        var randomHeight = this.randomHeight(100, 195);
        this.obstacle = Draw.rect(this.obstacle ? this.obstacle : null, {
            width: 60,
            height: randomHeight,
            x: this.width,
            y: this.height - this.horizontalLine - randomHeight + 20
        }).brush({
            background: Const.mainColor,
        });
        // this.addChild(world);
        // this.tw = egret.Tween.get(this.obstacle);
        // this.tw.to({ x: -100 }, 2000 - this.speed).call(() => {
        //     this.score += 100;
        //     this.scoreText.text = this.score + '';
        //     this.createObstacle();
        // });
        // this.speed <= 1000 && (this.speed += 10);
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
    GameView.prototype.pause = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.jump, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.falling, this);
        this.tw.setPaused(true);
        this.figure.animation.stop('run');
    };
    GameView.prototype.play = function () {
        this.tw.setPaused(false);
        this.figure.animation.play();
    };
    GameView.prototype.gameover = function () {
        var _this = this;
        egret.Tween.removeAllTweens();
        clearInterval(this.jumpTimer);
        clearInterval(this.fallTimer);
        this.touchEnabled = false;
        var mask = Draw.rect(null, {
            width: this.width,
            height: this.height,
            alpha: .8
        }).brush({
            background: 0xff000000
        });
        mask.touchEnabled = true;
        this.addChild(mask);
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