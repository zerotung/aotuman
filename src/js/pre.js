export default class Preload {

    constructor(imgSrcs) {
        this.imgSrcs = imgSrcs;
        this.preImages = new Array();
    }

    preload(done, notyet) {

        for (let i = 0; i < this.imgSrcs.length; i++) {
            this.preImages[i] = new Image();
            this.preImages[i].src = this.imgSrcs[i];
            this.preImages[i].isLoad = false;
            this.preImages[i].onload = function() {
                this.preImages[i].isLoad = true;
                this.isPreloadFinished(done, notyet);
            }.bind(this)
        }
    }

    isPreloadFinished(done = function() {}, notyet = function() {}) {

        let PreloadedArr = this.preImages.filter(function(img) {
            return img.isLoad;
        });
        let isAllPreloaded = PreloadedArr.length == this.preImages.length
        if (isAllPreloaded) {
            done();
        } else {
            notyet([PreloadedArr.length, this.preImages.length]);
        }
    }

}