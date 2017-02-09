import Monster from './Monster.js';
import Aotuman from './Aotuman.js';
import Bullet from './Bullet.js';

export default class Stage {

    constructor() {
        this.init();
        // this.state = 'loading';
        this.interval = null;
        this.monsters = [];
        this.aotu = new Aotuman();
    }

    init() {
        let stage = document.getElementsByClassName('stage')[0];
        let page = document.createElement('div'),
            aotuman = document.createElement('div'),
            grass1 = document.createElement('div'),
            grass2 = document.createElement('div'),
            loading = document.createElement('div'),
            number1 = document.createElement('div'),
            number2 = document.createElement('div'),
            percent = document.createElement('div');
        page.className = 'page-0';
        aotuman.className = 'aotuman';
        grass1.className = 'grass1';
        grass2.className = 'grass2';
        loading.className = 'loading';
        number1.className = 'number1';
        number2.className = 'number2';
        percent.className = 'percent';
        page.appendChild(aotuman);
        page.appendChild(grass1);
        page.appendChild(grass2);
        loading.appendChild(number1);
        loading.appendChild(number2);
        loading.appendChild(percent);
        page.appendChild(loading);
        stage.appendChild(page);
    }

    loading(percent = 1) {
        // <div class="page-0" style="display: none;">
        //     <div class="aotuman"></div>
        //     <div class="grass1"></div>
        //     <div class="grass2"></div>
        //     <div class="loading">
        //         <div class="number"></div>
        //         <div class="icon"></div>
        //     </div>
        // </div>
        if (percent == 1) {
            this.start();
            console.log('finished');
        } else {

            this.renderLoading(Math.floor(percent[0] * 100 / percent[1]));
        }

    }

    renderLoading(num) {
        let number1DOM = document.getElementsByClassName('number1')[0],
            number2DOM = document.getElementsByClassName('number2')[0],
            num1 = Math.floor(num / 10),
            num2 = num % 10;
        number1DOM.style.backgroundPosition = -33 * num1 + 'px 0';
        number2DOM.style.backgroundPosition = -33 * num2 + 'px 0';
    }

    start() {
        // <div class="page-1" style="display: none;">
        //     <div class="start-icon"></div>
        //     <div class="start-btn"></div>
        // </div>

        let stage = document.getElementsByClassName('stage')[0];
        if (stage.getElementsByTagName('div')[0]) {
            stage.removeChild(stage.getElementsByTagName('div')[0]);
        }
        let page = document.createElement('div'),
            startIcon = document.createElement('div'),
            startBtn = document.createElement('div');
        page.className = 'page-1';
        startIcon.className = 'start-icon';
        startBtn.className = 'start-btn';
        startBtn.addEventListener('touchend', function() {
            this.play();
        }.bind(this));
        page.appendChild(startIcon);
        page.appendChild(startBtn);
        stage.appendChild(page);
    }

    play() {
        // <div class="page-2">
        //     <div class="aotuman"></div>
        //     <div class="topbar">
        //         <div class="power-slot"></div>
        //         <div class="power-fill"></div>
        //         <div class="mons-icon"></div>
        //         <div class="x"></div>
        //     </div>
        //     <div class="mons-stage">
        //     </div>
        //     <div class="control">
        //         <div class="control-1"></div>
        //         <div class="control-2"></div>
        //         <div class="control-3"></div>
        //         <div class="control-4"></div>
        //     </div>
        // </div>
        this.playInit();

        this.interval = setInterval(function() {
            let monster = new Monster();
            this.monsters.push(monster);

        }.bind(this), 2000);
        this.monsterInterval = setInterval(function() {
            this.renderMonster();
            if (this.monsters.some(function(monster) {
                    return monster.left < 310;
                })) {
                clearInterval(this.interval);
                clearInterval(this.monsterInterval);
                // this.end();
            }
        }.bind(this), 100);
        // var monster = new Monster();
        // var monsterInterval = setInterval(function() {
        //     document.getElementsByClassName("mons-stage")[0].appendChild(monster.render());
        // }, 100);
    }

