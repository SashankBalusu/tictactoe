let playerOneTurn = true;
let counter = 0;
const board = document.querySelector("#board")
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const play = document.querySelector("#play");
const form = document.querySelector("#form")
const reset = document.querySelector("#reset");
let playerOne = null;
let playerTwo = null;
play.addEventListener("click", function(){
    playerOne = player(player1.value);
    playerTwo = player(player2.value);
    form.setAttribute("style", "display: none;")
})
const gameboard = (()=> {
    let firstRow = [null, null,null];
    let middleRow = [null, null, null];
    let lastRow = [null, null, null];
    return {firstRow, middleRow, lastRow};
})();

displayBoard();
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
    deleteBoard()
})
const player = (name) => {
    this.name = name; 
    return {name}
};
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
    let win = false;
    let row = ""
    //vertical win
    for (let i = 0; i < 3; i++){
        if (gameboard.firstRow[i] && gameboard.middleRow[i] && gameboard.lastRow[i]){
            if (gameboard.firstRow[i] == gameboard.middleRow[i] && gameboard.firstRow[i] == gameboard.lastRow[i]){
                win = true;
                alert("win")
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
                    alert("win")
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
                    if (playerOneTurn != true){
                        alert(playerOne.name + " wins")
                    }
                    else {
                        alert(playerTwo.name + " wins")
                    }
                    alert("vertical win")
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
                    if (playerOneTurn != true){
                        alert(playerOne.name + " wins")
                    }
                    else {
                        alert(playerTwo.name + " wins")
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
        if (playerOneTurn != true){
            alert(playerOne.name + " wins")
        }
        else {
            alert(playerTwo.name + " wins")
        }
    }
    
    //tie
    if (counter == 9 && win != true){
        alert("tie")
    }
}
    