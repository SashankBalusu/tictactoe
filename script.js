let playerOneTurn = true;
let counter = 0;
let onePlayer = false;
const board = document.querySelector("#board")
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const play = document.querySelector("#play");
const form = document.querySelector("#form")
const reset = document.querySelector("#reset");
const twoplayer = document.querySelector("#twoplayer");
const oneplayer = document.querySelector("#oneplayer");
let playerOne = null;
let playerTwo = null;
let win = false;
const gameboard = (()=> {
    let firstRow = [null, null,null];
    let middleRow = [null, null, null];
    let lastRow = [null, null, null];
    return {firstRow, middleRow, lastRow};
})();
const player = (name) => {
    this.name = name; 
    return {name}
};

reset.addEventListener("click", function(){
    counter = 0;
    for (let i = 0; i < 3; i++){
        gameboard.firstRow[i] = null;
    }
    for (let i = 0; i < 3; i++){
        gameboard.middleRow[i] = null;
    }
    for (let i = 0; i < 3; i++){
        gameboard.lastRow[i] = null;
    }
    playerOneTurn = true;
    deleteBoard()
})
play.addEventListener("click", function(){
    playerOne = player(player1.value);
    if (onePlayer == false){
        playerTwo = player(player2.value);
    }
    else {
        playerTwo = player("computer")
    }
    form.setAttribute("style", "display: none;")
    board.setAttribute("style", "display: grid;")
    reset.setAttribute("style", "display:block;")
})
oneplayer.addEventListener("click", function(){
    form.setAttribute("style", "display: block;")
    player2.setAttribute("style", "display:none;")
    oneplayer.setAttribute("style", "display:none;")
    twoplayer.setAttribute("style", "display:none;")
    onePlayer = true;

})
twoplayer.addEventListener("click", function(){
    form.setAttribute("style", "display: block;")
    oneplayer.setAttribute("style", "display:none;")
    twoplayer.setAttribute("style", "display:none;")

})
displayBoard();