    playInit() {
        this.monsters = [];
        let stage = document.getElementsByClassName('stage')[0];
        if (stage.getElementsByTagName('div')[0]) {
            stage.removeChild(stage.getElementsByTagName('div')[0]);
        }
        let page = document.createElement('div'),
            aotuman = document.createElement('div'),
            topbar = document.createElement('div'),
            powerSlot = document.createElement('div'),
            powerFill = document.createElement('div'),
            monsIcon = document.createElement('div'),
            x = document.createElement('div'),
            monsStage = document.createElement('div'),
            control = document.createElement('div'),
            control1 = document.createElement('div'),
            control2 = document.createElement('div'),
            control3 = document.createElement('div'),
            control4 = document.createElement('div');
        page.className = "page-2";
        aotuman.className = "aotuman";
        topbar.className = "topbar";
        powerSlot.className = "power-slot";
        powerFill.className = "power-fill";
        monsIcon.className = "mons-icon";
        x.className = "x";
        monsStage.className = "mons-stage";
        control.className = "control";
        control1.className = "key control-1";
        control2.className = "key control-2";
        control3.className = "key control-3";
        control4.className = "key control-4";
        control1.addEventListener('touchend', function() {
            if (!(this.aotu.shooting)) {
                this.aotu.singleBullet();
                this.killMonster(1);
            }
        }.bind(this));
        control2.addEventListener('touchend', function() {
            if (!(this.aotu.shooting)) {
                this.aotu.singleBullet();
                this.killMonster(2);
            }
        }.bind(this));
        control3.addEventListener('touchend', function() {
            if (!(this.aotu.shooting)) {
                this.aotu.singleBullet();
                this.killMonster(3);
            }
        }.bind(this));
        control4.addEventListener('touchend', function() {
            if (!(this.aotu.shooting)) {
                this.aotu.singleBullet();
                this.killMonster(4);
            }
        }.bind(this));
        aotuman.appendChild(this.aotu.render());
        page.appendChild(aotuman);
        topbar.appendChild(powerSlot);
        topbar.appendChild(powerFill);
        topbar.appendChild(monsIcon);
        topbar.appendChild(x);
        page.appendChild(topbar);
        page.appendChild(monsStage);
        control.appendChild(control1);
        control.appendChild(control2);
        control.appendChild(control3);
        control.appendChild(control4);
        page.appendChild(control);
        stage.appendChild(page);
    }

    end() {

        // <div className="page-3">
        //     <div className="aotuman"></div>
        //     <div className="score-board"></div>
        //     <div className="restart"></div>
        //     <div className="share"></div>
        //     <div className="grass"></div>
        // </div>

        let stage = document.getElementsByClassName('stage')[0];
        if (stage.getElementsByTagName('div')[0]) {
            stage.removeChild(stage.getElementsByTagName('div')[0]);
        }
        let page = document.createElement('div'),
            grass = document.createElement('div'),
            aotuman = document.createElement('div'),
            scoreBoard = document.createElement('div'),
            restart = document.createElement('div'),
            share = document.createElement('div');
        page.className = 'page-3';
        grass.className = 'grass';
        aotuman.className = 'aotuman';
        scoreBoard.className = 'score-board';
        restart.className = 'restart';
        restart.addEventListener('touchend', function() {
            this.start();
        }.bind(this));
        share.className = 'share';
        page.appendChild(aotuman);
        page.appendChild(scoreBoard);
        page.appendChild(grass);
        page.appendChild(restart);
        page.appendChild(share);
        stage.appendChild(page);
    }

    renderBullet(position) {
        console.log(position);
        let bullet = new Bullet(position);
        let monsStage = document.getElementsByClassName("mons-stage")[0];
        let bulletDOM = bullet.render();
        monsStage.appendChild(bulletDOM);
        setTimeout(bullet.trans.bind(bullet), 0);
        setTimeout(function() {
            monsStage.removeChild(bulletDOM);
        }, 110);
    }

    renderMonster() {
        let monsStage = document.getElementsByClassName("mons-stage")[0];
        if (monsStage.getElementsByTagName('div')[0]) {
            monsStage.removeChild(monsStage.getElementsByTagName('div')[0]);
        }
        this.monsters.map(function(monster) {
            monsStage.appendChild(monster.render());
        })
        this.monsters = this.monsters.filter(function(monster) {
            return !(monster.stateType == 'died');
        })
    }

    killMonster(num) {
        let flag = false; // 是否有怪兽被击倒
        for (let i = 0; i < this.monsters.length; i++) {
            if (this.monsters[i].stateType == 'walk' && this.monsters[i].type == num) {
                this.monsters[i].die();
                this.renderBullet([this.monsters[i].left, this.monsters[i].top])
                flag = true;
                break;
            }
        }
    }
}