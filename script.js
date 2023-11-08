//Constructs gameboard
const Gameboard = (() => {
    //Creates array to represent gameboard. Array of 9 empty spaces
    let gameboard = ['','','','','','','','','',]

    //Iterates through each empty array element and creates a div representing a cell
    const makeBoard = () => {
        let boardHTML = '';

        //For each item in the gameboard array, a square div is created
        gameboard.forEach((gameSpace, index) => {
            boardHTML += `<div class='space' id='space-${index}'>${gameSpace}</div>`
        })
        document.querySelector('.gameboard').innerHTML = boardHTML;


        //Selects all the spaces and adds a click event made in game controller
        const spaces = document.querySelectorAll('.space');
        spaces.forEach((space) => {
            space.addEventListener('click', Game.clickCell);
        })
        }

        //Gets index information based on which space is being clicked then updates that index position in the array with the value that is set to the mark property of the current player, then renders the board with the mark in the space
        const update = (index, value) => {
            gameboard[index] = value;
            makeBoard();
        };

        //Passes gameboard array into function
        const getGameboard = () => gameboard;

    //Allows other functions access to makeboard()
    return {
        makeBoard,
        update,
        getGameboard,
    }

})();


//Constructor to make players
const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}


//Game start controller / logic handling
const Game = (() => {

    //Creates variables for game info and array to contain players
    let players = [];
    let currentPlayer;
    let gameOver;

    const start = () => {
        //Populates player arrays by passing values of inputs to the player constructor
        players = [
            createPlayer(document.querySelector('.p1name').value, 'X'),
            createPlayer(document.querySelector('.p2name').value, 'O')
        ]
        currentPlayer = 0;
        gameOver = false;

        //Creates gameboard using beginning function
        Gameboard.makeBoard();
        }


        //Updates cell contents on click with the mark property of currenty player, then changes currentPlayer  to the next player
        const clickCell = (event) => {
            let index = parseInt(event.target.id.split('-')[1]);
            if (Gameboard.getGameboard()[index] !== '') {
                return;
            }
            Gameboard.update(index, players[currentPlayer].mark);

            //Passes state of board to functions that check if array mark positions matches the arrays that would indicate a victory or a tie
            if (winCheck(Gameboard.getGameboard(), players[currentPlayer].mark)) {
                gameOver = true;
                document.querySelector('.winner').style.display = 'flex';
                document.querySelector('.resultText').innerHTML = `${players[currentPlayer].name} Wins`
            } else if (tieCheck(Gameboard.getGameboard())) {
                gameOver = true;
                document.querySelector('.winner').style.display = 'flex';
                document.querySelector('.resultText').innerHTML = 'Its A Tie'
            }

            currentPlayer = currentPlayer === 0 ? 1 : 0;
        }

        //Restarts game by looping through all the items in the gameboard array to empty, then rerendering the board with the now empty array
        const restart = () => {
            for (let i = 0; i < 9; i++) {
                Gameboard.update(i, '');
            }
            start();
        }
        

        //Allows other functions access to these functions
        return {
        start,
        clickCell,
        restart,
        }
})();

//Compares gameboard array states to arrays that indicate victory
function winCheck(board) {
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a,b,c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

//Checks if every space in the board contains something, indicating that a win was not detected from either player meaning it is a tie
function tieCheck(board) {
    return board.every(space => space !== '');
}



//Start button on beginning splash. Runs the game controller and hides the launch splashpage
const startGame = document.querySelector('.gameStart');
startGame.addEventListener('click', () => {
    Game.start();
    document.querySelector('.nameStart').style.display = 'none';
})

//Initiates restart game function in the Game function and hides endgame splash div
const restartGame = document.querySelector('.restart');
restartGame.addEventListener('click', () => {
    Game.restart();
    document.querySelector('.winner').style.display = 'none';
})