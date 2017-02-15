export default class Monster {

    constructor(stage, level) {
        // 怪兽每次移动速度随关卡提升而提升
        this.speed = 9 + level + Math.floor(Math.random() * 4 - 2);
        // 保存怪兽所属的DOM结构
        this.stage = stage;
        // 生成DOM节点
        this.pic = document.createElement('div');
        // 随机生成颜色
        this.type = Math.ceil(Math.random() * 4);
        // 当前动作帧数
        this.state = 1;
        // 所处生存状态: ['walk', 'die', 'died']
        this.stateType = 'walk';
        // 用于保存换动作以及移动的Interval
        this.moveInterval = null;
        // 从最右端往左走 位置相对舞台
        this.left = 1136;
        this.bottom = Math.floor(Math.random() * 220 + 130);
        this.init();
    }

    /** 初始化怪兽状态 */
    init() {
        let style = this.pic.style;
        style.position = "absolute";
        this.next();
        style.left = this.left + "px";
        style.zIndex = 400 - this.bottom;
        style.bottom = this.bottom + "px";
    }

    /** 怪兽被攻击 */
    hit() {
        this.stateType = 'die';
    }

    /** 怪兽死亡 */
    died() {
        // 状态变为死亡
        this.stateType = 'died';
        // 去掉控制走动的Interval
        clearInterval(this.moveInterval);
        // 从舞台中去掉该怪兽DOM
        this.stage.removeChild(this.pic);
    }

    /** 控制怪兽显示下一状态图 */
    next() {

        // this.state>8时怪兽保持倒在地上图片不变
        let state = this.type + "-" + ((this.state < 9) ? this.state : 8);
        let style = this.pic.style;

        if (this.stateType == 'walk') {
            this.state = this.state >= 4 ? 1 : this.state + 1;
        } else if (this.stateType == 'die') {
            this.state = this.state < 5 ? 5 : this.state + 1;
            if (this.state > 12) {
                this.died();
            }
        } else {
            return;
        }
        // 怪兽移动
        this.left -= this.speed;
        // 怪兽动作变换
        this.pic.className = 'mons mons' + state;
        // 怪兽倒下时保持不移动
        if (this.state < 9) {
            style.left = this.left + "px";
        }
    }

    render() {
        // 在舞台添加该怪兽
        this.stage.appendChild(this.pic);
        // 开始移动
        this.moveInterval = setInterval(this.next.bind(this), 100);
    }
}