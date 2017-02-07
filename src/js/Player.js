class Player {

    constructor() {
        this.init(false);
        this.state = 'loading';
        this.interval = null;
    }

    init() {
        let stage = document.getElementsByClassName('stage')[0];
        let page = document.createElement('div'),
            aotuman = document.createElement('div'),
            grass1 = document.createElement('div'),
            grass2 = document.createElement('div'),
            loading = document.createElement('div');
        page.className = 'page-0';
        aotuman.className = 'aotuman';
        grass1.className = 'grass1';
        grass2.className = 'grass2';
        loading.className = 'loading';
        page.appendChild(aotuman);
        page.appendChild(grass1);
        page.appendChild(grass2);
        page.appendChild(loading);
        stage.appendChild(page);
    }

    loading(isFinished) {
        // <div class="page-0" style="display: none;">
        //     <div class="aotuman"></div>
        //     <div class="grass1"></div>
        //     <div class="grass2"></div>
        //     <div class="loading"></div>
        // </div>
        if (isFinished) {
            this.start();
            console.log('finished');
        } else {
            console.log('Loading');
        }

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
            monsters.push(monster);
        }, 2000);
        let monsterInterval = setInterval(this.renderMonster, 100);
        // var monster = new Monster();
        // var monsterInterval = setInterval(function() {
        //     document.getElementsByClassName("mons-stage")[0].appendChild(monster.render());
        // }, 100);
    }

    playInit() {
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
        control1.className = "control-1";
        control2.className = "control-2";
        control3.className = "control-3";
        control4.className = "control-4";
        aotuman.appendChild(aotu.render());
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

    }

    renderMonster() {
        let monsStage = document.getElementsByClassName("mons-stage")[0];
        if (monsStage.getElementsByTagName('div')[0]) {
            monsStage.removeChild(monsStage.getElementsByTagName('div')[0]);
        }
        monsters.map(function(monster) {
            monsStage.appendChild(monster.render());
        })
    }
}