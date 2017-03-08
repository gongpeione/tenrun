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
        var hit = setInterval(function () {
            isHit = _this.hitTest(_this.figureRect, _this.obstacle);
            // console.log(isHit);
            if (isHit) {
                egret.Tween.removeAllTweens();
                clearInterval(hit);
                clearInterval(_this.jumpTimer);
                clearInterval(_this.fallTimer);
            }
        }, 50);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.jump, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.falling, this);
        this.touchEnabled = true;
        this.createObstacle();
        this.addChild(this.obstacle);
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
        this.fallCounter = -this.jumpCounter;
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
        }
        else {
            this.obstacle.x = this.width;
        }
        var tw = egret.Tween.get(this.obstacle);
        tw.to({ x: -100 }, 2000).call(function () {
            _this.score += 100;
            _this.scoreText.text = _this.score + '';
            _this.createObstacle();
        });
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
    return GameView;
}(View));
__reflect(GameView.prototype, "GameView");
//# sourceMappingURL=GameView.js.map