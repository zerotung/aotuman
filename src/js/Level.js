export default class Level {
    constructor() {
        this.index = 0;
        this.levelClear = false;
        this.level = [
            // [1023, 2403, 3042, 3592, 4609, 4630, 5292, 5604, 6032, 7230, 8271, 8792, 9230, 11029, 11643, 12032],
            // [1023, 2403, 3042, 3592, 4609, 4630, 5292, 5604, 6032, 7230, 8271, 8792, 9230, 11029, 11643, 12032]
            [3031, 2028, 1623, 112, 1823, 1291, 1103, 823, 231, 1212, 112, 1130, 124, 1503, 623, 412, 123, 1102],
            [2589, 1732, 1230, 279, 1323, 188, 1523, 991, 803, 523, 1720, 981, 643, 536, 186, 805, 267, 708, 36, 1024, 509, 276, 233, 960],
            [2657, 1608, 1404, 118, 188, 1523, 991, 803, 523, 1045, 803, 523, 981, 643, 536, 186, 805, 834, 187, 219, 814, 216, 595, 44, 1092, 94, 322, 17, 826],
            [2603, 1642, 1333, 159, 703, 423, 881, 543, 436, 286, 705, 734, 87, 319, 423, 169, 812, 288, 730, 276, 714, 1162, 417, 37, 361, 619, 313, 363, 119, 887, 40, 34, 153, 583],
            [2691, 1531, 1148, 59, 745, 159, 703, 423, 881, 543, 436, 286, 705, 734, 87, 319, 423, 169, 812, 288, 730, 276, 714, 1162, 417, 37, 361, 619, 313, 363, 225, 119, 279, 729, 234, 736, 76, 991, 235, 112, 249, 380]
        ];
    }

    play(level, callback) {
        if (this.level.length < level) {
            this.appendLevel(level);
        }
        this.index = 0;
        this.levelClear = false;
        let total = this.level[level - 1].reduce((x, y) => x + y);
        let magn = total / (4500 + 3500 * (level + 2));
        this.level[level - 1] = this.level[level - 1].map(x => Math.floor(x / magn));
        console.log(this.level[level - 1].reduce((x, y) => x + y));
        this.wrapTimeout(level, callback);
    }

    wrapTimeout(level, callback) {

        if (this.index < this.level[level - 1].length) {
            if (callback()) {
                let waitTime = this.level[level - 1][this.index++] + Math.floor(Math.random() * 100) - 50;
                setTimeout(this.wrapTimeout.bind(this, level, callback), waitTime);
            }
        } else {
            this.levelClear = true;
        }
    }

    appendLevel(level) {
        let levelNow = this.level[level - 2],
            levelBefore = this.level[level - 5],
            levelNew = [];
        // length = levelNow.length - levelBefore;
        for (var i = 0; i < levelNow.length; i++) {
            levelNew.push(levelNow[i]);
            if (levelBefore[i]) {
                levelNew.push(Math.abs(levelNow[i] - levelBefore[i]))
            }
        }
        this.level.push(levelNew);
    }

}