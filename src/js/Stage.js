import Monster from './Monster.js';
import Aotuman from './Aotuman.js';
import Bullet from './Bullet.js';
import Level from './Level.js';
import Cookie from './Cookie';
import Dialog from './dialog';
let dialog = new Dialog();

export default class Stage {

    constructor() {
        this.init();
        this.powerInter = null;
        this.monsters = [];
        this.aotu = new Aotuman();
        this.score = 0;
        this.level = 0;
        this.startTime = 0;
        this.levelObj = new Level();
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
        page.className = 'page-0 page';
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
     * 加载时显示加载进度的回调函数
     * @param  {Number} already 已加载的数量
     * @param  {Number} all     总共需要加载的数量
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

    /** 去掉stage中所有div 在stage中渲染开始游戏页面 */
    start() {

        if (document.body.clientWidth < document.body.clientHeight) {
            dialog.confirm({
                title: '提示',
                content: '请在横屏模式下进行游戏',
                confirm: {
                    title: '确定'
                }
            });
        }

        let stage = document.getElementsByClassName('stage')[0];
        if (stage.getElementsByTagName('div')[0]) {
            stage.removeChild(stage.getElementsByTagName('div')[0]);
        }
        let page = document.createElement('div'),
            startIcon = document.createElement('div'),
            startBtn = document.createElement('div');
        page.className = 'page-1 page';
        startIcon.className = 'start-icon moveFromTop';
        startBtn.className = 'start-btn moveFromBottom';
        // 给开始游戏按钮绑定跳转到渲染游戏页面的方法
        startBtn.addEventListener('touchend', function() {
            this.play();
        }.bind(this));
        page.appendChild(startIcon);
        // 在icon动画结束之后startbtn进入
        setTimeout(page.appendChild.bind(page, startBtn), 700);
        stage.appendChild(page);
    }

    /** 渲染游戏页面 并在3秒之后开始生成怪兽 */
    play() {
        // 对新一局游戏进行初始化
        this.playInit();
        setTimeout(function() {
            // 开始下一难度的游戏
            this.playStart();
        }.bind(this), 3000);
    }

    /** 根据Level中的预设以及算法 自动生成怪兽生成的间隔时间 */
    playStart() {
        // 关卡难度增加
        this.level += 1;
        // 将生成怪兽的算法作为回调函数传入play方法中
        // 预设时间间隔后调用传入函数
        this.levelObj.play(this.level, this.appendMonster.bind(this));
        this.setMonsterWalkInterval();
    }

    setMonsterWalkInterval() {
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
        }.bind(this), 150);
    }

    /** 初始化游戏页面 */
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
            control = document.createElement('div'),
            control1 = document.createElement('div'),
            control2 = document.createElement('div'),
            control3 = document.createElement('div'),
            control4 = document.createElement('div');
        page.className = "page-2 page";
        grass.className = "grass";
        gap.className = "gap";
        topbar.className = "topbar";
        powerSlot.className = "power-slot";
        powerFill.className = "power-fill";
        monsIcon.className = "mons-icon";
        score.className = "score";
        lvl.className = "lvl";
        control.className = "control";
        control1.className = "key control-1";
        control2.className = "key control-2";
        control3.className = "key control-3";
        control4.className = "key control-4";
        let self = this;
        control1.addEventListener('touchend', function() {
            self.aotu.hit(self.killMonster.bind(self, 1))
        });
        control2.addEventListener('touchend', function() {
            self.aotu.hit(self.killMonster.bind(self, 2))
        });
        control3.addEventListener('touchend', function() {
            self.aotu.hit(self.killMonster.bind(self, 3))
        });
        control4.addEventListener('touchend', function() {
            self.aotu.hit(self.killMonster.bind(self, 4))
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
        control.appendChild(control1);
        control.appendChild(control2);
        control.appendChild(control3);
        control.appendChild(control4);
        page.appendChild(control);
        stage.appendChild(page);
        // 清空怪兽列表
        // this.monsters = [];
        this.monsters.length = 0;
        // 清空分数
        this.score = 0;
        this.renderGameScore(this.score);
        // 清空等级
        this.level = 0;
        this.renderLevel(this.level);
        // 清空能量
        this.renderPower(this.aotu.power);
    }

    /** 在舞台中新渲染一个怪兽 */
    appendMonster() {
        let page = document.getElementsByClassName('page-2')[0];
        if (page) {
            let monster = new Monster(1.5 * (10 + this.level));
            this.monsters.push(monster);
            document.getElementsByClassName('page-2')[0].appendChild(monster.render());
            return true;
        }
        return false;
    }

    /**
     * 在游戏页显示当前获得的分数
     * @param  {number} num 需要显示的游戏得分
     */
    renderGameScore(num) {
        let scoreDOM = document.getElementsByClassName('score')[0];
        // 清空scoreDOM中的全部子DOM
        while (scoreDOM.hasChildNodes()) {
            scoreDOM.removeChild(scoreDOM.lastChild);
        }
        // 将 num 转换为 String
        let numArray = this.num2arr(num);
        // 在数组最前面添加一个'x'
        numArray.unshift('x');
        // 一次添加进对应的DOM
        numArray.forEach(function(number) {
            let num = document.createElement('div');
            num.className = 'NumGameScore-' + number;
            scoreDOM.appendChild(num);
        })
    }

    /**
     * 渲染修改能量条的长度
     * @param  {Number} power 需要渲染的能量
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
     * 将传入的多位数字转为字符数组返回
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
     * 在结算页显示最终获得的分数
     * @param  {number} num 需要渲染的结算页分数
     */
    renderScore(num) {
        let numArray = [];
        let scoreDOM = document.getElementsByClassName('score')[0];
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
     * 在结算页显示获得过的最高分
     * @param  {Number} num 需要渲染的最高分
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

    /** 渲染结算页的画面 */
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
        page.className = 'page-3 page';
        grass.className = 'grass moveFromBottom';
        aotuman.className = 'aotuman';
        scoreBoard.className = 'score-board';
        score.className = 'score';
        highestScoreDOM.className = 'highest-score';
        restart.className = 'restart moveFromBottom';
        share.className = 'share moveFromBottom';
        restart.addEventListener('touchend', function() {
            this.start();
        }.bind(this));
        share.addEventListener('touchend', function() {
            this.sharePage();
        }.bind(this));
        page.appendChild(aotuman);
        scoreBoard.appendChild(score);
        scoreBoard.appendChild(highestScoreDOM);
        page.appendChild(scoreBoard);
        page.appendChild(grass);
        setTimeout(function() {
            page.appendChild(restart);
            page.appendChild(share);
        }, 600);
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
        let page = document.getElementsByClassName("page-2")[0];
        let bulletDOM = bullet.render();
        page.appendChild(bulletDOM);
        setTimeout(bullet.trans.bind(bullet), 10);
        setTimeout(function() {
            page.removeChild(bulletDOM);
        }, 110);
    }

    /** 检查当前关卡是否结束 */
    renderMonster() {
        let page = document.getElementsByClassName("page-2")[0];
        this.monsters = this.monsters.filter(function(monster) {
            monster.next();
            let flag = monster.stateType == 'died';
            if (flag) {
                page.removeChild(monster.render());
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
     * @param  {Number} num 关卡数
     */
    renderLevel(num) {
        // 清空lvlDOM里所有的子DOM
        let lvlDOM = document.getElementsByClassName('lvl')[0];
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
     * @param  {Number} num 怪兽的类型编号
     */
    killMonster(num) {
        let flag = false; // 是否有怪兽被击倒
        for (let i = 0; i < this.monsters.length; i++) {
            // 杀死第一个状态是 walk 的对应颜色的怪兽
            if (this.monsters[i].stateType == 'walk' && this.monsters[i].type == num) {
                this.monsters[i].die();
                // 渲染子弹
                console.log(this.monsters[i].position);
                this.renderBullet(this.monsters[i].position);
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
                this.renderBullet(this.monsters[i].position);
                flag = true;
                break;
            }
        }
        if (flag) {
            this.score += 1;
            this.renderGameScore(this.score);
        }
        return flag;
    }

    /** 爆能时的动画渲染 */
    powerFull() {

        const SUPER_TIME = 5000; // 超级煎蛋时间持续时长
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
            // 奥特曼进入超级状态
            this.aotu.superMode();
            page.appendChild(strikeBoardDOM);
            page.appendChild(superLightDOM);
            page.removeChild(superStrikeDOM);
            // 在super time结束后将各个DOM恢复
            let self = this;

            function killAll() {
                if (self.killFirstMonster()) {
                    self.aotu.superStrike();
                    setTimeout(killAll, 100);
                } else {
                    powerFillDOM.className = 'power-fill';
                    page.removeChild(strikeBoardDOM);
                    page.removeChild(superLightDOM);
                    self.aotu.rmSuperMode(self.renderPower);
                    self.setMonsterWalkInterval();
                }
            }
            clearInterval(this.monsterInterval);
            this.renderPower(0);
            // 为能量条添加动效类名
            powerFillDOM.className = powerFillClassName + ' decreace';
            setTimeout(function() {
                killAll();
            }.bind(this), 1500);
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

    sharePage() {
        let stage = document.getElementsByClassName('stage')[0];
        if (stage.getElementsByTagName('div')[0]) {
            stage.removeChild(stage.getElementsByTagName('div')[0]);
        }
        let page = document.createElement('div'),
            board = document.createElement('div'),
            aotuman = document.createElement('div'),
            grass = document.createElement('div'),
            rank1 = document.createElement('div'),
            rank2 = document.createElement('div'),
            rank3 = document.createElement('div'),
            rank4 = document.createElement('div'),
            startBtn = document.createElement('div');
        page.className = 'page-4 page';
        board.className = 'board';
        aotuman.className = 'aotuman';
        grass.className = 'grass';
        rank1.className = 'rank1 rank';
        rank2.className = 'rank2 rank';
        rank3.className = 'rank3 rank';
        rank4.className = 'rank4 rank';
        startBtn.className = 'start-btn moveFromBottom';
        startBtn.addEventListener('touchend', function() {
            this.play();
        }.bind(this));
        stage.appendChild(page);
        page.appendChild(board);
        page.appendChild(aotuman);
        page.appendChild(grass);
        board.appendChild(rank1);
        board.appendChild(rank2);
        board.appendChild(rank3);
        board.appendChild(rank4);
        setTimeout(page.appendChild.bind(page, startBtn), 1000);
        let dataJson = [{
            "headImg": "test.jpg",
            "name": "Zero",
            "score": "1231"
        }, {
            "headImg": "test.jpg",
            "name": "忘了爱",
            "score": "422"
        }, {
            "headImg": "test.jpg",
            "name": "小贞贞",
            "score": "213"
        }, {
            "headImg": "test.jpg",
            "name": "Chen",
            "score": "113"
        }];
        this.appendRank([rank1, rank2, rank3, rank4], dataJson);
    }

    appendRank(stage, json) {
        for (let i = 0; i < 4; i++) {
            let rankImg = document.createElement('div'),
                headImg = document.createElement('div'),
                name = document.createElement('div'),
                score = document.createElement('div');
            rankImg.className = 'rank-img rank-item';
            headImg.className = 'head-img rank-item';
            name.className = 'name rank-item';
            score.className = 'score rank-item';
            stage[i].appendChild(rankImg);
            stage[i].appendChild(headImg);
            stage[i].appendChild(name);
            stage[i].appendChild(score);
            name.innerHTML = json[i].name;
            let scoreArr = this.num2arr(json[i].score);
            for (let i = 0; i < scoreArr.length; i++) {
                let num = document.createElement('div');
                num.className = 'rank-score rank-score' + scoreArr[i];
                score.appendChild(num);
            }
        }
    }
}