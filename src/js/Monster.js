export default class Monster {

    constructor() {

        this.act = {
            "1-1": {
                "width": "216",
                "height": "196",
                "background-position": "-434px -980px"
            },
            "1-2": {
                "width": "217",
                "height": "196",
                "background-position": "-0px -872px"
            },
            "1-3": {
                "width": "216",
                "height": "196",
                "background-position": "-434px -980px"
            },
            "1-4": {
                "width": "216",
                "height": "196",
                "background-position": "-650px -784px"
            },
            "1-5": {
                "width": "216",
                "height": "196",
                "background-position": "-440px -392px"
            },
            "1-6": {
                "width": "208",
                "height": "200",
                "background-position": "-866px -390px"
            },
            "1-7": {
                "width": "209",
                "height": "190",
                "background-position": "-656px -380px"
            },
            "1-8": {
                "width": "224",
                "height": "169",
                "background-position": "-0px -338px"
            },
            "2-1": {
                "width": "216",
                "height": "196",
                "background-position": "-440px -196px"
            },
            "2-2": {
                "width": "217",
                "height": "196",
                "background-position": "-0px -676px"
            },
            "2-3": {
                "width": "216",
                "height": "196",
                "background-position": "-440px -196px"
            },
            "2-4": {
                "width": "216",
                "height": "196",
                "background-position": "-650px -980px"
            },
            "2-5": {
                "width": "216",
                "height": "196",
                "background-position": "-650px -588px"
            },
            "2-6": {
                "width": "208",
                "height": "200",
                "background-position": "-865px -190px"
            },
            "2-7": {
                "width": "209",
                "height": "190",
                "background-position": "-656px -190px"
            },
            "2-8": {
                "width": "224",
                "height": "169",
                "background-position": "-0px -169px"
            },
            "3-1": {
                "width": "216",
                "height": "196",
                "background-position": "-440px -0px"
            },
            "3-2": {
                "width": "217",
                "height": "196",
                "background-position": "-217px -676px"
            },
            "3-3": {
                "width": "216",
                "height": "196",
                "background-position": "-440px -0px"
            },
            "3-4": {
                "width": "216",
                "height": "196",
                "background-position": "-434px -588px"
            },
            "3-5": {
                "width": "216",
                "height": "196",
                "background-position": "-224px -392px"
            },
            "3-6": {
                "width": "208",
                "height": "200",
                "background-position": "-866px -590px"
            },
            "3-7": {
                "width": "209",
                "height": "190",
                "background-position": "-656px -0px"
            },
            "3-8": {
                "width": "224",
                "height": "169",
                "background-position": "-0px -507px"
            },
            "4-1": {
                "width": "216",
                "height": "196",
                "background-position": "-434px -784px"
            },
            "4-2": {
                "width": "217",
                "height": "196",
                "background-position": "-217px -872px"
            },
            "4-3": {
                "width": "216",
                "height": "196",
                "background-position": "-434px -784px"
            },
            "4-4": {
                "width": "216",
                "height": "196",
                "background-position": "-224px -196px"
            },
            "4-5": {
                "width": "216",
                "height": "196",
                "background-position": "-224px -0px"
            },
            "4-6": {
                "width": "208",
                "height": "200",
                "background-position": "-866px -790px"
            },
            "4-7": {
                "width": "209",
                "height": "190",
                "background-position": "-865px -0px"
            },
            "4-8": {
                "width": "224",
                "height": "169",
                "background-position": "-0px -0px"
            },
        }
        this.pic = document.createElement('div');
        this.type = Math.ceil(Math.random() * 4);
        this.state = 1;
        this.stateType = 'walk';
        this.left = 1136;
        this.top = Math.floor(Math.random() * 170 + 90);
        this.init();
    }

    init() {
        let state = this.type + "-" + this.state;
        let style = this.pic.style;
        style.position = "absolute";
        style.background = "url(\"static/Monsters.png\") no-repeat " + this.act[state]["background-position"];
        style.width = this.act[state].width + "px";
        style.height = this.act[state].height + "px";
        style.left = this.left + "px";
        style.top = this.top + "px";

    }

    walk() {
        this.state = this.state >= 4 ? 1 : this.state + 1;
    }

    die() {
        this.stateType = 'die';
        this.state = this.state < 5 ? 5 : this.state + 1;
        if (this.state == 8) {
            this.died();
        }
    }

    died() {
        this.stateType = 'died';
    }

    render() {
        let state = this.type + "-" + this.state;
        let style = this.pic.style;
        if (this.stateType == 'walk') {
            this.walk();
        } else if (this.stateType == 'die') {
            this.die();
        } else {

        }
        this.left -= 10;
        style.backgroundPosition = this.act[state]["background-position"];
        style.width = this.act[state].width + "px";
        style.height = this.act[state].height + "px";
        style.left = this.left + "px";
        return this.pic;
    }
}