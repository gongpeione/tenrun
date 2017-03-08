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
        _this.global = context;
        _this.init();
        return _this;
    }
    GameView.prototype.init = function () {
        var _this = this;
        var land = Draw.rect(null, {
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
        var dragonbonesData = RES.getRes("Tenrun_ske_json");
        var textureData = RES.getRes("tenrun");
        var texture = RES.getRes("tenrun_texture");
        var dragonbonesFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        // var armature: dragonBones.Armature = dragonbonesFactory.buildArmature("Tenrun");
        var ar = dragonbonesFactory.buildArmatureDisplay("Tenrun");
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
            }
        }, 20);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            // ar.animation.stop('run');
            // if still falling then cannot jump again
            console.log('falling: ' + isFalling);
            if (isFalling) {
                return;
            }
            ar.animation.gotoAndStop('run', 1);
            jumpTimer = setInterval(function () {
                // if jump to the highest point
                if (jump === 0) {
                    clearInterval(jumpTimer);
                    return;
                }
                ar.y = _this.caculateHeight(jump++);
                _this.figureRect.y = ar.y - _this.figureRectOffset.y;
            }, 20);
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
            clearInterval(jumpTimer);
            fall = -jump;
            jump = -22;
            isFalling = true;
            _this.touchEnabled = false;
            fallTimer = setInterval(function () {
                if (fall >= 22) {
                    fall = 0;
                    isFalling = false;
                    _this.touchEnabled = true;
                    clearInterval(fallTimer);
                    ar.animation.play('run', 0);
                    console.log(ar.y);
                    _this.sand.start();
                    setTimeout(function () {
                        _this.sand.stop();
                    }, 200);
                    return;
                }
                ar.y = _this.caculateHeight(fall++);
                _this.figureRect.y = ar.y - _this.figureRectOffset.y;
            }, 20);
        }, this);
        this.touchEnabled = true;
        this.createObstacle();
    };
    GameView.prototype.caculateHeight = function (x) {
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
            _this.createObstacle();
        });
        this.addChild(this.obstacle);
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