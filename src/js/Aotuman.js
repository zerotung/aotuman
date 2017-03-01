const POWER_TOP = 100;

export default class Aotuman {

    constructor() {

        // 创建DOM
        this.pic = document.createElement('div');
        // 定位距离屏幕的左上距离
        this.left = 18;
        this.top = 139;
        // 是否正在开启超级模式
        this.super = false;
        // 是否正在发射子弹
        this.shooting = false;
        // 保存待发送子弹的弹夹(cache)
        this.bulletCache = [];
        // 这个量并没有用上
        this.startT = 0;
        // 凹凸曼的能量
        this.power = 90;
        this.next();
    }

    /** 发射单颗子弹动画 */
    singleBullet() {
        let self = this;
        // 变为正在发射子弹
        self.shooting = true;
        // 以一定间隔时间渲染图片
        // 期间无法发射下一颗子弹
        self.next(2, 1);
        setTimeout(function() {
            self.next(2, 2);
            setTimeout(function() {
                self.next(2, 3);
                // 退出发射子弹状态
                self.shooting = false;
                setTimeout(function() {
                    // 回复凹凸曼动作
                    self.next(1, 1);
                }, 50);
            }, 50);
        }, 50)
    }

    /** 发射两颗子弹动画 */
    doubleBullet() {
        let self = this;
        // 变为正在发射子弹
        self.shooting = true;
        // 以一定间隔时间渲染图片
        // 期间无法发射下一颗子弹
        self.next(3, 1);
        setTimeout(function() {
            self.next(3, 2);
            setTimeout(function() {
                self.next(3, 3);
                // 退出发射子弹状态
                self.shooting = false;
                setTimeout(function() {
                    // 回复凹凸曼动作
                    self.next(1, 1);
                }, 70);
            }, 70);
        }, 70)
    }

    /** 超级煎蛋时刻发射一颗子弹动画 */
    superStrike() {
        let self = this;
        self.shooting = true;
        // 使凹凸曼有后坐力的动画
        self.pic.style.left = 0;
        setTimeout(function() {
            self.pic.style.left = '18px';
            self.shooting = false;
        }, 50);
    }

    /**
     * [hit description]
     * @param  {@function} killMonster 杀死对应的怪兽
     */
    hit(killMonster) {
        if (this.super == false) {
            // 不在发射子弹情况下才能发射子弹
            if (this.shooting == false) {
                this.bulletCache.push(function() {
                    killMonster();
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
                        // this.bulletCache = [];
                        this.bulletCache.length = 0;
                    }.bind(this), 50);
                } else {
                    // 如果接收到第二颗子弹立马同时打出去
                    this.bulletCache[0]();
                    this.bulletCache[1]();
                    this.doubleBullet();
                    // 清空待发射的子弹
                    // this.bulletCache = [];
                    this.bulletCache.length = 0;
                }
            }
        } else {
            // 直接打出子弹
            killMonster();
            this.superStrike();
        }
    }

    /** 进入super模式 */
    superMode() {
        let self = this;
        self.shooting = true;
        setTimeout(function() {
            self.next(4, 1);
            setTimeout(function() {
                self.next(4, 2);
                // 在动画结束后改为super模式
                self.shooting = false;
                self.super = true;
            }, 500);
        }, 500)
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
            this.power += 1;
        }
        if (this.power >= POWER_TOP) {
            powerFull();
            this.power = 100;
        }
        renderPower(this.power);
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