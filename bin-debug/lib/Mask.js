var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Mask = (function (_super) {
    __extends(Mask, _super);
    function Mask(hole, context, style) {
        var _this = _super.call(this) || this;
        _this.hole = hole;
        _this.context = context;
        style = style || {};
        _this.gap = style.gap || 10;
        _this.background = style.background || 0xff000000;
        _this.alpha = style.alpha || .8;
        _this.init();
        return _this;
    }
    Mask.prototype.init = function () {
        var top = Draw.rect(null, {
            width: this.context.width,
            height: this.hole.y - this.gap,
        }).brush({
            background: this.background
        });
        var right = Draw.rect(null, {
            x: this.hole.x + this.hole.width + this.gap,
            y: this.hole.y - this.gap,
            width: this.context.width - this.hole.x - this.hole.width - this.gap,
            height: this.hole.height + this.gap * 2,
        }).brush({
            background: this.background
        });
        var bottom = Draw.rect(null, {
            y: this.hole.y + this.hole.height + this.gap,
            width: this.context.width,
            height: this.context.height - this.hole.y - this.hole.height - this.gap,
        }).brush({
            background: this.background
        });
        var left = Draw.rect(null, {
            y: this.hole.y - this.gap,
            width: this.hole.x - this.gap,
            height: this.hole.height + this.gap * 2,
        }).brush({
            background: this.background
        });
        this.addChild(top);
        this.addChild(right);
        this.addChild(bottom);
        this.addChild(left);
    };
    return Mask;
}(egret.DisplayObjectContainer));
__reflect(Mask.prototype, "Mask");
//# sourceMappingURL=Mask.js.map