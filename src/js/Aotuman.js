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
        this.pic = document.createElement('div');
        this.left = 18;
        this.top = 139;
        this.shooting = false;
        this.init();
    }

    init() {
        let style = this.pic.style;
        style.left = this.left + 'px';
        style.top = this.top + 'px';
        style.background = "url(\"static/Aotuman.png\") no-repeat " + this.act["1-1"]["background-position"];


    }

    singleBullet() {
        let state = 1;
        let style = this.pic.style;
        let self = this;
        this.shooting = true;
        this.render(2, 1);
        setTimeout(function() {
            self.render(2, 2);
            setTimeout(function() {
                self.render(2, 3);
                self.shooting = false;
                setTimeout(function() {
                    self.render(1, 1);
                }, 100);
            }, 100);
        }, 100)
    }

    doubleBullet() {
        let state = 1;
        let style = this.pic.style;
        let self = this;
        this.shooting = true;
        this.render(3, 1);
        setTimeout(function() {
            self.render(3, 2);
            setTimeout(function() {
                self.render(3, 3);
                self.shooting = false;
                setTimeout(function() {
                    self.render(1, 1);
                }, 100);
            }, 100);
        }, 100)
    }

    render(type = 1, state = 1) {
        let style = this.pic.style;
        style.width = this.act[type + '-' + state].width;
        style.height = this.act[type + '-' + state].height;
        style.backgroundPosition = this.act[type + '-' + state]["background-position"];
        return this.pic;
    }
}