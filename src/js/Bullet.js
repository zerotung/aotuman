export default class Bullet {

    /**
     * 创建子弹的DOM和开始结束位置
     * @param  {Number} [endX 结束的横坐标
     * @param  {Number} endY] 结束的纵坐标
     */
    constructor([endX, endY] = endPos) {
        this.end = [endX, 400 - endY];
        this.start = [280, 250];
        this.img = document.createElement('div');
        // this.img.src = 'static/Bullet.png';
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