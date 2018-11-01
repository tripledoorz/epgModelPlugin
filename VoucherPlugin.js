function S_FAll(id) {
    if (id == '' || id == null) {
        return false;
    } else {
        return document.querySelectorAll(id)
    }
}

function S_F(e) {
    if (id == '' || id == null) {
        return false;
    } else {
        return document.querySelector(id)
    }
}

function transformers(element1, element2) {
    var e = document.createEvent("MouseEvents");
    e.initEvent("click", true, true);
    if (S_FAll(element1)) {
        var len = S_FAll(element1).length
        setInterval(function () { //循环监听5个抢券
            for (var i = len - 1; i >= 1; i--) {
                (function (i) {
                    if (S_FAll(element1)[i]) {
                        S_FAll(element1)[i].dispatchEvent(e);
                    }
                })(i);
            }
        }, 100);
    }
    setInterval(function () { //定时监听确认弹窗
        if (S_F(element2)) {
            S_F(element2).dispatchEvent(e);
        }
    }, 100);

}
transformers('.get-btn', '.btn2')