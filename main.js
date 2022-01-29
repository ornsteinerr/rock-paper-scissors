const MOVES = ["rock", "paper", "scissors"];

/// Main game flow
const playerSelection = "rock"; // Placeholder input for player
playRound(playerSelection, ComputerPlay());


function ComputerPlay() {
    return MOVES[Math.floor(Math.random()* MOVES.length)]; // Return random move
}

function playRound(playerSelection, computerSelection){
    console.log("Player selected: " + playerSelection);
    console.log("Computer selected: " + computerSelection);
    let winner = getWinner(playerSelection, computerSelection);
    console.log(`The winner is: ${winner}`);
}

function getWinner(playerSelection, computerSelection){
    return(
        playerSelection === "rock" && computerSelection === "rock" ? "Tie" :
        playerSelection === "rock" && computerSelection === "paper" ? "Computer" :
        playerSelection === "rock" && computerSelection === "scissors" ? "Player" :

        playerSelection === "paper" && computerSelection === "rock" ? "Player" :
        playerSelection === "paper" && computerSelection === "paper" ? "Tie" :
        playerSelection === "paper" && computerSelection === "scissors" ? "Computer" :

        playerSelection === "scissors" && computerSelection === "rock" ? "Computer" :
        playerSelection === "scissors" && computerSelection === "paper" ? "Player" :
        playerSelection === "scissors" && computerSelection === "scissors" ? "Tie" :
        "Invalid selection"
    );
}