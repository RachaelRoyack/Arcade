/* Requirements

Think about initial state
Think about things you will need to track
Think about potential functions
etc...


- Initial State:
    - A board that is divided into a 3x3 grid
    - A grid layout (for board)
    - Borders to show tic-tac-toe style board
    - Maybe input spot in cells to player can type X or O
        -another option would be a selector at top to select X or O and then click on cell to add
    - Score Counter. Starting at 0
    - All cells should be empty at beginning of game

- Keep track of high score (bonus)
- Keep track of when 3 X's or 3 O's are in a row
- Draw if nobody wins


-Potential Functions:
    - Adds X or O to cell via input or selector on click
    - Checks grid to see if 3 X's or 3 O's in diagonal line, column, or row
    - Increases players' score when a game is one
    - If grid full but no wins then advises "Draw"
    - Reset game

*/


const PLAYING = "PLAYING"
const GAME_OVER = "GAME_OVER"
const NEW = "NEW"
const gameOverMessage = document.getElementById('playerWinBanner')
const gameOverBox = document.getElementById('gameOverBox')
const board = document.getElementById('board')
const boardCells = document.getElementsByClassName('cell')
const input = document.getElementsByTagName('input')[0]
const submit = document.getElementById('submitNamesButton')
const firstPlayer = document.getElementById('playerOne')
const secondPlayer = document.getElementById('playerTwo')
const submitArea = document.getElementsByClassName('playerNames')[0]
const resetButton = document.getElementById('resetButton')
let playerOne = ''
let playerTwo = ''

let gamePlay = {
    newBoard: [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"]
      ],
      resetInitialState: function () {
        gameState.currentBoard = this.newBoard;
        for (let i = 0; i < boardCells.length; i++) {
            boardCells[i].innerText = ""
        }
        gameOverBox.style.display = 'none'
        submitArea.style.display = 'flex'
        firstPlayer.innerText = "PlayerOne (X's):"
        secondPlayer.innerText = "PlayerTwo (O's):"
        board.style.marginTop = "0%"
        playerOne = ""
        playerTwo = ""
        return gameState.currentBoard
       },
       
       addLtrToBoard: function (player, id){
        let y = id[0]
        let x = id[2]
        if (gameState.currentBoard[y][x] !== '-'){
            return
        } else {
            if (player === playerOne) {
                letter = "X"
            } else if (player === playerTwo) {
                letter = "O"
            }
            gameState.currentBoard[y][x] = letter
        }
        
  
    },
    updateHTMLboard: function (player, id) {
        let y = id[0]
        let x = id[2]
        if (gameState.currentCell.innerText !== '') {
            return
        } else {
            if (player === playerOne){
                gameState.currentCell.innerText = 'X'
            } else if (player === playerTwo){
                gameState.currentCell.innerText = 'O'
            };
        }
    },

    changePhaseTo: function(newPhase) {
        gameState.phase = newPhase
    
        if (gameState.phase === PLAYING) {
            return
        } else if (gameState.phase === GAME_OVER) {
            gameOverBox.style.display = "flex"
            board.style.marginTop = "25%"
            console.log (gameState.winner)
            this.showWinner ()

        }
    },
    showWinner: function () {
        if (gameState.winner === playerOne) {
            gameOverMessage.innerText = playerOne + " Wins!"
        } else if (gameState.winner === playerTwo) {
            gameOverMessage.innerText = playerTwo + " Wins!"
        } else if (gameState.winner === "none") {
            gameOverMessage.innerText = "It's a draw!"
        }
    },
}


