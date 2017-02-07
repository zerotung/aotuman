var preImages = new Array();

function preload(...imgSrcs) {
    for (let i = 0; i < imgSrcs.length; i++) {
        preImages[i] = new Image();
        preImages[i].src = imgSrcs[i];
        preImages[i].isLoad = false;
        preImages[i].onload = function() {
            preImages[i].isLoad = true;
            isPreloadFinished();
        }
    }

}

function isPreloadFinished() {

    let isAllPreloaded = preImages.every(function(img) {
        return img.isLoad;
    });
    if (isAllPreloaded) {
        player.loading(true);
        console.log("done!");
    } else {
        player.loading(false);
        console.log("not yet!");
    }
}

// 等待加载页的图片加载完后加载其他图片
window.onload = function() {
    preload(
        // start page
        'static/StartIcon.png',
        'static/StartBtn.png',
        // game page
        'static/Aotuman.png',
        'static/Key.png',
        'static/MonsIcon.png',
        'static/Monsters.png',
        'static/PowerFill.png',
        'static/PowerSlot.png',
        'static/game_bg.jpg',
        'static/X.png',
        // end page
        'static/Grass2.png',
        'static/Man2.png',
        'static/ScoreBoard.png',
        'static/Restart.png',
        'static/Share.png',
    );
}