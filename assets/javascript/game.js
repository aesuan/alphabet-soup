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
    "banana",
    "sandwich",
    "avocado",
    "quiche",
    "oatmeal",
    "potato",
    "falafel"
]

let currentWord;
let currentWordArray;
let guessedLetters = [];
let lettersToGuess;
let numberOfLives;
let isGameOver = true;
let numberOfWins = 0;
let gamesPlayed = 0;

//function chooses random word out of array
function chooseRandomWord(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
}

//function tests if input is a letter by comparing to alphabet array
function isLetter(input) {
    for (let i = 0, alphabetLength = alphabet.length; i < alphabetLength; i++) {
        if (input.toLowerCase() === alphabet[i].letter) {
            return true;
        }
    }
    return false;
}

//coverts string to object array where each object has letter and wasGuessed attribute
function stringToArray(string) {
    let array = [];
    for (let i = 0, stringLength = string.length; i < stringLength; i++) {
        let char = string[i];
        let item = { character: char, wasGuessed: false }
        array.push(item);
    }
    return array;
}

//determines if a guess which has already been tested for isLetter is in a word 
//and if it is sets wasGuessed to true at every index the letter is found
function isInWord(guess, wordArray) {
    let inArray = false;
    for (let i = 0, wordLength = wordArray.length; i < wordLength; i++) {
        if (guess === wordArray[i].character) {
            wordArray[i].wasGuessed = true;
            inArray = true;
            lettersToGuess--;
        }
    }
    return inArray;
}

//prints word in soup with blanks if has not been guessed yet and with the letter if it has.
//prints word by appending appropriate img html to word-display section
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

//prints incorrect guesses to screen by inserting image html in incorrect-letter-display section
function addIncorrectGuess(char) {
    let incorrectGuessInsert = document.getElementById("incorrect-letters-display");
    let image = '<img class="letter incorrect-letter" alt="' + char + '" src="./assets/images/pen-letters_' + char + '.png">';
    incorrectGuessInsert.innerHTML += image;
}

//checks if character input is already on array of guessed letters
function alreadyGuessed(char) {
    if (guessedLetters.indexOf(char) > -1) {
        return true;
    } else {
        return false;
    }
}

//clears all added image divs, both in soup (word display) and on napkin (incorrect letters)
function clearLetters() {
    let letterSections = document.getElementsByClassName("letter-insert");
    for (let i=0, listLength=letterSections.length; i<listLength; i++) {
        letterSections[i].innerHTML = "";
    }
}

//prints lives on receipt
function printLives() {
    let livesInsert = document.getElementById("lives");
     livesInsert.textContent = numberOfLives + "/5";
}

//prints wins on receipt
function printWins() {
    let winsInsert = document.getElementById("games-won");
    winsInsert.textContent = numberOfWins + "/" + gamesPlayed;
}

//changes receipt to win or lose screen and ends game
function gameOver() {
    if (numberOfLives === 0) {
        document.getElementById("receipt").src = receipt.src.replace("-normal", "-lose");
    } else {
        numberOfWins++;
        document.getElementById("receipt").src = receipt.src.replace("-normal", "-win");
    }
    gamesPlayed++;
    printWins();
    isGameOver = true;
}

//initializes variables and game play
function initializeGame() {
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
    printLives();
    printWins();
}

//main point of game interactivity. space bar starts and restarts game, 
//otherwise as long as a key is a letter and has not been guessed already 
//game checks if it is in word.  if isInWord then prints that letter to screen
//in soup, if not prints to incorrect guesses.  after 5 incorrect guesses or the word
//has been fully guessed game is over
document.onkeyup = function (event) {
    let userGuess = event.key;
    if (isLetter(userGuess) && !alreadyGuessed(userGuess) && !isGameOver) {
        guessedLetters.push(userGuess);
        if (isInWord(userGuess, currentWordArray)) {
            printSoupWord(currentWordArray);
            if (lettersToGuess === 0) {
                gameOver();
            }
        } else {
            --numberOfLives;
            printLives();
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









