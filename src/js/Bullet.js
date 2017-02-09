export default class Bullet {

    constructor([endX, endY] = endPos) {
        this.end = [endX + 20, endY + 50];
        this.start = [280, 250];
        this.img = new Image();
        this.img.src = 'static/Bullet.png';
        this.img.className = 'bullet';
    }

    render() {
        let style = this.img.style;
        style.position = 'absolute';
        style.left = this.start[0] + 'px';
        style.top = this.start[1] + 'px';
        console.log(this.end);
        // transform: translate(50px,100px);
        // -ms-transform: translate(50px,100px);       /* IE 9 */
        // -webkit-transform: translate(50px,100px);   /* Safari and Chrome */
        // -o-transform: translate(50px,100px);        /* Opera */
        // -moz-transform: translate(50px,100px);      /* Firefox */
        // style.transform = 'translate(' + (this.end[0] - this.start[0]) + 'px,' + (this.end[1] - this.start[1]) + 'px)';
        return this.img;
    }

    trans() {
        let browsers = ['transform', 'msTransform', 'mozTransform', 'webkitTransform', 'oTransform'];
        browsers.forEach(function(browser) {
            this.img.style[browser] = 'translate(' + (this.end[0] - this.start[0]) + 'px,' + (this.end[1] - this.start[1]) + 'px)';
        }.bind(this));
    }
}