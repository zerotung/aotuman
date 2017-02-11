export default class Monster {

    constructor() {

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
        this.next();
        style.left = this.left + "px";
        style.zIndex = this.top;
        style.top = this.top + "px";

    }

    walk() {
        this.state = this.state >= 4 ? 1 : this.state + 1;
    }

    die() {
        this.stateType = 'die';
        this.state = this.state < 5 ? 5 : this.state + 1;
        if (this.state > 8) {
            this.died();
        }
    }

    died() {
        this.stateType = 'died';
    }

    next() {

        let state = this.type + "-" + this.state;
        let style = this.pic.style;
        if (this.stateType == 'walk') {
            this.walk();
        } else if (this.stateType == 'die') {
            this.die();
        } else {
            return;
        }
        this.left -= 10;
        this.pic.className = 'mons mons' + state;
        style.left = this.left + "px";
    }

    render() {
        return this.pic;
    }
}