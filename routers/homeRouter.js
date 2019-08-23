const express = require('express');
const router = new express.Router();

router.get('/home', (req, res)=>{
    let homeList= require('../data/home.json');
    res.json({
        code:0,
        message: 'ok',
        data: homeList
    })
})

module.exports = router;