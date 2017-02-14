import Monster from './Monster.js';
import Aotuman from './Aotuman.js';
import Bullet from './Bullet.js';
import Level from './Level.js';
import Cookie from './Cookie';

export default class Stage {

    constructor() {
        this.init();
        this.interval = null;
        this.powerInter = null;
        this.monsters = [];
        this.aotu = new Aotuman();
        this.score = 0;
        this.level = 0;
        this.startTime = 0;
        this.levelObj = new Level();
    }

    /**
     * [init description]
     */
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

    /**
     * [loading description]
     * @param  {num} [already 已加载过的数量
     * @param  {num} all]     总待加载的数量
     */
    loading([already, all] = [1, 1]) {

        let number1DOM = document.getElementsByClassName('number1')[0],
            number2DOM = document.getElementsByClassName('number2')[0],
            num = Math.floor(already * 100 / all),
            num1 = Math.floor(num / 10),
            num2 = num % 10;

        if (already / all == 1) {
            this.start();
            console.log('finished');
        } else {
            number1DOM.style.backgroundPosition = -33 * num1 + 'px 0';
            number2DOM.style.backgroundPosition = -33 * num2 + 'px 0';
        }
    }

    /**
     * [start description]
     * 去掉stage中所有div 在stage中渲染开始游戏页面
     */
    start() {

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
        // 给开始游戏按钮绑定跳转到渲染游戏页面的方法
        startBtn.addEventListener('touchend', function() {
            this.play();
        }.bind(this));
        page.appendChild(startIcon);
        page.appendChild(startBtn);
        stage.appendChild(page);
    }

    /**
     * [play description]
     * 渲染游戏页面 并在3秒之后开始生成怪兽
     */
    play() {
        // 对新一局游戏进行初始化
        this.playInit();
        setTimeout(function() {
            // 开始下一难度的游戏
            this.playStart();
        }.bind(this), 3000);
    }

    /**
     * [playStart description]
     * 根据Level中的预设以及算法 自动生成怪兽生成的间隔时间
     */
    playStart() {
        // 关卡难度增加
        this.level += 1;
        // 将生成怪兽的算法作为回调函数传入play方法中
        // 预设时间间隔后调用传入函数
        this.levelObj.play(this.level, this.appendMonster.bind(this));

        // 使怪兽行走的interval
        this.monsterInterval = setInterval(function() {
            this.renderMonster();

            // 若有一个怪兽离屏幕左侧小于300px时
            if (this.monsters.some(function(monster) {
                    return (monster.left < 300 && monster.stateType == 'walk');
                })) {
                // 清除怪物行走的interval
                clearInterval(this.monsterInterval);
                // 进入结束页面
                this.end();
            }
            // 根据游戏难度调整怪兽走动的速度
        }.bind(this), 600 / (this.level + 5));
    }

