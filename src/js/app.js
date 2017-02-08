// import Aotuman from './Aotuman.js';
// import Monster from './Monster.js';
import Player from './Player.js';
import Pre from './Pre.js';

let player = new Player();

// let aotu = new Aotulman();
// let monsters = [];

// 等待加载页的图片加载完后加载其他图片
window.onload = function() {
    let preload = new Pre(
        [ // start page
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
        ]
    );
    preload.preload(player.loading.bind(player), player.loading.bind(player));
}


// var monster = new Monster();
// var monsterInterval = setInterval(function() {
//     document.getElementsByClassName("mons-stage")[0].appendChild(monster.render());
// }, 100);

// var aotu = new Aotuman();
// document.querySelector(".page-2 .aotuman").appendChild(aotu.render());