var monster = new Monster();
var monsterInterval = setInterval(function() {
    document.getElementsByClassName("mons-stage")[0].appendChild(monster.render());
}, 100);