    /**
     * [playInit description]
     * 初始化游戏页面
     */
    playInit() {
        let stage = document.getElementsByClassName('stage')[0];
        if (stage.getElementsByTagName('div')[0]) {
            stage.removeChild(stage.getElementsByTagName('div')[0]);
        }
        let page = document.createElement('div'),
            grass = document.createElement('div'),
            gap = document.createElement('div'),
            topbar = document.createElement('div'),
            powerSlot = document.createElement('div'),
            powerFill = document.createElement('div'),
            monsIcon = document.createElement('div'),
            score = document.createElement('div'),
            lvl = document.createElement('div'),
            monsStage = document.createElement('div'),
            control = document.createElement('div'),
            control1 = document.createElement('div'),
            control2 = document.createElement('div'),
            control3 = document.createElement('div'),
            control4 = document.createElement('div');
        page.className = "page-2";
        grass.className = "grass";
        gap.className = "gap";
        topbar.className = "topbar";
        powerSlot.className = "power-slot";
        powerFill.className = "power-fill";
        monsIcon.className = "mons-icon";
        score.className = "score";
        lvl.className = "lvl";
        monsStage.className = "mons-stage";
        control.className = "control";
        control1.className = "key control-1";
        control2.className = "key control-2";
        control3.className = "key control-3";
        control4.className = "key control-4";
        let self = this;
        control1.addEventListener('touchend', function() {
            self.aotu.hit(() => {
                self.killMonster(1);
            })
        });
        control2.addEventListener('touchend', function() {
            self.aotu.hit(() => {
                self.killMonster(2);
            })
        });
        control3.addEventListener('touchend', function() {
            self.aotu.hit(() => {
                self.killMonster(3);
            })
        });
        control4.addEventListener('touchend', function() {
            self.aotu.hit(() => {
                self.killMonster(4);
            })
        });
        this.aotu = new Aotuman();
        page.appendChild(this.aotu.render());
        page.appendChild(grass);
        page.appendChild(gap);
        topbar.appendChild(powerSlot);
        topbar.appendChild(powerFill);
        topbar.appendChild(monsIcon);
        topbar.appendChild(score);
        topbar.appendChild(lvl);
        page.appendChild(topbar);
        page.appendChild(monsStage);
        control.appendChild(control1);
        control.appendChild(control2);
        control.appendChild(control3);
        control.appendChild(control4);
        page.appendChild(control);
        stage.appendChild(page);
        // 清空怪兽列表
        this.monsters = [];
        // 清空分数
        this.score = 0;
        this.renderGameScore(this.score);
        // 清空等级
        this.level = 0;
        this.renderLevel(this.level);
        // 清空能量
        this.renderPower(this.aotu.power);
    }

    /**
     * [appendMonster description]
     * 在舞台中新渲染一个怪兽
     */
    appendMonster() {
        let monsStage = document.getElementsByClassName('mons-stage')[0];
        if (monsStage) {
            let monster = new Monster();
            this.monsters.push(monster);
            document.getElementsByClassName('mons-stage')[0].appendChild(monster.render());
            return true;
        }
        return false;
    }

    /**
     * [renderGameScore description]
     * 将num分解为string并在对应位置渲染
     * @param  {number} num 需要显示的游戏得分
     */
    renderGameScore(num) {
        let scoreDOM = document.getElementsByClassName('score')[0];
        // 清空scoreDOM中的全部子DOM
        while (scoreDOM.hasChildNodes()) {
            scoreDOM.removeChild(scoreDOM.lastChild);
        }
        let numArray = this.num2arr(num);
        // 在数组最前面添加一个'x'
        numArray.unshift('x');
        numArray.forEach(function(number) {
            let num = document.createElement('div');
            num.className = 'NumGameScore-' + number;
            scoreDOM.appendChild(num);
        })
    }

    /**
     * [renderPower description]
     * @param  {number} power 需要渲染的power量
     */
    renderPower(power) {
        let powerFillDOM = document.getElementsByClassName('power-fill')[0];
        // 针对不同浏览器添加前缀
        let browsers = ['transform', 'msTransform', 'mozTransform', 'webkitTransform', 'oTransform'];
        browsers.forEach(x => {
            powerFillDOM.style[x] = 'scaleX(' + power / 100 + ')';
        })
    }

    /**
     * [num2arr description]
     * @param  {number} num 需要转换的数
     * @return {Array}      正序的数字数组
     */
    num2arr(num) {
        let numArray = [];
        do {
            numArray.push(num % 10);
            num = Math.floor(num / 10);
        } while (num / 10 != 0);
        return numArray.reverse();
    }

    /**
     * [renderScore description]
     * 渲染结算页的分数
     * @param  {number} num 需要渲染的结束页分数
     */
    renderScore(num) {
        let numArray = [];
        let scoreDOM = document.getElementsByClassName('score')[0];
        // 清空scoreDOM下的所有子DOM
        while (scoreDOM.hasChildNodes()) {
            scoreDOM.removeChild(scoreDOM.lastChild);
        }
        numArray = this.num2arr(num);
        numArray.forEach(function(number) {
            let num = document.createElement('div');
            num.className = 'NumScore NumScore-' + number;
            scoreDOM.appendChild(num);
        })
    }

