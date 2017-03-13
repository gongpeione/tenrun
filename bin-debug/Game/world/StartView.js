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
        var _this = this;
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes('start_bg');
        this.addChildAt(bg, 1);
        var localStorage = egret.localStorage;
        var username = localStorage.getItem('username');
        this.btns = this.addBtns();
        if (!localStorage.getItem('music')) {
            localStorage.setItem('music', 'ON');
        }
        if (!username) {
            this.register();
        }
        else {
            if (!localStorage.getItem('tutorial')) {
                this.tutorial(this.btns[0], function () {
                    _this.tutorial(_this.btns[1], function () {
                        _this.tutorial(_this.btns[2], function () {
                            localStorage.setItem('tutorial', 'true');
                            _this.btns.forEach(function (btn) {
                                btn.enable();
                            });
                        });
                    });
                });
            }
            else {
                this.btns.forEach(function (btn) {
                    btn.enable();
                });
            }
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
            width: 120,
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
            .on(egret.TouchEvent.TOUCH_END, function () {
            _this.global.rank();
        }, this)
            .disable();
        this.addChild(rank);
        var music = new Button({
            width: 120,
            height: 100,
            background: Const.btnColor,
            text: {
                text: '♫ ' + localStorage.getItem('music'),
                style: {
                    size: 30
                }
            }
        })
            .center(true, true, this, {
            x: 170,
            y: btnOffsetY
        })
            .on(egret.TouchEvent.TOUCH_END, function () {
            var musicStatus = localStorage.getItem('music') === 'ON' ? 'OFF' : 'ON';
            music.update({
                text: '♫ ' + musicStatus
            });
            localStorage.setItem('music', musicStatus);
        }, this)
            .disable();
        this.addChild(music);
        return [music, rank, startGame];
    };
    StartView.prototype.tutorial = function (btn, callback) {
        var _this = this;
        if (callback === void 0) { callback = function () { }; }
        var mask = new Mask(btn, this, {
            alpha: .8
        });
        this.addChildAt(mask, 9999);
        var next = new Button({
            width: 200,
            x: this.width - 250,
            text: {
                text: 'Next',
                style: { size: 40 }
            }
        })
            .on(egret.TouchEvent.TOUCH_END, function () {
            _this.removeChild(mask);
            _this.removeChild(next);
            callback();
        }, this);
        this.addChildAt(next, 9999);
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
        usernameInput.setFocus();
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
            console.log(usernameInput.input.text);
            if (!usernameInput.input.text) {
                var empty = new AlertEvent(AlertEvent.MSG, true);
                empty.msg = 'Username cannot be empty';
                _this.dispatchEvent(empty);
                console.log(empty);
                return;
            }
            else {
                localStorage.setItem('username', usernameInput.input.text);
                _this.btns.forEach(function (btn) {
                    btn.enable();
                });
                _this.removeChild(submitUsername);
                _this.removeChild(usernameInput);
                _this.removeChild(mask);
            }
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