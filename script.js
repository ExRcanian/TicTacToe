//Constructs gameboard
const Gameboard = (() => {
    //Creates array to represent gameboard. Array of 9 empty spaces
    let gameboard = ['','','','','','','','','',]

    //Iterates through each empty array element and creates a div representing a cell
    const makeBoard = () => {
        let boardHTML = '';
        gameboard.forEach((index) => {
            boardHTML += `<div class='space' id='space-${index}'></div>`
        })
        document.querySelector('.gameboard').innerHTML = boardHTML;
        const spaces = document.querySelectorAll('.space');
        spaces.forEach((space) => {
            space.addEventListener('click', Game.clickCell);
        })
    }

    //Allows other functions access to makeboard()
    return {
        makeBoard,
    }

})();


//Constructor to make players
const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}


//Game start controller
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

        const clickCell = (event) => {

        }


        return {
        start,
        }
})();

//Start button on beginning splash. Runs the game controller and hides the launch splashpage
const startGame = document.querySelector('.gameStart');
startGame.addEventListener('click', () => {
    Game.start();
    document.querySelector('.nameStart').style.display = 'none';
})