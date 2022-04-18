const path = require('path')
const express = require('express');
const router = express.Router();
const gameController = require('../controller/gameContoller');

router.route('/main')
    .get((req, res) => {
        router.use(express.static('public'))
        res.sendFile('public/index.html', {root: path.dirname(__dirname)});
    })

router.route('/results')
    .get((req, res) => {
        gameController.gameResult(req, res)
    })
    .post((req, res) => {
        gameController.finishGame(req, res);
    }) 
module.exports = router;