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
        _this.init();
        return _this;
    }
    RankView.prototype.init = function () {
        this.addChildAt(this.bg(), 0);
        this.scroll();
    };
    RankView.prototype.bg = function () {
        return Draw.rect(null, {
            width: this.width,
            height: this.height,
        }).brush({
            background: Const.mainColor
        });
    };
    RankView.prototype.scroll = function () {
        var list = new RankList();
        this.addChild(list);
        // const wrap: egret.Sprite = Draw.rect(null, {
        //     width: 800,
        // }).brush({
        //     background: Const.btnColor
        // });
        // wrap.x = (this.width - wrap.width) / 2;
        // let listY = 0;
        // fetch('https://node.geeku.net/tenrun/score')
        //     .then((res: responseObject) => res.json())
        //     .then(data => {
        //         data.forEach(item => {
        //             console.log(item);
        //             wrap.addChild(Draw.text(
        //                 item.name + item.score,
        //                 {
        //                     y: listY += 50,
        //                     textColor: 0xff000000
        //                 }
        //             ));
        //         });
        //     })
        // var myscrollView:egret.ScrollView = new egret.ScrollView();
        // myscrollView.setContent(wrap);
        // myscrollView.width = 800;
        // myscrollView.height = 200;
        // this.addChild(myscrollView);
    };
    return RankView;
}(View));
__reflect(RankView.prototype, "RankView");
//# sourceMappingURL=RankView.js.map