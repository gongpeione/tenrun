class RankList extends eui.Component {

    private rankList: eui.List;
    private rankScroll: eui.Scroller;
    constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE, this.complete, this);
        this.skinName = 'resource/rank.exml';
    }

    complete () {
         var dsListHeros:Array<Object> = [
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
        this.rankList.dataProvider = new eui.ArrayCollection( dsListHeros );

        this.rankList.itemRenderer = RankItem;
    }

    protected createChildren() {
        super.createChildren();
    }
}

class RankItem extends eui.ItemRenderer {

    constructor() {
        super();
        this.skinName = "resource/rankItem.exml";
    }

    protected createChildren():void {
        super.createChildren();
    }

    /*protected dataChanged():void{
     console.log( "\tCheckbox:", this.data.checked );
     //this.cb.selected = this.data.checked;
     }*/

}