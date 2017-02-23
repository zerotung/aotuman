import Stage from './Stage.js';
import Pre from './Pre.js';

let stage = new Stage();

// 防止上下滑屏幕让屏幕禁止
document.getElementsByClassName('stage')[0].addEventListener('touchmove', function(e) {
    e.preventDefault();
});


// 等待加载页的图片加载完后加载其他图片
window.onload = function() {

    let preload = new Pre(
        [
            // start page
            'static/StartIcon.png',
            'static/StartBtn.png',
            // game page
            'static/Aotuman.png',
            'static/GameGrass.png',
            'static/Gap.png',
            'static/Key.png',
            'static/MonsIcon.png',
            // 'static/Monsters.png',
            'static/M1.png',
            'static/M2.png',
            'static/M3.png',
            'static/M4.png',
            'static/PowerFill.png',
            'static/PowerSlot.png',
            'static/game_bg.jpg',
            'static/Bullet.png',
            'static/SuperLight.png',
            'static/SuperStrike.png',
            'static/StrikeBoard.png',
            // end page
            'static/Grass2.png',
            'static/Man2.png',
            'static/ScoreBoard.png',
            'static/NumHighest.png',
            'static/NumScore.png',
            'static/Restart.png',
            'static/Share.png',
            // share page
            'static/RankList.png',
            'static/Rank1.png',
            'static/Rank2.png',
            'static/Rank3.png',
            'static/User.png'
        ]
    );
    preload.preload(stage.loading.bind(stage), stage.loading.bind(stage));
}