export default class Bullet {

    /**
     * 创建子弹的DOM和开始结束位置
     * @param  {Number} [endX 结束的横坐标(相对左)
     * @param  {Number} endY] 结束的纵坐标(相对底)
     */
    constructor([endX, endY] = endPos) {
        // 获取屏幕可视区域高度
        let stageH = document.body.clientHeight;
        // 结束点(相对顶)=屏幕高度-相对底部的高度-怪兽高度+偏差
        this.end = [endX, stageH - endY - 196 + 10];
        // 凹凸曼出手位置
        this.start = [280, 250];
        // 计算子弹旋转的角度
        this.angle = 360 * Math.atan((this.end[1] - this.start[1]) / (this.end[0] - this.start[0])) / (2 * Math.PI);
        console.log(this.angle);
        // 新建DOM结构
        this.img = document.createElement('div');
        this.img.className = 'bullet';
    }

    /**
     * 渲染子弹
     * @return {DOM} 该子弹的DOM
     */
    render() {
        let style = this.img.style;
        style.position = 'absolute';
        style.left = this.start[0] + 'px';
        style.top = this.start[1] + 'px';
        // 通过transform:rotate将子弹旋转一定角度
        let browsers = ['transform', 'msTransform', 'mozTransform', 'webkitTransform', 'oTransform'];
        browsers.forEach(function(browser) {
            style[browser] = 'rotate(' + this.angle + 'deg)';
        }.bind(this));
        return this.img;
    }

    /** 为子弹添加移动到怪兽位置的transform */
    trans() {
        // 兼容不同浏览器
        let browsers = ['transform', 'msTransform', 'mozTransform', 'webkitTransform', 'oTransform'];
        browsers.forEach(function(browser) {
            this.img.style[browser] = 'translate(' + (this.end[0] - this.start[0]) + 'px,' + (this.end[1] - this.start[1]) + 'px)';
        }.bind(this));
    }
}