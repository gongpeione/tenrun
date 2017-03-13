var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Input = (function (_super) {
    __extends(Input, _super);
    // private inputArea;
    function Input(inputStyle) {
        var _this = _super.call(this) || this;
        Object.assign(_this, inputStyle);
        var inputWidth = (inputStyle.inputStyle.width || 400);
        var inputHeight = (inputStyle.inputStyle.height || 40);
        if (!Array.isArray(inputStyle.padding)) {
            _this.width = inputWidth + inputStyle.padding * 2;
            _this.height = inputHeight + inputStyle.padding * 2;
        }
        else {
            _this.width = inputWidth + inputStyle.padding[1] + inputStyle.padding[3];
            _this.height = inputHeight + inputStyle.padding[0] + inputStyle.padding[2];
        }
        _this.inputStyle = Object.assign({}, inputStyle.inputStyle);
        _this.addChild(_this.createBg());
        _this.input = _this.createInput();
        _this.addChild(_this.input);
        return _this;
    }
    Input.prototype.createInput = function () {
        var usernameInput = new egret.TextField();
        var style = this.inputStyle;
        var position = {
            x: 0,
            y: 0
        };
        if (!Array.isArray(this.padding)) {
            position.x = position.y = this.padding;
        }
        else {
            position.x = this.padding[3];
            position.y = this.padding[0];
        }
        console.log(position);
        Object.assign(usernameInput, {
            type: style.type || egret.TextFieldType.INPUT,
            width: style.width || 400,
            height: style.height || 40,
            x: position.x,
            y: position.y,
            textColor: style.textColor || 0xff000000
        });
        return usernameInput;
    };
    Input.prototype.createBg = function () {
        var rect = Draw.rect(null, {
            width: this.width,
            height: this.height,
        })
            .brush({
            background: this.background,
            width: this.width,
            height: this.height,
        });
        return rect;
    };
    Object.defineProperty(Input.prototype, "input", {
        get: function () {
            return this._input;
        },
        set: function (i) {
            this._input = i;
        },
        enumerable: true,
        configurable: true
    });
    Input.prototype.setFocus = function () {
        this.input.setFocus();
    };
    return Input;
}(Component));
__reflect(Input.prototype, "Input");
//# sourceMappingURL=Input.js.map