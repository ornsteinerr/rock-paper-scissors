/// Declare game variables
let playerPoints = 0;
let computerPoints = 0;
let currentRound = 1;
let numRounds;

// Wait for player to start game
const play = document.querySelector('#play');
play.addEventListener('click', startGame);


/* Core game logic */

function startGame(){
    // Fetch number of rounds inputted
    numRounds = document.getElementById('numRoundsInput').value;
    // Check whether number of rounds input is a valid integer
    if (!(numRounds > 0))
    {
        const numRoundsInput = document.querySelector('#numRoundsInput');
        numRoundsInput.classList.toggle('error');
        return;

    }

    // Update user inputted number of rounds to play
    const totalRoundDisplay = document.querySelector('#totalRoundDisplay');
    totalRoundDisplay.textContent = numRounds;
    // Hide start area
    const startArea = document.querySelector('.startArea');
    startArea.classList.toggle('hidden');
    // Reveal game area
    const gameArea = document.querySelector('.gameArea');
    gameArea.classList.toggle('hidden');
}

// Event listener for player moves

 const moveButtons = document.querySelectorAll('.moveType');
 moveButtons.forEach((moveButton) => {
    moveButton.addEventListener('click', playRound);
 })

function playRound(){
    // Player makes a move
    let computerSelection = ComputerPlay();
    let playerMove = this.name.toLowerCase();
    // Get winner and tally points
    let winner = getWinner(playerMove, computerSelection);
    if (winner !== "Tie"){
        tallyPoints(winner);
    }
    const winnerMsg = document.querySelector('#winnerMsg');
    winnerMsg.textContent = `The round winner is: ${winner}`;
    // Update move history
    updateHistory(playerMove, computerSelection, winner);
    // Update round information
    updateRound();
}

function updateHistory(playerMove, computerSelection, winner){
    let playerStatus;
    let computerStatus;
    if (winner !== "Tie")
    {
        if (winner === "Player")
        {
            playerStatus = "Winner";
        } else
        {
            computerStatus = "Winner";
        }

    } 
    const playerHistory = document.querySelector('.playerHistory');
    playerHistory.appendChild(addMoveIcon(playerMove, playerStatus));
    const computerHistory = document.querySelector('.computerHistory');
    computerHistory.appendChild(addMoveIcon(computerSelection, computerStatus));
}

function addMoveIcon(move, status){
    const moveIcon = document.createElement('div');
    switch (move) {
        case "rock":
            moveIcon.textContent = "✊";
            break;
        case "paper":
            moveIcon.textContent = "✋";
            break;
        case "scissors":
            moveIcon.textContent = "✌️"; // Scissors emoji
            break;
    }
    moveIcon.classList.add('moveTypeHistory');
    if (status === "Winner")
    {
        moveIcon.classList.add('winner');
    }
    return moveIcon;

}

function tallyPoints(winner){
    // Add points for winner
    (winner === "Player") ? playerPoints++ : computerPoints++;
    const playerPointCounter = document.querySelector('#playerPointCounter');
    playerPointCounter.textContent = playerPoints; 
    const computerPointCounter = document.querySelector('#computerPointCounter');
    computerPointCounter.textContent = computerPoints; 
}

function updateRound(){

    // If all rounds have been played, hide the move list
    if (currentRound == numRounds)
    {
        endGame();
        return;
    }
    
    // Update round display
    currentRound++;
    const currentRoundDisplay = document.querySelector('#currentRoundDisplay');
    currentRoundDisplay.textContent = currentRound;

}

function endGame(){

    // Hide moves list
    moveButtons.forEach((moveButton) => {
    moveButton.style.display = 'none';
     })

    // Decide on final winner
    let result;
    if (playerPoints > computerPoints){
        result = "Great job, you are the winner of this match!";
    } else if (playerPoints < computerPoints) {
        result = "Oh no! You lost to the computer.";
    } else {
        result = "It was a tie!";
    } 
    
    // Print final results

    const moveList = document.querySelector('#moveList');
    moveList.appendChild(createPara(result));

    // Add Thanks for Playing msg
    const moveMsg = document.querySelector('#moveMsg');
    moveMsg.textContent = 'Thanks for playing!';

    // Show restart button
    const restartButton = document.querySelector('#restart');
    restartButton.style.display = 'block';
    restartButton.addEventListener('click', restart);

}

function restart(){
    window.location.reload();
}

/** Calculator functions **/

function ComputerPlay() {
    const MOVES = ["rock", "paper", "scissors"];
    return MOVES[Math.floor(Math.random()* MOVES.length)]; // Return random move
}

function getWinner(playerSelection, computerSelection){
    return( // Return winner of the round
        playerSelection === computerSelection ? "Tie" :
        playerSelection === "rock" && computerSelection === "paper" ? "Computer" :
        playerSelection === "rock" && computerSelection === "scissors" ? "Player" :

        playerSelection === "paper" && computerSelection === "rock" ? "Player" :
        playerSelection === "paper" && computerSelection === "scissors" ? "Computer" :

        playerSelection === "scissors" && computerSelection === "rock" ? "Computer" :
        playerSelection === "scissors" && computerSelection === "paper" ? "Player" :
        "Invalid selection"
    );
}

/** Supporting functions **/


function createPara(text){
    const p = document.createElement('p');
    p.textContent = text;
    return p;
}


