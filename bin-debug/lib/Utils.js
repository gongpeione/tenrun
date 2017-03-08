function addChildren(container) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    children.forEach(function (child) {
        container.addChild(child);
    });
}
function screenshot(target) {
    // const options = option || {};
    var texture = null;
    if (target instanceof egret.Texture) {
        texture = target;
    }
    if (target instanceof egret.DisplayObject) {
        var rendered = new egret.RenderTexture();
        rendered.drawToTexture(target);
        texture = rendered;
    }
    return {
        texture: texture,
        toDataURL: function (parame) {
            if (parame === void 0) { parame = {}; }
            var area = parame.area ? (new egret.Rectangle(parame.area[0], parame.area[1], parame.area[2], parame.area[3])) : null;
            return texture.toDataURL(parame.format || "image/png", area);
        },
        toFile: function (parame) {
            if (parame === void 0) { parame = {}; }
            var area = parame.area ? (new egret.Rectangle(parame.area[0], parame.area[1], parame.area[2], parame.area[3])) : null;
            texture.saveToFile(parame.format, parame.fileName || 'download', area);
        }
    };
}
function loadImg(url) {
    var _this = this;
    var imgLoader = new egret.ImageLoader;
    return new Promise(function (resolve, reject) {
        imgLoader.once(egret.Event.COMPLETE, function (e) {
            var loader = e.currentTarget;
            var bmd = loader.data;
            var bmp = new egret.Bitmap(bmd);
            resolve(bmp);
        }, _this);
        imgLoader.load(url);
    });
}
//# sourceMappingURL=Utils.js.map