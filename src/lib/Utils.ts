function addChildren (container: egret.DisplayObjectContainer, ...children) {
    children.forEach(child => {
        container.addChild(child);
    });
}

interface ScreenshotParame {
    format?: "image/png" | "image/jpeg",
    area?: [number, number, number, number],
    fileName?: string
}
function screenshot (target) {

    // const options = option || {};
    let texture: egret.Texture = null;
    if (target instanceof egret.Texture ) {
        texture = target;
    }

    if (target instanceof egret.DisplayObject) {
        const rendered: egret.RenderTexture = new egret.RenderTexture();
        rendered.drawToTexture(target);
        texture = rendered;
    }

    return {
        texture: texture,
        toDataURL: (parame: ScreenshotParame = {}) => {
            const area = parame.area ? (new egret.Rectangle(parame.area[0], parame.area[1], parame.area[2], parame.area[3])) : null;
            return texture.toDataURL(parame.format || "image/png", area);
        },
        toFile: (parame: ScreenshotParame = {}) => {
            const area = parame.area ? (new egret.Rectangle(parame.area[0], parame.area[1], parame.area[2], parame.area[3])) : null;
            texture.saveToFile(parame.format, parame.fileName || 'download', area);
        }
    }
}

function loadImg (url) {
    const imgLoader:egret.ImageLoader = new egret.ImageLoader;
    return new Promise((resolve, reject) => {
        imgLoader.once( egret.Event.COMPLETE, (e: egret.Event) => {
            const loader:egret.ImageLoader = e.currentTarget;
            const bmd:egret.BitmapData = loader.data;
            const bmp:egret.Bitmap = new egret.Bitmap( bmd );
            resolve(bmp);
        }, this ); 
        imgLoader.load( url );
    })
}