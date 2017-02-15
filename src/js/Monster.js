export default class Monster {

    constructor(stage, level) {
        this.speed = 9 + level;
        this.stage = stage;
        this.pic = document.createElement('div');
        this.type = Math.ceil(Math.random() * 4);
        this.state = 1;
        this.stateType = 'walk';
        this.moveInterval = null;
        this.left = 1136;
        this.bottom = Math.floor(Math.random() * 220 + 130);
        this.init();
    }

    init() {
        let state = this.type + "-" + this.state;
        let style = this.pic.style;
        style.position = "absolute";
        this.next();
        style.left = this.left + "px";
        style.zIndex = 400 - this.bottom;
        style.bottom = this.bottom + "px";
    }

    walk() {
        this.state = this.state >= 4 ? 1 : this.state + 1;
    }

    die() {
        this.stateType = 'die';
        this.state = this.state < 5 ? 5 : this.state + 1;
        if (this.state > 12) {
            this.died();
        }
    }

    died() {
        this.stateType = 'died';
        this.stage.removeChild(this.pic);
    }

    next() {

        let state = this.type + "-" + ((this.state < 9) ? this.state : 8);
        let style = this.pic.style;
        if (this.stateType == 'walk') {
            this.walk();
        } else if (this.stateType == 'die') {
            this.die();
        } else {
            return;
        }
        this.left -= this.speed;
        this.pic.className = 'mons mons' + state;
        if (this.state < 9) {
            style.left = this.left + "px";
        }
    }

    render() {
        this.stage.appendChild(this.pic);
        this.moveInterval = setInterval(this.next.bind(this), 100);
    }
}