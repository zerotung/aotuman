export default class Preload {

    /**
     * 初始化图片路径以及图片数组
     * @param  {[type]} imgSrcs [description]
     * @return {[type]}         [description]
     */
    constructor(imgSrcs) {
        this.imgSrcs = imgSrcs;
        this.preImages = new Array();
    }

    /**
     * 预加载图片
     * @param  {Function} done   预加载完成时的回调函数
     * @param  {Function} notyet 预加载完成其中一个时的回调函数
     */
    preload(done, notyet) {

        for (let i = 0; i < this.imgSrcs.length; i++) {
            this.preImages[i] = new Image();
            this.preImages[i].src = this.imgSrcs[i];
            // 为图片添加一个是否加载完的属性
            this.preImages[i].isLoad = false;
            this.preImages[i].onload = function() {
                // 加载完后将属性修改为已加载完
                this.preImages[i].isLoad = true;
                // 每有一个图片加载完就执行一次
                this.isPreloadFinished(done, notyet);
            }.bind(this)
        }
    }

    /**
     * 判断是否全部图片都已加载完
     * @param {Function} done 预加载完成时的回调函数
     * @param {Function} notyet 预加载完成其中一个时的回调函数
     */
    isPreloadFinished(done = function() {}, notyet = function() {}) {

        // 保存已加载过的图片数组
        let PreloadedArr = this.preImages.filter(function(img) {
            return img.isLoad;
        });
        // 比较已加载过的数组长度和总长度来判断是否加载完
        let isAllPreloaded = PreloadedArr.length == this.preImages.length
        if (isAllPreloaded) {
            done();
        } else {
            notyet([PreloadedArr.length, this.preImages.length]);
        }
    }

}