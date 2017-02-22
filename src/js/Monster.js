export default class Monster {

    constructor(speed) {
        this.speed = speed;
        // 生成DOM节点
        this.pic = document.createElement('div');
        // 随机生成颜色
        this.type = Math.ceil(Math.random() * 4);
        // 当前动作帧数
        this.state = 1;
        // 所处生存状态: ['walk', 'die', 'died']
        this.stateType = 'walk';
        // 从最右端往左走 位置相对舞台
        this.left = 1136;
        this.bottom = Math.floor(Math.random() * 220 + 130);
        this.init();
    }

    /** 初始化怪兽状态 */
    init() {
        let state = this.type + "-" + this.state;
        let style = this.pic.style;
        style.position = "absolute";
        this.next();
        style.left = this.left + "px";
        style.zIndex = 400 - this.bottom;
        style.bottom = this.bottom + "px";
    }

    die() {
        this.stateType = 'die';
        this.state = this.state < 5 ? 5 : this.state + 1;
        if (this.state > 12) {
            this.died();
        }
    }

    /** 怪兽死亡 */
    died() {
        this.stateType = 'died';
    }

    /** 控制怪兽显示下一状态图 */
    next() {

        // this.state>8时怪兽保持倒在地上图片不变
        let state = 't' + this.type + " s" + ((this.state < 9) ? this.state : 8);
        let style = this.pic.style;

        if (this.stateType == 'walk') {
            this.state = this.state >= 4 ? 1 : this.state + 1;
        } else if (this.stateType == 'die') {
            this.die();
        } else {
            return;
        }
        // 怪兽移动
        // this.left -= 10;
        this.left -= this.speed;
        // 怪兽动作变换
        this.pic.className = 'mons ' + state;
        // 怪兽倒下时保持不移动
        if (this.state < 9) {
            style.left = this.left + "px";
        }
    }

    /**
     * 返回该怪兽的DOM
     * @return {DOM} 该怪兽的DOM
     */
    render() {
        return this.pic;
    }
}