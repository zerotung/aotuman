const POWER_TOP = 100;

export default class Aotuman {

    constructor() {

        this.pic = document.createElement('div');
        this.left = 18;
        this.top = 139;
        this.super = false;
        this.shooting = false;
        this.bulletCache = [];
        this.startT = 0;
        this.power = 0;
        this.init();
    }

    init() {
        this.next();
    }

    singleBullet() {
        let state = 1;
        let self = this;
        self.shooting = true;
        self.next(2, 1);
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
        self.shooting = true;
        self.next(3, 1);
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

    superStrike() {
        let self = this;
        self.shooting = true;
        self.pic.style.left = 0;
        setTimeout(function() {
            self.pic.style.left = '18px';
            self.shooting = false;
        }, 50);
    }

    hit(appendBullet) {
        if (this.super == false) {

            if (this.shooting == false) {
                this.bulletCache.push(function() {
                    appendBullet();
                }.bind(this));
                if (this.bulletCache.length == 1) {

                    setTimeout(function() {
                        if (this.bulletCache.length == 1) {
                            this.bulletCache[0]();
                            this.singleBullet();
                        }
                        this.bulletCache = [];
                    }.bind(this), 50);
                } else {
                    this.bulletCache[0]();
                    this.bulletCache[1]();
                    this.doubleBullet()
                    this.bulletCache = [];
                }
            }
        } else {
            appendBullet();
            this.superStrike();
        }
    }

    superMode() {
        let self = this;

        setTimeout(function() {
            self.next(4, 1);
            setTimeout(function() {
                self.next(4, 2);
                self.super = true;
            }, 200);
        }, 200)
    }

    rmSuperMode(renderPower) {
        this.power = 0;
        this.super = false;
        renderPower(this.power);
        this.next();
    }

    powerUp(renderPower, powerFull) {
        if (this.power < POWER_TOP) {
            if (this.power == POWER_TOP - 1) {
                powerFull();
            }
            this.power += 1;
            renderPower(this.power);
        }
    }

    render(type = 1, state = 1) {
        return this.pic;
    }

    next(type = 1, state = 1) {
        this.pic.className = 'aotuman aotuman' + type + '-' + state;
    }
}