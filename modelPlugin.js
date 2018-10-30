;(function (window, document) {
    var _global;
    //计算函数
    function _bs_filter(e) {
        var _c = {};
        for (i in e) {
            var _b = e[i];
            _c[_b.id] = _b;
        }
        return _c
    }
    function getTampTime(start,end){
        var startDate = parseInt(new Date(start).getTime()),endDate = parseInt(new Date(end).getTime());
        return ((endDate-startDate)/(1000*60*60*24) <= 2)
    }
    function argsAsArray(fn,arr){
        return fn.apply(null, arr);
    }
   
    // 构造函数
    function Options() {
        //初始化定义焦点
        this._buttons = [{
            id: 'md_f1',
            upButtonId: '',
            downButtonId: '',
            leftButtonId: 'md_f3',
            rightButtonId: 'md_f2',
            blurFun: 'F_E_BLUR0',
            focusFun: 'F_E_PF0',
            enterFun: '',
            focusImage: 'index-mode-f.png',
            blurImage: 'index-mode-b.png'
        },{
            id: 'md_f2',
            upButtonId: '',
            downButtonId: '',
            leftButtonId: 'md_f1',
            rightButtonId: 'md_f3',
            blurFun: 'F_E_BLUR0',
            focusFun: 'F_E_PF0',
            enterFun: '',
            focusImage: 'index-mode-f.png',
            blurImage: 'index-mode-b.png'
        },{
            id: 'md_f3',
            upButtonId: '',
            downButtonId: '',
            leftButtonId: 'md_f2',
            rightButtonId: 'md_f1',
            blurFun: 'F_E_BLUR0',
            focusFun: 'F_E_PF0',
            enterFun: '',
            focusImage: 'index-mode-f.png',
            blurImage: 'index-mode-b.png'
        }];
        this._BS = _bs_filter(this._buttons);
    }
    Options.prototype = {
        iskey:false,//切换键盘
        ordered: "", //是否是会员
        vip_element: false, //挽留页面是否是显示
        focus_id: 'md_f1',//默认焦点
        coupon_element:false,//会员即将到期选购弹窗页面
        initHandle: function () {
            var that = this;
            that.vip_element = _SELECT("vipCard").style.display == "block" ? true : false
            if (!that.vip_element) {
                if(!that.ordered){
                    var res = HAS_ORDER(userId, '185385', 'film', '捉妖记2', false);
                    that.ordered = res.ordered
                }
                var code = that.get_info_code()
                // if (that.ordered == 0 && code == 1) {
                    _SELECT("vipCard").style.display = "block";
                    that.iskey = true;
                    return false;
                // }
            } else {
                _SELECT("vipCard").style.display = "none";
            } 
        },
        modeHandle:function(){
            _SELECT("vipCard").style.display = "none";
            _SELECT("couponCard").style.display = "none";
            this.iskey = false;
            return false;
        },
        initOrder:function(){
            var res = HAS_ORDER(userId, '185385', 'film', '捉妖记2', false),
                startT = res.beginDate,
                endT = res.endDate,
                isTwoDay=getTampTime(startT,endT)
            this.ordered = res.ordered;
            // if (res.ordered.ordered == 1 && isTwoDay) {
                _SELECT("couponCard").style.display = "block";
                this.iskey = true;
                return false;
            // }
        },
        get_info_code: function () { //获取是否已经领取优惠券
            var _INFO
            $.get(webset.api + 'ad/noviceGiftBagFilm.json?iptvAccount=' + userId,
                function (e) {
                    _INFO = eval("(" + e + ")")
                }, false);
            return _INFO.code
        },
        // 生成订单,跳转订购页面
        create_new_order: function () {
            $.get(webset.authentication + 'order/createorder4H5New.json?orderType=' + arguments[0],
                 function (res) {
                    var res = eval("(" + res + ")");
                    if (res && res.response.responseHeader && res.response.responseHeader.code == '200') {
                        var CO_DATA = res.response.responseBody,pervUrl = window.location.href;
                        window.location.href = 'http://61.191.45.118:7002/itv-api/initial_order?returnUrl=' +
            encodeURIComponent(pervUrl) + '&providerId=' + CO_DATA.providerId +
            '&orderInfo=' + CO_DATA.orderInfo + '&notifyUrl=' + CO_DATA.notifyUrl;
                    }
                }, false);
        },
        post_test: function () {
            var _INFO
            var data = {
                "offset": "0123456A89ABCDEF",
                "catagoryId": "推荐",
                "channelId": "",
                "clientId": "8580002400218264",
                "contentId": "12345",
                "deviceType": "E900",
                "folderContentId": "",
                "format": "",
                "infoId": "0",
                "infoGroupId": "103",
                "providerId": "ahdx",
                "regionCode": "",
                "systemId": "",
                "sessionId": "1540361395588",
                "reqNum": 1
            }
            $.post('http://epgpic.itvengine.com.lv1.vcache.cn/GetInfo', data,
                function (e) {
                    _INFO = eval("(" + e + ")")
                }, false);
        },
        _login: function () { //跳转领券页面；
            window.location.href = "http://117.71.47.120:9090/epg/login.jsp?backURL=" + serverBaseStatic + "itv-epg/list.jsp"
        },
        _H_F: function (_id) {
            var that = this;
            if (that._BS[that.focus_id] != undefined && that._BS[_id] != undefined) {
                _SELECT(that.focus_id).src = 'http://epgpic.kanketv.com.ahct.lv1.vcache.cn/itv-epg/images/' + that._BS[that.focus_id]['blurImage'];
                _SELECT(_id).src = 'http://epgpic.kanketv.com.ahct.lv1.vcache.cn/itv-epg/images/' + that._BS[_id]['focusImage'];                
                that.focus_id = _id;
            }
        },
        F_KEY_G_1:function () {//进入
            var that = this
            that.coupon_element = _SELECT("couponCard").style.display == "block" ? true : false
            if(that.vip_element){
                that._login();
                return false
            }else if(that.coupon_element){
                var ID = [parseInt(that.focus_id.replace(/[^0-9]/ig,""))]
                argsAsArray(that.create_new_order,ID)
            }
        },
        //向左触发事件,并改变移入位置的样式，that._BS[that.focus_id]['leftButtonId']为新选中元素的id，下边三个方法同理
        F_KEY_G_4: function () {
            var that = this;
            if (that._BS[that.focus_id] != undefined && that._BS[that.focus_id]['leftButtonId'] != '') {
                that._H_F(that._BS[that.focus_id]['leftButtonId']);
            }
            return;
        },
        //向上触发事件
        F_KEY_G_5: function () {
            var that = this;
            if (that._BS[that.focus_id] != undefined && that._BS[that.focus_id]['upButtonId'] != '') {
                that._H_F(that._BS[that.focus_id]['upButtonId']);
            }
            return;
        },
        //向右触发事件
        F_KEY_G_6: function () {
            var that = this;
            if (that._BS[that.focus_id] != undefined && that._BS[that.focus_id]['rightButtonId'] != '') {
                that._H_F(that._BS[that.focus_id]['rightButtonId'])
            };
            return;
        },
        //向下触发事件
        F_KEY_G_7: function () {
            var that = this;
            if (that._BS[that.focus_id] != undefined && that._BS[that.focus_id]['downButtonId'] != '') {
                that._H_F(that._BS[that.focus_id]['downButtonId'])
            };
            return;
        },
        //blurFun
        DOBUTTONBLURFUN: function (_id) { //dobuttonblurfun
            var that = this;
            if (that._BS[_id] != undefined && that._BS[_id]['blurFun'] != undefined && that._BS[_id]['blurFun'] != '') {
                var _b = that._BS[_id];
                var fun = _b['blurFun'];
                eval("(" + fun + ")")();
            }
        },
        //focusFun
        DOBUTTONFOCUSFUN: function (_id) { //dobuttonfocusfun
            var that = this;
            if (that._BS[_id] != undefined && that._BS[_id]['focusFun'] != undefined && that._BS[_id]['focusFun'] != '') {
                var _b = that._BS[_id];
                var fun = _b['focusFun'];
                eval("(that." + fun + ")")();
            }
        },
        //enterFun
        DOBUTTONENTERFUN: function (_id) { //dobuttonenterfun
            var that = this;
            if (that._BS[_id] != undefined && that._BS[_id]['enterFun'] != undefined && that._BS[_id]['enterFun'] != '') {
                var _b = that._BS[_id];
                var fun = _b['enterFun'];
                eval("(" + fun + ")")();
            }
        },
    }

    //插件的名称------暴露接口
    _global = (function () {
        return this || (0, eval)('this');
    }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = ModelPlugin;
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return ModelPlugin;
        });
    } else {
        !('ModelPlugin' in _global) && (_global.ModelPlugin = Options);
    }
})(window, document);

