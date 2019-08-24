const express = require('express');
const User = require('../model/Mine');

const router = new express.Router();

const codeMap = {};

// 发送验证码
router.post('/login/send_phone_code', (req, res)=>{
    // 获取号码
    let {phone} = req.body;
    //验证号码
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))){
        res.json({
            code: -1,
            message: '电话号码格式错误！'
        });
        return;
    }
    // 发送第三方平台生成随机数，第三方平台发验证码短信
    let num = parseInt(Math.random().toFixed(6)*1000000) + '';
    while (num.length < 6) {
        num = '0'+num;
    };
    console.log('验证码：', num);
    // 保存验证码
    codeMap[phone] = num;
    // 响应发送成功
    res.json({
        code: 0,
        message: '发送成功'
    });
})

// 根据电话号码和验证码的登录
router.post('/login/login_by_code', async (req, res)=>{
    try {
    
    // 取电话号码和验证码
    let {phone, code} = req.body;
    // 验证电话号码格式
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))){
        res.json({
            code: -1,
            message: '电话号码格式错误！'
        });
        return;
    }
    // 验证验证码格式
    if(!(/^\d{6}$/.test(code))){
        res.json({
            code: -2,
            message: '验证码格式错误！'
        });
        return;
    }
    // 判断验证码是否正确
    if(codeMap[phone] != code){
        res.json({
            code: -3,
            message: '验证码错误！'
        });
        return;
    }

    // 可以登录
    // 查数据库有没有这个电话号码的账号
    let result = await User.findOne({phone});
    if(result){
        // 如果有，直接响应客户端登录成功
        // 保存用户数据到session,保存用户的登录状态
        req.session.userInfo = result;
    }else{
        // 如果没有，帮用户注册，再登录
        let result = await new User({phone}).save();
        // 保存用户数据到session,保存用户的登录状态
        req.session.userInfo = result;
    }
    // 响应客户端登录成功
    res.json({
        code: 0,
        message: '登录成功'
    }) 
    
        
    } catch (error) {
        res.json({
            code: -4,
            message: '服务器异常，请重试'
        }) 
    }

})

// 检查用户是否过期
router.get('/check_login', (req, res)=>{
    if(req.session.userInfo){
        //登录没有过期
        res.json({
            code:0,
            message: '用户没有过期'
        })
    }else{
        //过期了
        res.json({
            code: -1,
            message: '用户过期了，请重新登录'
        })
    }
})

// 退出登录
router.get('/logout', (req, res)=>{
    req.session.userInfo = null;
    res.json({
        code: 0,
        message: 'ok'
    });
})



module.exports = router;