export default class Cookie {

    setCookie(name, value, time = 30, scale = 'd') {

        let scales = ['ms', 's', 'min', 'd', 'mon', 'y'],
            length = [1000, 60, 60, 24, 12];

        for (let i = 0; i < scales.length; i++) {
            if (scales[i] != scale) {
                time *= length[i];
            } else {
                break;
            }
        }

        var exp = new Date();
        exp.setTime(exp.getTime() + time);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }

    getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}