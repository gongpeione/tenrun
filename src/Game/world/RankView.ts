class RankView extends View {

    constructor (context, width, height) {
        super(context);
        this.init();
    }

    init () {

        this.addChildAt(this.bg(), 0);
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

        const list = new RankList();
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
    }
}