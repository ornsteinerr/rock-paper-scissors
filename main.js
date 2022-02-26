/// Declare game variables
let playerPoints = 0;
let computerPoints = 0;
let currentRound = 0;
let numRounds;
startGame(); // Start game
///


function startGame(){
    const play = document.querySelector('#play');
    play.addEventListener('click', startGame);
    // Update user inputted number of rounds to play
    const totalRoundDisplay = document.querySelector('#totalRoundDisplay');
    numRounds = document.getElementById('numRounds').value;
    totalRoundDisplay.textContent = numRounds;
    // Reveal game area
    const gameArea = document.querySelector('#gameArea');
    gameArea.style.display = 'block';
}

function updateRound(){

    // Update round display

    currentRound++;
    const currentRoundDisplay = document.querySelector('#currentRoundDisplay');
    currentRoundDisplay.textContent = currentRound;
    console.log(`currentRound: ${currentRound} numRounds: ${numRounds}`);
    // If all rounds have been played, hide the move list
    if (currentRound == numRounds)
    {
        endGame();
    }

}

function endGame(){

    // Hide moves list and show thanks for playing
    moveButtons.forEach((moveButton) => {
    moveButton.style.display = 'none';
     })
    const moveMsg = document.querySelector('#moveMsg');
    moveMsg.textContent = 'Thanks for playing!';


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

}

// Event listener for player moves

 const moveButtons = document.querySelectorAll('.moveType');
 moveButtons.forEach((moveButton) => {
    moveButton.addEventListener('click', playRound);
 })

function playRound(){

    // Player makes a move
    let computerSelection = ComputerPlay();
    let playerMove = this.textContent.toLowerCase();
    // Update move
    updateHistory(playerMove, computerSelection);
    // Get winner and tally points
    let winner = getWinner(playerMove, computerSelection);
    tallyPoints(winner);
    const winnerMsg = document.querySelector('#winnerMsg');
    winnerMsg.textContent = `The winner is: ${winner}`;
    // Update round information
    updateRound();
}

function updateHistory(playerMove, computerSelection){
    const playerHistory = document.querySelector('.playerHistory');
    playerHistory.appendChild(createPara(playerMove));
    const computerHistory = document.querySelector('.computerHistory');
    computerHistory.appendChild(createPara(computerSelection));
}


function createPara(text){
    const p = document.createElement('p');
    p.textContent = text;
    return p;
}

function tallyPoints(winner){
    // Add points for winner
    (winner === "Player") ? playerPoints++ : computerPoints++;
    const playerPointCounter = document.querySelector('#playerPointCounter');
    playerPointCounter.textContent = playerPoints; 
    const computerPointCounter = document.querySelector('#computerPointCounter');
    computerPointCounter.textContent = computerPoints; 
    // TODO: Update points
}

function ComputerPlay() {
    const MOVES = ["rock", "paper", "scissors"];
    return MOVES[Math.floor(Math.random()* MOVES.length)]; // Return random move
}

function getWinner(playerSelection, computerSelection){
    return( // Winning logic
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


