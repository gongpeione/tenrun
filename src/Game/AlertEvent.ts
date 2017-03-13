class AlertEvent extends egret.Event {

    public static MSG = 'msg';
    public static WARNING = 'warning';
    public static ERROR = 'error';

    public msg = '';
    constructor (type:string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }
}