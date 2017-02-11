export default class Aotuman {

    constructor() {

        this.pic = document.createElement('div');
        this.left = 18;
        this.top = 139;
        this.shooting = false;
        this.init();
    }

    init() {
        this.next();
    }

    singleBullet() {
        let state = 1;
        let self = this;
        this.shooting = true;
        this.next(2, 1);
        setTimeout(function() {
            self.next(2, 2);
            setTimeout(function() {
                self.next(2, 3);
                self.shooting = false;
                setTimeout(function() {
                    self.next(1, 1);
                }, 50);
            }, 50);
        }, 50)
    }

    doubleBullet() {
        let state = 1;
        let self = this;
        this.shooting = true;
        this.next(3, 1);
        setTimeout(function() {
            self.next(3, 2);
            setTimeout(function() {
                self.next(3, 3);
                self.shooting = false;
                setTimeout(function() {
                    self.next(1, 1);
                }, 100);
            }, 100);
        }, 100)
    }

    render(type = 1, state = 1) {
        return this.pic;
    }

    next(type = 1, state = 1) {
        this.pic.className = 'aotuman aotuman' + type + '-' + state;
    }
}