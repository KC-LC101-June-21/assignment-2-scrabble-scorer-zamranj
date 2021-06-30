// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
  };
const simplePointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T','D','G','B', 'C','M', 'P','F', 'H', 'V', 'W', 'Y','K','J', 'X','Q', 'Z']
};
const vowelPointStructure = {
  3: ['A', 'E', 'I', 'O', 'U'],
  1: ['L', 'N', 'R', 'S', 'T','D', 'G','B', 'C', 'M', 'P','F', 
  'H', 'V','W', 'Y','K','J', 'X','Q', 'Z']
};
function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let newPointStructure = transform(oldPointStructure);
function initialPrompt() {
   word = input.question("Let's play some scrabble! Enter a word: ");
  isString = Number(word)
 //Bonus check for non string values 
 while(isString){
    word = input.question("Let's play some scrabble! Enter a word: ");
    isString = Number(word);
   }
   return word;
};

let simpleScore = function (word){
      word = word.toUpperCase();
      let letterPoints = "";
      let totalScore = 0;
      for (let i = 0; i < word.length; i++) {
        for (const pointValue in simplePointStructure) {
          letterPoints += `Points for '${word[i]}': ${pointValue}`;
          totalScore += Number(pointValue);
        }
      }
	  console.log("Points for "+word+" : "+Number(totalScore));
     return totalScore;
} 
let vowelBonusScore = function(word){
        word = word.toUpperCase();
      let letterPoints = "";
      let totalScore = 0;
      for (let i = 0; i < word.length; i++) {
        for (const pointValue in vowelPointStructure) {
          if(vowelPointStructure[pointValue].includes(word[i])){
          totalScore += Number(pointValue);
            }
          }
        }
	   console.log("Points for "+word+" : "+Number(totalScore));
     return totalScore;
    
};

let scrabbleScore = function(word){
word = word.toLowerCase();
      let letterPoints = "";
      let totalScore = 0;
        for (let i = 0; i < word.length; i++) {
          for (const key in newPointStructure) {
          if(key === word[i]){
            letterPoints = letterPoints +"+"+ newPointStructure[key];
            totalScore += Number(newPointStructure[key]);
          }
        }
      }
    console.log("Points for "+word+" : "+Number(totalScore));
     return totalScore;
};

const scoringAlgorithms = [
  {name: 'Simple Score',
    description:'Each letter is worth 1 point.',
    scoringFunction : simpleScore
  },
  {name:'Bonus Vowels',
  description:'Vowels are 3 pts, consonants are 1 pt.',
  scoringFunction : vowelBonusScore
  },
  {name:'Scrabble',
  description:'The traditional scoring algorithm.',
  scoringFunction: scrabbleScore
  }
];

function scorerPrompt() {
  option = input.question(`Which scoring algorithm would like to use?\n
  0 - Simple: One point per character
  1 - Vowel Bonus: Vowels are worth 3 points
  2 - Scrabble: Uses scrabble point system
  Enter 0, 1, or 2: `);
  return option;
}

function transform(obj) {
  let store =[];
  let out ={};
  //iterate over the object and arrays and push the values into store array
     for (let key in obj) {
        for(let i=0; i<obj[key].length; i++){
            store.push(obj[key][i].toLowerCase());
          }
        }
    //stores the objects in out and assigns a value of one to every key    
    store.forEach(key => out[key]= 1);
    //loop over the objects and assign appropriate points to alphabets
    for (const key of Object.keys(out)){
      if(key === "q"){
        out[key] = 10;
      }if(key === "z"){
        out[key] = 10;
      }if(key === "j"){
        out[key] = 8;
      }if(key === "x"){
        out[key] = 8;
      }if(key === "k"){
        out[key] = 5;
      }if(key === "f"){
        out[key] = 4;
      }if(key === "h"){
        out[key] = 4;
      }if(key === "v"){
        out[key] = 4;
      }if(key === "w"){
        out[key] = 4;
      }if(key === "y"){
        out[key] = 4;
      }if(key === "b"){
        out[key] = 3;
      }if(key === "c"){
        out[key] = 3;
      }if(key === "m"){
        out[key] = 3;
      }if(key === "p"){
        out[key] = 3;
      }if(key === "d"){
        out[key] = 2;
      }if(key === "g"){
        out[key] = 2;
      }
    }
    // Bonus: Score words spelled with blank tiles by adding ' ' to the newPointStructure object. The point value for a blank tile is 0
    out[" "] = 0;
     return out;
};



function runProgram() {
  let word = initialPrompt();
  let option = scorerPrompt();
  if(option === "0"){
    scoringAlgorithms[0].scoringFunction(word);
  }else if(option === "1"){
    scoringAlgorithms[1].scoringFunction(word);
  }else{
    scoringAlgorithms[2].scoringFunction(word);
  }
}
// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

