'use strict';
var SampleContract = function() {};
SampleContract.prototype = {
    init: function() {},
    //获取前端传入的数字，并与内部随机生成的数字进行比较
    clipIn: function(number) {
        number = parseInt(number);
        //获取使用者的地址
        var from = Blockchain.transaction.from;
        //获取使用者支付的nas数值
        var value = Blockchain.transaction.value;
        //随机生成1-10的数字
        var resultNumber = parseInt(Math.floor(Math.random() * 10 + 1));
        //判断使用者是否支付1个NAS
        if (value !== 1000000000000000000) { throw new Error("必须支付1个NAS");}
        if (number == resultNumber) {
            //给使用者奖励10个NAS
            var result = Blockchain.transfer(from, 10);
            if(result == true) {
                console.log("你猜对了，获得10个NAS奖励");
                return true;
            }else{
                 throw new Error("奖励领取失败，请联系管理员");
            }
        } else {
            console.log("你猜错了，正确答案是" + resultNumber);
            return resultNumber;
        }
    },
    withDraw: function(amount) {
        amount = parseInt(amount);
        var user = Blockchain.transaction.from;
        //判断是否是指定的账户地址
        if (user == "n1LihoAbPc6xvxZq1pHupw3ASnWMaJgm6cG") {
            var withDrawResult = Blockchain.transfer(user, amount);
            if (withDrawResult == true) {
                console.log("提款成功");
                return true;
            } else {
                console.log("提款失败");
                throw new Error("提款失败");
            }
        } else {
            console.log("你没有权限");
            throw new Error("你没有权限");
        }
    }
};

module.exports = SampleContract;