const express = require('express');
const router = new express.Router();
const urldeal = require("url");

router.get('/home', (req, res) => {
    let homeList = require('../data/home.json');
    res.json({
        code: 0,
        message: 'ok',
        data: homeList
    })
})

router.get('/category', (req, res) => {
    let params = urldeal.parse(req.url, true).query;

    let typeId = params.typeId;
    let id = params.id;
    let data = {};

    if (typeId == 1) {
        data = require('../data/notebook.json');
        if (id == 0) {
            //TODO 细分数据 暂时不做
        }
    } else if (typeId == 2) {
        data = require('../data/pad.json');
    } else if (typeId == 3) {

        data = require('../data/phone.json');
    } else if (typeId == 4 || typeId == 7) {
        data = require('../data/digital.json');
    } else if (typeId == 5) {
        data = require('../data/watch.json');
    }else if (typeId == 6) {
        data = require('../data/computer.json');
    }

    res.json({
        code: 0,
        message: 'ok',
        data: data
    })
})

module.exports = router;