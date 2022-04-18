const result = new XMLHttpRequest();
let win = [];
let cells = document.getElementsByClassName("game-field_cell");
const game_field = document.querySelector(".game-field");
let count = 0;
let player = document.querySelector(".player");
let first_player, senond_player;
let last_motion;
let check_count_x = 0;
let check_count_y = 0;
the_end = false;
n = 3;
window.onload = function () {
    for (let i = 0; i < n * n; i++) {
        document.querySelector(".game-field").innerHTML += '<div class="game-field_cell" id="null""></div>';
    }
    win.length = 2 * n + 2;
    for (let i = 0; i < win.length; i++) {
        win[i] = [];
        win[i].length = n;
    }

    for (let i = 0; i < n; i++) { // Цикл на генерацию выигрышных клеток
        for (let j = 0; j < win[i].length; j++) {
            win[i][j] = j + n * i; // Горизонтальная линия
            win[i + n][j] = i + n * j; // Вертикальная линия
            win[n + n][i] = i * n + i; // Первая диагональ
            win[win.length - 1][i] = (n - 1) * (i + 1); // Вторая диагональ
        }
    }
}

class TicTacToe {
    players = [];

    constructor(playerOneInfo, playerTwoInfo) {
        this.players = [
            { info: playerOneInfo, symbol: "X" },
            { info: playerTwoInfo, symbol: "O" }
        ];
    }

    reset() {
        count = 0;
        for (let i = 0; i < cells.length; i++) {
            cells[i].id = "null";
            cells[i].innerHTML = "";
            cells[i].style.backgroundColor = "white";
        }
        player.innerHTML = "Ход игрока: " + first_player;
        the_end = false;
    }

    correct_values(n) {
        win.length = 2 * n + 2;
        for (let i = 0; i < win.length; i++) {
            win[i] = [];
            win[i].length = n;
        }
    
        for (let i = 0; i < n; i++) { // Цикл на генерацию выигрышных клеток
            for (let j = 0; j < win[i].length; j++) {
                win[i][j] = j + n * i; // Горизонтальная линия
                win[i + n][j] = i + n * j; // Вертикальная линия
                win[n + n][i] = i * n + i; // Первая диагональ
                win[win.length - 1][i] = (n - 1) * (i + 1); // Вторая диагональ
            }
        }
    }

    choice_field(size) {
        this.reset();
        this.correct_values(size);
        document.querySelector(".game-field").innerHTML = "";
        n = size;
        for (let i = 0; i < n * n; i++) {
            document.querySelector(".game-field").innerHTML += '<div class="game-field_cell" id="null""></div>';
        }
        game_field.setAttribute('style', 'grid-template-columns: repeat(' + size + ', auto)');
        player.innerHTML = "Ход игрока: " + first_player;
        count = 0;
    }

    back_motion() {
        if (last_motion.id != "null" && !the_end) {
            count--;
            player.innerHTML = "Ход игрока: " + second_player;
            last_motion.id = "null";
            last_motion.innerHTML = "";
        }
    }

    check(playerOne, playerTwo) {
        for (let i = 0; i < win.length; i++) {

            for(let j = 0; j < n; j++){
                if(cells[win[i][j]].id == "X"){
                    check_count_x++;
                }
                else if(cells[win[i][j]].id == "O"){
                    check_count_y++;
                }
            }
                
            if (check_count_x == n) {
                the_end = true;
                player.innerHTML = "Победил игрок " + playerOne;
                post_data(playerOne, playerTwo)
                for(let j = 0; j < n; j++) {
                    cells[win[i][j]].style.backgroundColor = "green";
                }
            }
            else if (check_count_y == n) {

                the_end = true;
                player.innerHTML = "Победил игрок " + playerTwo;
                post_data(playerTwo, playerOne)
                for(let j = 0; j < n; j++) {
                    cells[win[i][j]].style.backgroundColor = "green";
                }
            }
            check_count_x = 0;
            check_count_y = 0;
        }
    }
}

const isPlayerOneFirst = true;
const playerOne = { name: "Ilya" };
const playerTwo = { name: "Simon" };

if (isPlayerOneFirst) {
    player.innerHTML = "Ход игрока: " + playerOne.name;
    first_player = playerOne.name;
}
else {
    player.innerHTML = "Ход игрока: " + playerTwo.name;
    first_player = playerTwo.name;
}
const game = isPlayerOneFirst ? new TicTacToe(playerOne, playerTwo) : new TicTacToe(playerTwo, playerOne);

game_field.addEventListener('click', e => {
    if (e.target.className == "game-field_cell" && e.target.innerHTML == "") {
        if (count % 2 == 0 && !the_end) {
            player.innerHTML = "Ход игрока: " + playerTwo.name;
            second_player = playerOne.name;
            e.target.innerHTML = document.getElementById("cross").outerHTML;
            e.target.id = game.players[0].symbol;
            last_motion = e.target;
            count++;
            game.check(playerOne.name, playerTwo.name);
        }
        else if (!the_end) {
            player.innerHTML = "Ход игрока: " + playerOne.name;
            e.target.innerHTML = document.getElementById("circle").outerHTML;
            second_player = playerTwo.name;
            e.target.id = game.players[1].symbol;
            last_motion = e.target;
            count++;
            game.check(playerOne.name, playerTwo.name);
        }

        if (count >= cells.length && !the_end) {
            player.innerHTML = "Ничья";
            post_data('Draw', 'Draw')
            the_end = true;
        }
    }
});

function post_data(winner, loser)  {
    let data = {
        winner: winner,
        loser: loser
    }
    result.open("POST", '/results', true);
    result.setRequestHeader('Content-Type', 'application/json')
    result.send(JSON.stringify(data));
}