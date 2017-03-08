var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RankView = (function (_super) {
    __extends(RankView, _super);
    function RankView(context, width, height) {
        var _this = _super.call(this, context) || this;
        // this.width = width;
        // this.height = height;
        _this.global = context;
        _this.init();
        return _this;
    }
    RankView.prototype.init = function () {
        var rect = Draw.rect(null, {
            width: this.width,
            height: this.height,
        }).brush({
            width: 100,
            height: 100,
            background: 0xff000000
        });
        this.addChild(rect);
        var btn = new Button({
            width: 400,
            height: 100,
            img: 'btn',
            background: 0x43453e,
            text: {
                text: 'Rank',
                style: {
                    size: 50
                }
            }
        });
        this.addChild(btn);
        btn.update({
            width: 400,
            height: 100,
            img: 'btn',
            // background: 0x43453e,
            text: {
                text: '开始游戏',
                style: {
                    size: 50
                }
            }
        });
        btn.on(egret.TouchEvent.TOUCH_END, function (e) {
            console.log(btn);
            // btn.disable();
        }, this);
        btn.center(true, true, this);
    };
    return RankView;
}(View));
__reflect(RankView.prototype, "RankView");
//# sourceMappingURL=RankView.js.map