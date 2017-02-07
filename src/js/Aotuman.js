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

        this.act = {
            "1-1": {
                "width": "262px",
                "height": "290px",
                "background-position": "-586px -290px"
            },
            "2-1": {
                "width": "274px",
                "height": "290px",
                "background-position": "-572px -581px"
            },
            "2-2": {
                "width": "313px",
                "height": "293px",
                "background-position": "-0px -0px"
            },
            "2-3": {
                "width": "274px",
                "height": "290px",
                "background-position": "-313px -0px"
            },
            "3-1": {
                "width": "274px",
                "height": "288px",
                "background-position": "-312px -293px"
            },
            "3-2": {
                "width": "298px",
                "height": "293px",
                "background-position": "-0px -586px"
            },
            "3-3": {
                "width": "274px",
                "height": "293px",
                "background-position": "-298px -586px"
            },
            "4-1": {
                "width": "244px",
                "height": "291px",
                "background-position": "-846px -580px"
            },
            "4-2": {
                "width": "312px",
                "height": "293px",
                "background-position": "-0px -293px"
            }
        }
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