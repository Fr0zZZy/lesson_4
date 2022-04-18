const fs = require('fs');
const fileName = ('./files/gameResult.txt')

exports.finishGame = function finishGame(req, res) {
    const body = req.body;
    const gameResultFile = fs.readFileSync(fileName).toString();
    let gameNumber;
    if(gameResultFile.length - 1 < 0) {
        gameNumber = 1;
    } else{
        gameNumber = gameResultFile.split('\n').length
    }
    fs.appendFile(fileName, JSON.stringify( {
        id: gameNumber,
        winner: body.winner,
        loser: body.loser,
    }) + '\n',
    (err) => {
        if(err) throw err;
    })
}

exports.gameResult = function(req, res){
    const resultFileArray = fs.readFileSync(fileName).toString().split('\n').filter(el => el != '');
    res.send(resultFileArray.map(row => {
        if(row !== "") {return JSON.parse(row);}
    }))
}

