interface InputStyle {
    x?: number,
    y?: number,
    padding?: number | Array<number>,
    background?: number | string
    inputStyle?
}
 
class Input extends Component {

    public inputStyle;
    public background;
    public padding;

    private _input;
    constructor (inputStyle: InputStyle) {
        super();

        Object.assign(this, inputStyle);

        const inputWidth = (inputStyle.inputStyle.width || 400);
        const inputHeight = (inputStyle.inputStyle.height || 40);

        if (!Array.isArray(inputStyle.padding)) {
            this.width = inputWidth + inputStyle.padding * 2;
            this.height = inputHeight + inputStyle.padding * 2;
        } else {
            this.width = inputWidth + inputStyle.padding[1] + inputStyle.padding[3];
            this.height = inputHeight+ inputStyle.padding[0] + inputStyle.padding[2];
        }

        this.inputStyle = Object.assign({}, inputStyle.inputStyle);

        this.addChild(this.createBg());
        
        this.input = this.createInput();
        this.addChild(this.input);
    }

    createInput () {

        const usernameInput = new egret.TextField();
        const style = this.inputStyle;
        
        let position = {
            x: 0,
            y: 0
        };

        if (!Array.isArray(this.padding)) {
            position.x = position.y = this.padding;
        } else {
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
    }

    createBg () {
        const rect = Draw.rect(null, {
            width: this.width,
            height: this.height,
        })
        .brush({
            background: this.background,
            width: this.width,
            height: this.height,
        });

        return rect;
    }

    get input () {
        return this._input;
    }

    set input (i) {
        this._input =i;
    }
}