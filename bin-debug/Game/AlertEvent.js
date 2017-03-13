var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AlertEvent = (function (_super) {
    __extends(AlertEvent, _super);
    function AlertEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.msg = '';
        return _this;
    }
    return AlertEvent;
}(egret.Event));
AlertEvent.MSG = 'msg';
AlertEvent.WARNING = 'warning';
AlertEvent.ERROR = 'error';
__reflect(AlertEvent.prototype, "AlertEvent");
//# sourceMappingURL=AlertEvent.js.map