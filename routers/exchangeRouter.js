const express = require('express');
const router = new express.Router();

router.get('/exchange', (req, res)=>{
    let exchangeList= require('../data/exchange.json');
    res.json({
        code:0,
        message: 'ok',
        data: exchangeList
    })
})

module.exports = router;