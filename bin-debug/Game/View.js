var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View = (function (_super) {
    __extends(View, _super);
    function View(context) {
        var _this = _super.call(this) || this;
        _this.global = context;
        _this.width = _this.global.width;
        _this.height = _this.global.height;
        _this.backBtn = new Button({
            width: 60,
            height: 60,
            x: 10,
            y: 10,
            background: Const.btnColor,
            text: {
                text: '<',
                style: {
                    size: 30
                }
            }
        })
            .on(egret.TouchEvent.TOUCH_END, function (e) {
            _this.global.main();
        }, _this);
        _this.addChild(_this.backBtn);
        var bgColor = Draw.rect(null, {
            width: _this.width,
            height: _this.height
        })
            .brush({
            width: _this.width,
            height: _this.height,
            background: 0xffffff
        });
        _this.addChildAt(bgColor, 0);
        _this.addEventListener(AlertEvent.MSG, function (e) {
            console.log(e);
            var alert = new Button({
                y: _this.height - 200,
                width: 400,
                height: 80,
                background: Const.btnColor,
                alpha: 1,
                text: {
                    text: e.msg,
                    style: {
                        size: 30,
                        color: 0xfffff
                    }
                }
            })
                .center(true, false, _this);
            _this.addChild(alert);
            setTimeout(function () {
                var tw = egret.Tween.get(alert);
                tw.to({ alpha: 0 }, 1000);
            }, 3000);
        }, _this);
        return _this;
    }
    return View;
}(egret.DisplayObjectContainer));
__reflect(View.prototype, "View");
//# sourceMappingURL=View.js.map