function addSymb(id){
    id = id.slice(10)
    counter++;
    
    if (id >= 0 && id <= 2){
        if (!(gameboard.firstRow[id])){
            gameboard.firstRow[id] = getTurn();
        }
    }
    else if (id >=3 && id <=5){
        if(!(gameboard.middleRow[id%3])){
            gameboard.middleRow[id%3] = getTurn();
        }
    }
    else {
        if (!(gameboard.lastRow[id%3])){
            gameboard.lastRow[id%3] = getTurn();
        }
    }
    if (playerOneTurn == false){
        if (onePlayer == true){
            if (win != true){
                computerMove();
            }
        }
    }
    deleteBoard()
    checkWin(id)
    
}
function getTurn (){
    if (playerOneTurn == true){
        playerOneTurn = false;
        return "X"
    }
    else {
        playerOneTurn = true;
        return "O"
    }
}
function deleteBoard(){
    document.querySelectorAll(".gridpiece").forEach(div => div.remove())
    displayBoard();
}
function displayBoard(){
    let j = 0;
    for (let i = 0; i < 3; i++){
        let div = document.createElement("div")
        div.textContent = gameboard.firstRow[i];
        div.id = "boardpiece" + j;
        div.classList.add("gridpiece");
        div.setAttribute("style", "display:grid;")
        board.appendChild(div);
        if (i == 0){
            div.setAttribute("style", "border-right: 2px solid black; border-bottom: 2px solid black;")
        }
        if (i == 1){
            div.setAttribute("style", "border-right: 2px solid black; border-bottom: 2px solid black;")
        }
        if (i == 2){
            div.setAttribute("style", "border-bottom: 2px solid black;")
        }
        j++;
    }
    for (let i = 0; i < 3; i++){
        let div = document.createElement("div")
        div.textContent = gameboard.middleRow[i];
        div.classList.add("gridpiece");
        div.id = "boardpiece" + j;
        div.setAttribute("style", "display:grid; ")
        board.appendChild(div);
        if (i == 0){
            div.setAttribute("style", "border-right: 2px solid black; border-bottom: 2px solid black;")
        }
        if (i == 1){
            div.setAttribute("style", "border-right: 2px solid black; border-bottom: 2px solid black;")
        }
        if (i == 2){
            div.setAttribute("style", "border-bottom: 2px solid black;")
        }
        j++;
    }
    for (let i = 0; i < 3; i++){
        let div = document.createElement("div")
        div.textContent = gameboard.lastRow[i];
        div.classList.add("gridpiece");
        div.id = "boardpiece" + j;
        div.setAttribute("style", "display:grid;")
        board.appendChild(div);
        if (i == 0){
            div.setAttribute("style", "border-right: 2px solid black;")
        }
        if (i == 1){
            div.setAttribute("style", "border-right: 2px solid black;")
        }
        j++;
    }
    const boardpiece = document.querySelectorAll(".gridpiece");
    boardpiece.forEach(piece => piece.addEventListener("click", function(){
    addSymb(piece.getAttribute("id"));
    
    }));
}
function checkWin(piece){
    console.log("hi")
    win = false;
    let row = "";
    //vertical win
    for (let i = 0; i < 3; i++){
        if (gameboard.firstRow[i] && gameboard.middleRow[i] && gameboard.lastRow[i]){
            if (gameboard.firstRow[i] == gameboard.middleRow[i] && gameboard.firstRow[i] == gameboard.lastRow[i]){
                win = true;
                if ((playerOneTurn != true && onePlayer == false)|| (playerOneTurn == true && onePlayer == true)){
                    alert(playerOne.name + " wins, vertically.")
                }
                else {
                    alert(playerTwo.name + " wins, vertically.")
                }
                break;
            }
        }
    }
    //horizontal win
    if (piece < 3){
        row = "top"
        for (let i = 0; i < 3; i++){
            if (gameboard.firstRow[0] && gameboard.firstRow[1] && gameboard.firstRow[2]){
                if (gameboard.firstRow[0] == gameboard.firstRow[1] && gameboard.firstRow[0] == gameboard.firstRow[2]){
                    win = true;
                    if ((playerOneTurn != true && onePlayer == false)|| (playerOneTurn == true && onePlayer == true)){
                        alert(playerOne.name + " wins, horziontally.")
                    }
                    else {
                        alert(playerTwo.name + " wins, horziontally.")
                    }
                    break;
                }
            }
        }
    }
    else if (piece > 5){
        row = "mid"
        for (let i = 0; i < 3; i++){
            if (gameboard.middleRow[0] && gameboard.middleRow[1] && gameboard.middleRow[2]){
                if (gameboard.middleRow[0] == gameboard.middleRow[1] && gameboard.middleRow[0] == gameboard.middleRow[2]){
                    win = true;
                    if ((playerOneTurn != true && onePlayer == false)|| (playerOneTurn == true && onePlayer == true)){
                        alert(playerOne.name + " wins, horziontally.")
                    }
                    else {
                        alert(playerTwo.name + " wins, horziontally.")
                    }
                    break;
                }
            }
        }    
    }
    else {
        for (let i = 0; i < 3; i++){
            row = "bot"
            if (gameboard.lastRow[0] && gameboard.lastRow[1] && gameboard.lastRow[2]){
                if (gameboard.lastRow[0] == gameboard.lastRow[1] && gameboard.lastRow[0] == gameboard.lastRow[2]){
                    win = true;
                    if ((playerOneTurn != true && onePlayer == false)|| (playerOneTurn == true && onePlayer == true)){
                        alert(playerOne.name + " wins, horziontally.")
                    }
                    else {
                        alert(playerTwo.name + " wins, horziontally.")
                    }
                    break;
                }
            }
        }    
    }
    //diagonal win

    if ((gameboard.firstRow[0] == gameboard.middleRow[1] && gameboard.firstRow[0] == gameboard.lastRow[2] && gameboard.middleRow[1] != null)
    || (gameboard.firstRow[2] == gameboard.middleRow[1] && gameboard.firstRow[2] == gameboard.lastRow[0]&& gameboard.middleRow[1] != null)){
        win = true;
        if ((playerOneTurn != true && onePlayer == false)|| (playerOneTurn == true && onePlayer == true)){
            alert(playerOne.name + " wins, diagonally")
        }
        else {
            alert(playerTwo.name + " wins, diagonally.")
        }
    }
    
    //tie
    if (counter == 9 && win != true){
        alert("tie")
    }
}
function computerMove(){
    let random = parseInt((Math.random() *9))
    if (random < 3){
        if (gameboard.firstRow[random] != null){
            while (gameboard.firstRow[random] != null){
                random = parseInt((Math.random() *9))
            }
        }
    }
    else if (random < 3){
        if (gameboard.middleRow[random%3] != null){
            while (gameboard.firstRow[random%3] != null){
                random = parseInt((Math.random() *9))
            }
        }
    }
    else{
        if (gameboard.lastRow[random%3] != null){
            while (gameboard.firstRow[random%3] != null){
                random = parseInt((Math.random() *9))
            }
        }
    }
    addSymb("boardpiece" + random);
    playerOneTurn = true;
}   