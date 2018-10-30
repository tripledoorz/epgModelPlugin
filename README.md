# epgModelPlugin
TV端页面，弹出订购广告选择购买订购包，插件
# 主要功能点及环境
1.运行环境TV端安卓智能盒子

2.监听key键,切出弹窗,左右、ok键选择订购包，跳转订购页面完成支付
# 引用
```javascript
var ModelPlugin = new ModelPlugin();
ModelPlugin.initHandle() //监听返回键值，弹出领券页面
ModelPlugin.iskey//切换键盘
ModelPlugin.initOrder() // 显示推荐会员弹窗
ModelPlugin.modeHandle()//关闭弹窗
```
备注：目前针对线上项目,考虑到原有项目的完整性,目前只单独抽离了业务层,后期继续优化

# 几种插件封装方式
## 根据AMD规范写插件
```javascript
;(function () {
    'use strict';
    function pluginName(layer, options) {
        var something;
        options = options || {};
        this.layer = layer;
        this.param1 = options.param1||'';
    }
    var privateField = '';
    pluginName.prototype.fun1 = function(){

    }
    /**
     * Factory method for creating a object
     */
    pluginName.attach = function(layer, options) {
        return new pluginName(layer, options);
    };
    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

        // AMD. Register as an anonymous module.
        define(function() {
            return pluginName;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = pluginName.attach;
        module.exports.pluginName = pluginName;
    } else {
        window.pluginName = pluginName;
    }
}());
```
## 根据CMD规范写插件
```
;(function(factory) {
    // CMD/SeaJS
    if(typeof define === "function") {
        define(factory);
    }
    // No module loader
    else {
        factory('', window['ue'] = window['ue'] || {}, '');
    }
}(function(require, exports, module) {
    var pluginName = function(options){
        if(this.constructor !== pluginName){
            return new pluginName(options);
        }
        this.init(options);
        return this;
    };

    pluginName.prototype = {
        constructor : pluginName,
        init : function(options){

        }
    }

    if({}.toString.call(module) == '[object Object]' ){
        module.exports = pluginName;
    }else{
        exports.pluginName = pluginName;
    }
}));
```
## jQuery插件模板
```
;(function ($, window, document, undefined) {
    $.fn.plugin = function(parameter) {
        parameter = parameter || {};
        var defaults = {

        };
        var options = $.extend({}, defaults, parameter);
        return this.each(function () {

        });
    };
})(jQuery, window, document);
```
## UMD中使用jQuery 插件
```
// Uses CommonJS, AMD or browser globals to create a jQuery plugin.
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.fn.jqueryPlugin = function () { return true; };
}));
```
