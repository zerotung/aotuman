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
        this.next();
    }

    /** 发射单颗子弹动画 */
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

    /** 发射两颗子弹动画 */
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
                }, 70);
            }, 70);
        }, 70)
    }

    /** 超级煎蛋时刻发射一颗子弹动画 */
    superStrike() {
        let self = this;
        self.shooting = true;
        self.pic.style.left = 0;
        self.next(4, 2);
        setTimeout(function() {
            self.pic.style.left = '18px';
            self.shooting = false;
        }, 50);
    }

    /**
     * [hit description]
     * @param  {[type]} appendBullet [description]
     * @return {[type]}              [description]
     */
    hit(appendBullet) {
        if (this.super == false) {
            // 不在攻击情况下才能发射子弹
            if (this.shooting == false) {
                this.bulletCache.push(function() {
                    appendBullet();
                }.bind(this));

                // 第一次接收到子弹等待
                if (this.bulletCache.length == 1) {

                    setTimeout(function() {
                        // 如果还是只有一颗子弹
                        if (this.bulletCache.length == 1) {
                            this.bulletCache[0]();
                            this.singleBullet();
                        }
                        // 清空待发射的子弹
                        this.bulletCache = [];
                    }.bind(this), 50);
                } else {
                    // 如果接收到第二颗子弹立马同时打出去
                    this.bulletCache[0]();
                    this.bulletCache[1]();
                    this.doubleBullet()
                        // 清空待发射的子弹
                    this.bulletCache = [];
                }
            }
        } else {
            // 直接打出子弹
            appendBullet();
            this.superStrike();
        }
    }

    /** 进入super模式 */
    superMode() {
        let self = this;

        setTimeout(function() {
            self.next(4, 1);
            setTimeout(function() {
                self.next(4, 2);
                // 在动画结束后改为super模式
                self.super = true;
            }, 200);
        }, 200)
    }

    /** 退出super模式 */
    rmSuperMode(renderPower) {
        // 能量条清空
        this.power = 0;
        this.super = false;
        // 重新渲染能量条
        renderPower(this.power);
        // 恢复初始动作
        this.next();
    }

    /**
     * 提升能量
     * @param  {Function} renderPower 舞台渲染能量条(接收能量值)
     * @param  {Function} powerFull   满能量时回调函数
     */
    powerUp(renderPower, powerFull) {
        if (this.power < POWER_TOP) {
            if (this.power == POWER_TOP - 1) {
                powerFull();
            }
            this.power += 1;
            renderPower(this.power);
        }
    }

    /** 返回DOM */
    render(type = 1, state = 1) {
        return this.pic;
    }

    /**
     * 修改DOM的类名以更改图片
     * @param  {Number}   type  状态对应数
     * @param  {Number}   state 帧数
     */
    next(type = 1, state = 1) {
        this.pic.className = 'aotuman aotuman' + type + '-' + state;
    }
}