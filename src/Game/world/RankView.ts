class RankView extends View {

    constructor (context, width, height) {
        super(context);
        this.init();
    }

    init () {

        this.addChildAt(this.bg(), 1);
        this.scroll();
        
    }

    bg () {
        return Draw.rect(null, {
            width: this.width,
            height: this.height,
        }).brush({
            background: Const.mainColor
        });
    }

    scroll () {

        const listBg = Draw.rect(null, {
            width: 840,
            height: 440,
            x: 148,
            y: 142
        }).brush({
            background: Const.btnColor
        });
        
        this.addChild(listBg);

        const list: RankList = new RankList();
        this.addChild(list);
        
        // const wrap: egret.Sprite = Draw.rect(null, {
        //     width: 800,
        // }).brush({
        //     background: Const.btnColor
        // });

        // wrap.x = (this.width - wrap.width) / 2;
        
        // let listY = 0;
        fetch('https://node.geeku.net/tenrun/score')
            .then((res: responseObject) => res.json())
            .then(data => {
                const _list = [];
                let index = 1;
                data.forEach(item => {
                    console.log(item);
                    _list.push({
                        index: index + '',
                        name: item.name,
                        score: item.score + ''
                    });
                    index++;
                });
                
                list.updateData(_list);
            })

        // var myscrollView:egret.ScrollView = new egret.ScrollView();
        // myscrollView.setContent(wrap);
        // myscrollView.width = 800;
        // myscrollView.height = 200;

        // this.addChild(myscrollView);
    }
}