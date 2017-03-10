var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StartView = (function (_super) {
    __extends(StartView, _super);
    function StartView(context, width, height) {
        var _this = _super.call(this, context) || this;
        // this.width = width;
        // this.height = height;
        _this.global = context;
        // this.removeChildren();
        _this.removeChild(_this.backBtn);
        _this.init();
        return _this;
    }
    StartView.prototype.init = function () {
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes('start_bg');
        this.addChildAt(bg, 1);
        var localStorage = egret.localStorage;
        var username = localStorage.getItem('username');
        this.btns = this.addBtns();
        if (!username) {
            this.register();
        }
        else {
            this.btns.forEach(function (btn) {
                btn.enable();
            });
        }
    };
    StartView.prototype.addBtns = function () {
        var _this = this;
        var btnOffsetY = 200;
        var startGame = new Button({
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
            .on(egret.TouchEvent.TOUCH_END, function (e) {
            _this.global.game();
        }, this)
            .center(true, true, this, {
            x: 0,
            y: btnOffsetY
        })
            .disable();
        this.addChild(startGame);
        var rank = new Button({
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
            .disable();
        this.addChild(rank);
        var mask = new Mask(startGame, this, {
            alpha: .8
        });
        this.addChildAt(mask, 9999);
        this.addChild((new Button({
            width: 200,
            x: this.width - 250,
            text: {
                text: 'Close',
                style: { size: 40 }
            }
        }))
            .on(egret.TouchEvent.TOUCH_END, function () {
            _this.removeChild(mask);
        }, this));
        return [startGame, rank];
    };
    StartView.prototype.register = function () {
        var _this = this;
        var mask = Draw.rect(null, {
            width: this.width,
            height: this.height,
            alpha: .8
        }).brush({
            width: this.width,
            height: this.height,
            background: 0xff000000
        });
        this.addChild(mask);
        var usernameInput;
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
        var submitUsername = new Button({
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
            .on(egret.TouchEvent.TOUCH_END, function (e) {
            localStorage.setItem('username', usernameInput.input.text);
            _this.btns.forEach(function (btn) {
                btn.enable();
            });
            _this.removeChild(submitUsername);
            _this.removeChild(usernameInput);
            _this.removeChild(mask);
        }, this)
            .center(true, false, this, {
            x: 0,
            y: 0
        });
        this.addChild(submitUsername);
    };
    return StartView;
}(View));
__reflect(StartView.prototype, "StartView");
//# sourceMappingURL=StartView.js.map