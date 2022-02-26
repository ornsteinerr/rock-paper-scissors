
/// Main game flow
let playerPoints = 0;
let computerPoints = 0;
game(); // Start game
///

function game(){
    // Play specified number of rounds
    const play = document.querySelector('#play');
    play.addEventListener('click', startGame);

    // for (let i = 0; i < numRounds; i++) {
    //     console.log(`*****************ROUND ${i+1}*****************`);
    //     playRound();
    // }

    // Decide on final winner
    let finalWinner;
    if (playerPoints > computerPoints){
        finalWinner = "Player";
    } else if (playerPoints < computerPoints) {
        finalWinner = "Computer";
    } else {
        finalWinner = "Tie!";
    } 

    // Print final results

   `FINAL RESULTS: The overall winner is: ${finalWinner}`

}

function startGame(){
    let currentRound = 0;

    const numRounds = document.getElementById('numRounds').value;
    const announcement = document.createElement('h2');
    announcement.textContent = `Playing Round ${currentRound} of ${numRounds}`;
    announcement.id = 'announcement';
    const start = document.querySelector('#start');
    start.appendChild(announcement);

    for (let currentRound = 0; currentRound < numRounds; currentRound++ ){
        const announcement = document.querySelector('#announcement');
        announcement.textContent = `Playing Round ${currentRound} of ${numRounds}`;
    }
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
    //console.log(`The winner is: ${winner}`);
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


