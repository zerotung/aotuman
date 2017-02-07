export default class Preload {

    constructor(imgSrcs) {
        this.imgSrcs = imgSrcs;
        this.preImages = new Array();
    }

    preload() {

        for (let i = 0; i < this.imgSrcs.length; i++) {
            this.preImages[i] = new Image();
            this.preImages[i].src = this.imgSrcs[i];
            this.preImages[i].isLoad = false;
            this.preImages[i].onload = function() {
                this.preImages[i].isLoad = true;
                this.isPreloadFinished();
            }.bind(this)
        }
    }

    isPreloadFinished() {

        let isAllPreloaded = this.preImages.every(function(img) {
            return img.isLoad;
        });
        if (isAllPreloaded) {
            console.log("done!");
        } else {
            console.log("not yet!");
        }
    }
}