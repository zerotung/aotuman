class Aotuman {
    // .aotuman {

    //     width: 114px;
    //     height: 121px;
    //     background-image: url("Aotuman.png");
    //     position: absolute;
    //     left: 18px;
    //     top: 139px;
    // }

    constructor() {

        this.pic = new Image();
        this.pic.src = "static/Aotuman.png";
        this.initWidth = 114;
        this.initHeight = 121;
        this.initLeft = 18;
        this.initTop = 139;
        this.init();
    }

    init() {
        this.width = this.initWidth;
        this.height = this.initHeight;
        this.left = this.initLeft;
        this.top = this.initTop;
    }

}