let gameState = {
    players: function () {
        let playerName = input.value
        let order = Math.ceil(Math.random() * 2)
        console.log (order)
        console.log (playerName)
        if (playerName === playerOne || playerName === playerTwo) {
            gameOverBox.style.display = "flex"
            gameOverMessage.innerText = "Must enter different names!"
            resetButton.innerText = "OK"
            return
        }
        if ((order === 2) && (playerOne === '')) {
         playerOne = playerName
        } else {
            if ((playerTwo === "")) {
                playerTwo = playerName
            } else if ((playerOne === "")) {
                playerOne = playerName
            } 

        }

        firstPlayer.innerText = "PlayerOne (X's): " + playerOne
        secondPlayer.innerText = "PlayerTwo (O's): " + playerTwo

        if ((playerOne !== '') && (playerTwo !== '')) {
            submitArea.style.display = 'none'
        }
    },
    currentCell: " ",
    currentBoard: [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"]
      ],
      turnNumber: 0,

      playersTurn: function (){
        if (this.currentCell.innerText !== '') {
            return
        } else {
            if ((this.turnNumber % 2) === 0) {
                let player = playerOne
                this.turnNumber++
                return player
                
            } else { 
                let player = playerTwo
                this.turnNumber++
                return player
            }
        }
        
    },
    winner: "",
    phase: NEW,
    checkWin: function() {
        if ((this.currentBoard[0][0] === "X") && (this.currentBoard[1][1] === "X") && (this.currentBoard[2][2] === "X")) {
            this.winner = playerOne
            gamePlay.changePhaseTo(GAME_OVER)
        }
        else if ((this.currentBoard[0][0] === "O") && (this.currentBoard[1][1] === "O") && (this.currentBoard[2][2] === "O")) {
            this.winner = playerTwo
            gamePlay.changePhaseTo(GAME_OVER)
        } else if ((this.currentBoard[0][2] === "X") && (this.currentBoard[1][1] === "X") && (this.currentBoard[2][0] === "X")) {
            this.winner = playerOne
            gamePlay.changePhaseTo(GAME_OVER)
        } else if ((this.currentBoard[0][2] === "O") && (this.currentBoard[1][1] === "O") && (this.currentBoard[2][0] === "O")) {
            this.winner = playerTwo
            gamePlay.changePhaseTo(GAME_OVER)
        } else if ((this.currentBoard[0][0] === "X") && (this.currentBoard[0][1] === "X") && (this.currentBoard[0][2] === "X")) {
            this.winner = playerOne
            gamePlay.changePhaseTo(GAME_OVER)
        } else if ((this.currentBoard[0][0] === "O") && (this.currentBoard[0][1] === "O") && (this.currentBoard[0][2] === "O")) {
            this.winner = playerTwo
            gamePlay.changePhaseTo(GAME_OVER)
        } else if ((this.currentBoard[1][0] === "X") && (this.currentBoard[1][1] === "X") && (this.currentBoard[1][2] === "X")) {
            this.winner = playerOne
            gamePlay.changePhaseTo(GAME_OVER)
        } else if ((this.currentBoard[1][0] === "O") && (this.currentBoard[1][1] === "O") && (this.currentBoard[1][2] === "O")) {
            this.winner = playerTwo
            gamePlay.changePhaseTo(GAME_OVER)
        } else if ((this.currentBoard[2][0] === "X") && (this.currentBoard[2][1] === "X") && (this.currentBoard[2][2] === "X")) {
            this.winner = playerOne
            gamePlay.changePhaseTo(GAME_OVER)
        } else if ((this.currentBoard[2][0] === "O") && (this.currentBoard[2][1] === "O") && (this.currentBoard[2][2] === "O")) {
            this.winner = playerTwo
            gamePlay.changePhaseTo(GAME_OVER)
        } else if ((this.currentBoard[0][0] === "X") && (this.currentBoard[1][0] === "X") && (this.currentBoard[2][0] === "X")) {
            this.winner = playerOne
            gamePlay.changePhaseTo(GAME_OVER)
        } else if ((this.currentBoard[0][0] === "O") && (this.currentBoard[1][0] === "O") && (this.currentBoard[2][0] === "O")) {
            this.winner = playerTwo
            gamePlay.changePhaseTo(GAME_OVER)
        } else if ((this.currentBoard[0][1] === "X") && (this.currentBoard[1][1] === "X") && (this.currentBoard[2][1] === "X")) {
            this.winner = playerOne
            gamePlay.changePhaseTo(GAME_OVER)
        } else if ((this.currentBoard[0][1] === "O") && (this.currentBoard[1][1] === "O") && (this.currentBoard[2][1] === "O")) {
            this.winner = playerTwo
            gamePlay.changePhaseTo(GAME_OVER)
        } else if ((this.currentBoard[0][2] === "X") && (this.currentBoard[1][2] === "X") && (this.currentBoard[2][2] === "X")) {
            this.winner = playerOne
            gamePlay.changePhaseTo(GAME_OVER)
        } else if ((this.currentBoard[0][2] === "O") && (this.currentBoard[1][2] === "O") && (this.currentBoard[2][2] === "O")) {
            this.winner = playerTwo
            gamePlay.changePhaseTo(GAME_OVER)
        } 
    },
    checkDraw: function () {
        let boardArr = []
        for (let i = 0; i < this.currentBoard.length; i++) {
                    for (let j = 0; j < this.currentBoard[i].length; j++) {
                        boardArr.push(this.currentBoard[i][j])
                        console.log (boardArr)
                    }
                }    
                if (boardArr.length === 9) {
                    for (let z = 0; z < boardArr.length; z++) {
                        if (boardArr[z] === '-') {
                            return
                        }
                        }
                        this.winner = "none"
                        gamePlay.changePhaseTo(GAME_OVER)
                } else {
                    return        
                }
        },
    }


submit.addEventListener('click', function (event) {
    event.preventDefault();
    gameState.players()
    input.value = ""
})

resetButton.addEventListener ('click', function (event){
    event.preventDefault();
    gamePlay.resetInitialState()

})

board.addEventListener('click', function(event) {
        event.preventDefault();
        if (event.target.className !== 'cell') {
            return
        } else {
            if ((playerOne !== '') && (playerTwo !== '')) {
                let coordinates = event.target.id
                gameState.currentCell = document.getElementById(coordinates)
                let currentPlayer = gameState.playersTurn()
                gamePlay.changePhaseTo(PLAYING)
                gamePlay.addLtrToBoard (currentPlayer, coordinates);
                gamePlay.updateHTMLboard (currentPlayer, coordinates)
                gameState.checkWin()
                gameState.checkDraw()
            }
        }
    });




    

