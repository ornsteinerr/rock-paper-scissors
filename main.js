
/// Main game flow
let playerPoints = 0;
let computerPoints = 0;
game(); // Start game
///

function game(){
    // Play specified number of rounds
    const numRounds = 5;
    for (let i = 0; i < numRounds; i++) {
        console.log(`*****************ROUND ${i+1}*****************`);
        playRound();
    }

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
    console.log(`FINAL RESULTS:
    The overall winner is: ${finalWinner}`);

}

function playRound(){
    // Player chooses
    let playerSelection = prompt("Make a selection").toLowerCase();
    // Computer chooses
    let computerSelection = ComputerPlay();
    console.log("Player selected: " + playerSelection);
    console.log("Computer selected: " + computerSelection);
    let winner = getWinner(playerSelection, computerSelection);
    if (winner !== "Invalid selection"){
        tallyPoints(winner);
    }
    console.log(`The winner is: ${winner}`);
}

function tallyPoints(winner){
    // Add points for winner
    (winner === "Player") ? playerPoints++ : computerPoints++;
    // Print total score
    console.log(`Point count | Player: ${playerPoints} | Computer: ${computerPoints}`);
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