    /**
     * [renderHighestScore description]
     * 渲染结算页的最高分
     * @param  {number} num 需要渲染的最高分
     */
    renderHighestScore(num) {
        let numArray = [];
        let highestScoreDOM = document.getElementsByClassName('highest-score')[0];
        while (highestScoreDOM.hasChildNodes()) {
            highestScoreDOM.removeChild(highestScoreDOM.lastChild);
        }
        numArray = this.num2arr(num);
        numArray.forEach(function(number) {
            let num = document.createElement('div');
            num.className = 'HighestScore HighestScore-' + number;
            highestScoreDOM.appendChild(num);
        })
    }

    /**
     * 渲染结算页的画面
     */
    end() {

        let stage = document.getElementsByClassName('stage')[0];
        if (stage.getElementsByTagName('div')[0]) {
            stage.removeChild(stage.getElementsByTagName('div')[0]);
        }
        let page = document.createElement('div'),
            grass = document.createElement('div'),
            aotuman = document.createElement('div'),
            scoreBoard = document.createElement('div'),
            score = document.createElement('div'),
            highestScoreDOM = document.createElement('div'),
            restart = document.createElement('div'),
            share = document.createElement('div');
        page.className = 'page-3';
        grass.className = 'grass';
        aotuman.className = 'aotuman';
        scoreBoard.className = 'score-board';
        score.className = 'score';
        highestScoreDOM.className = 'highest-score';
        restart.className = 'restart';
        restart.addEventListener('touchend', function() {
            this.start();
        }.bind(this));
        share.className = 'share';
        page.appendChild(aotuman);
        scoreBoard.appendChild(score);
        scoreBoard.appendChild(highestScoreDOM);
        page.appendChild(scoreBoard);
        page.appendChild(grass);
        page.appendChild(restart);
        page.appendChild(share);
        stage.appendChild(page);
        this.renderScore(this.score);
        let highestScore = Cookie.prototype.getCookie('hs');
        if (highestScore == null || highestScore < this.score) {
            Cookie.prototype.setCookie('hs', this.score, '100', 'y');
            highestScore = this.score;
        }
        this.renderHighestScore(highestScore);
    }

    /**
     * 渲染一颗子弹
     * @param  {Array} position 最终位置
     */
    renderBullet(position) {
        let bullet = new Bullet(position);
        let monsStage = document.getElementsByClassName("mons-stage")[0];
        let bulletDOM = bullet.render();
        monsStage.appendChild(bulletDOM);
        setTimeout(bullet.trans.bind(bullet), 10);
        setTimeout(function() {
            monsStage.removeChild(bulletDOM);
        }, 110);
    }

    /** 渲染怪兽 */
    renderMonster() {
        let monsStage = document.getElementsByClassName("mons-stage")[0];
        // 所有怪兽进入下一个动作
        this.monsters.forEach(function(monster) {
            monster.next();
        });
        // 去掉已经状态变为died了的怪兽
        this.monsters = this.monsters.filter(function(monster) {
            let flag = monster.stateType == 'died';
            if (flag) {
                monsStage.removeChild(monster.render());
            }
            return !(monster.stateType == 'died');
        });
        // 如果当前生存的怪物数量为0且当前关卡的怪物已生成完
        if (this.monsters.length == 0 && this.levelObj.levelClear == true) {
            // 清空怪兽移动的interval
            clearInterval(this.monsterInterval);
            // 显示进入下一关的动画
            this.renderLevel(this.level);
            // 在3秒后进入下一关
            setTimeout(this.playStart.bind(this), 3000);
        }
    }

    /**
     * 渲染提示下一关的动画
     * @param  {number} num 关卡数
     */
    renderLevel(num) {
        let lvlDOM = document.getElementsByClassName('lvl')[0];
        // 清空lvlDOM里所有的子DOM
        while (lvlDOM.hasChildNodes()) {
            lvlDOM.removeChild(lvlDOM.lastChild);
        }
        let lvlArray = this.num2arr(num + 1);
        // 渲染关卡数
        lvlArray.forEach(x => {
            let lvl = document.createElement('div');
            lvl.className = 'lvl-num lvl-num-' + x;
            lvlDOM.appendChild(lvl);
        });
        // show绑定了对应的animation
        lvlDOM.className = 'lvl show';
        // 在2秒后动画结束 去掉show类
        setTimeout(function() {
            lvlDOM.className = 'lvl'
        }, 2000);
    }

