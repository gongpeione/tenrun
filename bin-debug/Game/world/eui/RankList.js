var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RankList = (function (_super) {
    __extends(RankList, _super);
    function RankList() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.complete, _this);
        _this.skinName = 'resource/rank.exml';
        return _this;
    }
    RankList.prototype.complete = function () {
        var dsListHeros = [
            { name: "伊文捷琳", score: '1000' },
            { name: "伊文捷琳", score: '1000' },
            { name: "伊文捷琳", score: '1000' },
            { name: "伊文捷琳", score: '1000' },
            { name: "伊文捷琳", score: '1000' },
            { name: "伊文捷琳", score: '1000' },
            { name: "伊文捷琳", score: '1000' },
            { name: "伊文捷琳", score: '1000' },
            { name: "伊文捷琳", score: '1000' },
            { name: "伊文捷琳", score: '1000' },
            { name: "伊文捷琳", score: '1000' },
        ];
        this.rankList.dataProvider = new eui.ArrayCollection(dsListHeros);
        this.rankList.itemRenderer = RankItem;
    };
    RankList.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return RankList;
}(eui.Component));
__reflect(RankList.prototype, "RankList");
var RankItem = (function (_super) {
    __extends(RankItem, _super);
    function RankItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/rankItem.exml";
        return _this;
    }
    RankItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return RankItem;
}(eui.ItemRenderer));
__reflect(RankItem.prototype, "RankItem");
//# sourceMappingURL=RankList.js.map