const MOVES = ['Rock', 'Paper', 'Scissors'];

function ComputerPlay() {
    return MOVES[Math.floor(Math.random()* MOVES.length)]; // Return random move
}

console.log(ComputerPlay());