    /**
     * 杀死对应类型的怪兽
     * @param  {number} num 怪兽的类型编号
     * @return {[type]}     [description]
     */
    killMonster(num) {
        let flag = false; // 是否有怪兽被击倒
        for (let i = 0; i < this.monsters.length; i++) {
            // 杀死第一个状态是 walk 的对应颜色的怪兽
            if (this.monsters[i].stateType == 'walk' && this.monsters[i].type == num) {
                this.monsters[i].die();
                // 渲染子弹
                this.renderBullet([this.monsters[i].left, this.monsters[i].bottom]);
                flag = true;
                break;
            }
        }
        // 如果有怪兽被击中
        if (flag) {
            this.score += 1;
            this.renderGameScore(this.score);
            this.aotu.powerUp(this.renderPower, this.powerFull.bind(this));
        } else {
            // this.aotu.powerDown(this.renderPower);
        }
    }

    /** 击杀第一个怪兽 */
    killFirstMonster() {
        let flag = false; // 是否有怪兽被击倒
        for (let i = 0; i < this.monsters.length; i++) {
            if (this.monsters[i].stateType == 'walk') {
                this.monsters[i].die();
                this.renderBullet([this.monsters[i].left, this.monsters[i].bottom]);
                flag = true;
                break;
            }
        }
        if (flag) {
            this.score += 1;
            this.renderGameScore(this.score);
        }
    }

    /** 爆能时的动画渲染 */
    powerFull() {
        const SUPER_TIME = 5000; // 超级简单时间持续时长

        let powerFillDOM = document.getElementsByClassName('power-fill')[0],
            powerSlotDOM = document.getElementsByClassName('power-slot')[0],
            page = document.getElementsByClassName('page-2')[0];
        let powerFillClassName = powerFillDOM.className;
        let superStrikeDOM = document.createElement('div'),
            strikeBoardDOM = document.createElement('div'),
            superLightDOM = document.createElement('div');
        superStrikeDOM.className = 'super-strike';
        strikeBoardDOM.className = 'strike-board';
        superLightDOM.className = 'super-light';
        strikeBoardDOM.addEventListener('touchend', function() {
            this.aotu.hit(this.killFirstMonster.bind(this));
        }.bind(this));
        // 点击按钮进入超级煎蛋模式
        superStrikeDOM.addEventListener('touchend', function() {
            // 去掉闪烁
            clearInterval(this.powerInter);
            powerSlotDOM.className = 'power-slot';
            powerFillDOM.className = 'power-fill';
            superStrikeDOM.className = 'super-strike';
            // 奥特曼进入闪烁状态
            this.aotu.superMode();
            this.renderPower(0);
            // 为能量条添加动效类名
            powerFillDOM.className = powerFillClassName + ' decreace';
            page.appendChild(strikeBoardDOM);
            page.appendChild(superLightDOM);
            page.removeChild(superStrikeDOM);
            // 在super time结束后将各个DOM恢复
            setTimeout(function() {
                powerFillDOM.className = 'power-fill';
                page.removeChild(strikeBoardDOM);
                page.removeChild(superLightDOM);
                this.aotu.rmSuperMode(this.renderPower);
            }.bind(this), SUPER_TIME);
        }.bind(this));
        page.appendChild(superStrikeDOM);

        // 控制闪烁的interval
        this.powerInter = setInterval(function() {
            if (powerFillDOM.className == 'power-fill') {
                powerFillDOM.className = 'full power-fill';
            } else {
                powerFillDOM.className = 'power-fill';
            }
            if (powerSlotDOM.className == 'power-slot') {
                powerSlotDOM.className = 'full power-slot';
            } else {
                powerSlotDOM.className = 'power-slot';
            }
            if (superStrikeDOM.className == 'super-strike') {
                superStrikeDOM.className = 'full super-strike';
            } else {
                superStrikeDOM.className = 'super-strike';
            }
        }, 100);
    }
}