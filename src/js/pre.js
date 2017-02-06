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
        console.log("done!");
    } else {
        console.log("not yet!");
    }
}

preload(
    'static/Aotuman.png',
    'static/Key.png',
    'static/MonsterIcon.png',
    'static/Monsters.png',
    'static/PowerFill.png',
    'static/PowerSlot.png',
    'static/game_bg.jpg',
    'static/x.png'
);