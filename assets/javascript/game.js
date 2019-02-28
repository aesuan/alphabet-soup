//game initializes with empty bowl of alphabet soup with 
//computer chooses random word from list as word choice
//pieces of ?cilantro representing letter spaces
//-->insert cilantro divs.  spacing/margins depnds on number of letters - style sheet includes these styles based on class inserted on each ie cilantro-9. also all have unique numbered ids matching array index.
//append child 
//game asks for user input
//captures keyhit
//converts to lowercase, checks if isLetter
//if isLetter compares to char string of random word
//if in random word, the corresponding empty space (cilantro) changes to corresponding alphabet soup letter by changing image src (images have unique classes) document.getElementById(cilantro-0).src=""
//you lose - play again if lose too many lives (3? 5?)
//otherwise you win!  play again?

const alphabet = [
    { letter: "a", image: "./assets/images/a" },
    { letter: "b", image: "./assets/images/b" },
    { letter: "c", image: "./assets/images/c" },
    { letter: "d", image: "./assets/images/d" },
    { letter: "e", image: "./assets/images/e" },
    { letter: "f", image: "./assets/images/f" },
    { letter: "g", image: "./assets/images/g" },
    { letter: "h", image: "./assets/images/h" },
    { letter: "i", image: "./assets/images/i" },
    { letter: "j", image: "./assets/images/j" },
    { letter: "k", image: "./assets/images/k" },
    { letter: "l", image: "./assets/images/l" },
    { letter: "m", image: "./assets/images/m" },
    { letter: "n", image: "./assets/images/n" },
    { letter: "o", image: "./assets/images/o" },
    { letter: "p", image: "./assets/images/p" },
    { letter: "q", image: "./assets/images/q" },
    { letter: "r", image: "./assets/images/r" },
    { letter: "s", image: "./assets/images/s" },
    { letter: "t", image: "./assets/images/t" },
    { letter: "u", image: "./assets/images/u" },
    { letter: "v", image: "./assets/images/v" },
    { letter: "w", image: "./assets/images/w" },
    { letter: "x", image: "./assets/images/x" },
    { letter: "y", image: "./assets/images/y" },
    { letter: "z", image: "./assets/images/z" },
]

let wordChoices = [
    "cheese",
    "pizza",
    "broccoli",
    "soup",
    "spaghetti",
    "omelette",
    "sundae",
    ""
]

let currentWord;
let currentWordArray;
let guessedLetters = [];
let lettersToGuess;
let numberOfLives;
let isGameOver = true;
let numberOfWins = 0;
let gamesPlayed = 0;

function chooseRandomWord(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
}


function isLetter(input) {
    for (let i = 0, alphabetLength = alphabet.length; i < alphabetLength; i++) {
        if (input.toLowerCase() === alphabet[i].letter) {
            return true;
        }
    }
    return false;
}

function stringToArray(string) {
    let array = [];
    for (let i = 0, stringLength = string.length; i < stringLength; i++) {
        let char = string[i];
        let item = { character: char, isLetter: isLetter(char), wasGuessed: false }
        array.push(item);
    }
    return array;
}

function isInWord(guess, wordArray) {
    let inArray = false;
    for (let i = 0, wordLength = wordArray.length; i < wordLength; i++) {
        if (guess === wordArray[i].character) {
            wordArray[i].wasGuessed = true;
            inArray = true;
            lettersToGuess--;
            console.log("Letters to Guess: " + lettersToGuess);
        }
    }
    return inArray;
}

function printSoupWord(wordArray) {
    let letterInsert = document.getElementById("word-display");
    letterInsert.innerHTML = "";
    for (let i=0, wordLength = wordArray.length; i<wordLength; i++) {
        let char = wordArray[i].character;
        if (wordArray[i].wasGuessed) {
            letterInsert.innerHTML+='<img class="letter soup-letter" alt="' + char + '" src="./assets/images/soup_' + char + '.png">';
        } else {
            letterInsert.innerHTML+='<img class="letter soup-letter" alt="blank" src="./assets/images/soup_blank.png">';
        }       
    }
}

function addIncorrectGuess(char) {
    let incorrectGuessInsert = document.getElementById("incorrect-letters-display");
    let image = '<img class="letter incorrect-letter" alt="' + char + '" src="./assets/images/pen-letters_' + char + '.png">';
    incorrectGuessInsert.innerHTML += image;
}

function alreadyGuessed(char) {
    if (guessedLetters.indexOf(char) > -1) {
        return true;
    } else {
        return false;
    }
}

function clearLetters() {
    let letterSections = document.getElementsByClassName("letter-insert");
    for (let i=0, listLength=letterSections.length; i<listLength; i++) {
        letterSections[i].innerHTML = "";
    }
}

function gameOver() {
    if (numberOfLives === 0) {
        console.log("you lose");
        document.getElementById("receipt").src = receipt.src.replace("-normal", "-lose");
    } else {
        console.log("you win");
        document.getElementById("receipt").src = receipt.src.replace("-normal", "-win");
    }
    isGameOver = true;
}

function initializeGame() {
    gamesPlayed++;
    numberOfLives = 5;
    guessedLetters = [];
    lettersToGuess = 0;
    isGameOver = false;
    currentWord = chooseRandomWord(wordChoices);
    currentWordArray = stringToArray(currentWord);
    lettersToGuess = currentWord.length;
    document.getElementById("receipt").src = "./assets/images/receipt-normal.png";
    clearLetters();
    printSoupWord(currentWordArray);
    console.log("Current Word: " + currentWord);
}

document.onkeyup = function (event) {
    let userGuess = event.key;
    console.log("User Guess: " + userGuess);
    if (isLetter(userGuess) && !alreadyGuessed(userGuess) && !isGameOver) {
        guessedLetters.push(userGuess);
        console.log("Guessed Letters: " + guessedLetters);
        if (isInWord(userGuess, currentWordArray)) {
            printSoupWord(currentWordArray);
            if (lettersToGuess === 0) {
                gameOver();
            }
        } else {
            --numberOfLives;
            console.log("Lives: " + numberOfLives);
            addIncorrectGuess(userGuess);
            if (numberOfLives === 0) {
                gameOver();
            }
        }
    } else if (isGameOver) {
        if (userGuess === " ") {
            initializeGame();          
        }
    }
}









