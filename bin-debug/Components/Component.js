var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        return _super.call(this) || this;
    }
    Component.prototype.center = function (x, y, context, offset) {
        if (offset === void 0) { offset = { x: 0, y: 0 }; }
        if (x) {
            this.x = (context.width - this.width) / 2 + offset.x;
        }
        if (y) {
            this.y = (context.height - this.height) / 2 + offset.y;
        }
        return this;
    };
    Component.prototype.disable = function () {
        this.alpha = .5;
        this.touchEnabled = false;
        return this;
    };
    Component.prototype.enable = function () {
        this.alpha = 1;
        this.touchEnabled = true;
        return this;
    };
    Component.prototype.on = function (event, callback, context) {
        this.touchEnabled = true;
        this.addEventListener(event, callback, context);
        return this;
    };
    return Component;
}(egret.Sprite));
__reflect(Component.prototype, "Component");
//# sourceMappingURL=Component.js.map