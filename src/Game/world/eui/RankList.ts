class RankList extends eui.Component {

    private rankList: eui.List;
    private rankScroll: eui.Scroller;
    constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE, this.complete, this);
        this.skinName = 'resource/rank.exml';
    }

    complete () {
        var rankListArray:Array<Object> = [
            { index: '', name: "加载中", score: '' },
        ];
        this.rankList.dataProvider = new eui.ArrayCollection( rankListArray );

        this.rankList.itemRenderer = RankItem;
    }

    updateData (rankListArray: Array<Object>) {
        this.rankList.dataProvider = new eui.ArrayCollection(rankListArray);
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