function S_FAll(e) {
    return document.querySelectorAll(e)
}

function S_F(e) {
    return document.querySelector(e)
}

function transformers(res) {
    var e = document.createEvent("MouseEvents");
    e.initEvent("click", true, true);
    if (S_FAll(res)) {
        var len = S_FAll(res).length
        setInterval(function () {
            for (var i = len - 1; i >= 1; i--) {
                (function (i) {
                    console.info(i, S_FAll(res)[i])
                    if (S_FAll(res)[i]) {
                        S_FAll(res)[i].dispatchEvent(e);
                    }
                })(i);
            }
        }, 100);
    }
    setInterval(function () {
        if (S_F('.btn2')) {
            S_F('.btn2').dispatchEvent(e);
        }
    }, 100);

}
transformers('.get-btn')