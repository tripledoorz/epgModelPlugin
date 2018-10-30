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
