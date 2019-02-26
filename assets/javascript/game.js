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
]

let wordInsert = document.getElementById("word");
let livesInsert = document.getElementById("lives");
let incorrectInsert = document.getElementById("incorrect-letters");
let infoInsert = document.getElementById("info");
let currentWord;
let currentWordArray;
let guessedLetters = [];
let numberOfLives;
let lettersToGuess;
let isGameOver;

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

// function indexOfLetter(input) {
//     for (let i = 0, arrayLength = alphabet.length; i < arrayLength; i++) {
//         if (input.toLowerCase() === alphabet[i].letter) {
//             return i;
//         }
//     }
//     return -1;
// }


// function indexOfGuess(wordArray, guess) {
//     for (let i = 0, wordLength = wordArray.length; i < wordLength; i++) {
//         console.log(wordArray[i].character);
//         if (guess === wordArray[i].character) {
//             wordArray[i].wasGuessed = true;
//             return i;
//         }
//     }
//     return -1;
// }

function isInWord(guess, wordArray) {
    let inArray = false;
    for (let i = 0, wordLength = wordArray.length; i < wordLength; i++) {
        if (guess === wordArray[i].character) {
            wordArray[i].wasGuessed = true;
            inArray = true;
            lettersToGuess--;
            console.log(lettersToGuess);
        }
    }
    return inArray;
}

// let thisArray = stringToArray(wordChoices[2]);
// thisArray[0].wasGuessed = true;

function printWord(wordArray) {
    wordInsert.textContent = "";
    for (let i = 0, wordLength = wordArray.length; i < wordLength; i++) {
        let item = wordArray[i];
        if (item.wasGuessed) {
            wordInsert.appendChild(document.createTextNode(item.character + " "));
        } else {
            wordInsert.appendChild(document.createTextNode("- "));
        }
    }
}

function alreadyGuessed(char) {
    if (guessedLetters.indexOf(char) > -1) {
        return true;
    } else {
        return false;
    }
}


function gameOver() {
    if (numberOfLives === 0) {
        console.log("you lose");
        infoInsert.textContent = "You Lose!";
    } else {
        console.log("you win");
        infoInsert.textContent = "You Win!";
    }
    infoInsert.appendChild(document.createTextNode(" Press space to play again."));
    // infoInsert.textContent += "  Press space to play again."
    isGameOver = true;
}

function initializeGame() {
    currentWord = chooseRandomWord(wordChoices);
    currentWordArray = stringToArray(currentWord);
    guessedLetters = [];
    numberOfLives = 5;
    lettersToGuess = 0;
    isGameOver = false;
    lettersToGuess = currentWord.length;
    printWord(currentWordArray);
    livesInsert.textContent = numberOfLives;
    infoInsert.textContent = "";
    incorrectInsert.textContent = "";
    console.log(currentWord);
}


initializeGame();

document.onkeyup = function (event) {
    let userGuess = event.key;
    console.log(userGuess);
    if (isLetter(userGuess) && !alreadyGuessed(userGuess) && !isGameOver) {
        guessedLetters.push(userGuess);
        console.log(guessedLetters);
        if (isInWord(userGuess, currentWordArray)) {
            printWord(currentWordArray);
            if (lettersToGuess === 0) {
                gameOver();
            }
        } else {
            incorrectInsert.textContent += userGuess;
            livesInsert.textContent = --numberOfLives;
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








