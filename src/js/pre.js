var images = new Array();

function preload(...imgSrcs) {
    for (let i = 0; i < imgSrcs.length; i++) {
        images[i] = new Image();
        images[i].src = imgSrcs[i];
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