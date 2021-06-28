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

function initialPrompt() {
   word = input.question("Let's play some scrabble! Enter a word: ");
    isString = Number(word)
  
 while(isString){
    word = input.question("Let's play some scrabble! Enter a word: ");
    isString = Number(word);
   }
   return word;
};

let simpleScore; 
//= function (word){
// word = word.toUpperCase();
// 	let letterPoints = "";
 
// 	for (let i = 0; i < word.length; i++) {
 
// 	  for (const pointValue in simplePointStructure) {
 
// 		 	letterPoints += `Points for '${word[i]}': ${pointValue}\n`
// 		 }
// 	}
// 	return letterPoints;
//  };

let vowelBonusScore = function(word){
  word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in vowelPointStructure) {
    if(vowelPointStructure[pointValue].includes(word[i])){
      letterPoints += `Points for '${word[i]}': ${pointValue}\n`
        }
		 	}
	  }
	return letterPoints;
};

let scrabbleScore = function(){

};

const scoringAlgorithms = [
   {name:"Simple Score",
    description:"Each letter is worth 1 point.",
    scoringFunction : function (word){
      word = word.toUpperCase();
      let letterPoints = "";
      let totalScore = 0;
    
      for (let i = 0; i < word.length; i++) {
    
        for (const pointValue in simplePointStructure) {
    
          letterPoints += `Points for '${word[i]}': ${pointValue}`;
          totalScore += Number(pointValue);
        }
      }
      word = word.toLowerCase();
      return `Score for '${word}': ${totalScore}`;
      }
  },
  {"Name":"Bonus Vowels","Description":"Vowels are 3 pts, consonants are 1 pt.",scoringFunction:function (word){}},
  {"Name":"Scrabble","Description":"The traditional scoring algorithm.",scoringFunction:function (word){}}
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
    let store = [];
     for (let key in obj) {
        for(let i=0; i<obj[key].length; i++){
            store.push(obj[key][i].toLowerCase());
          }
        }
    store.forEach(key => newPointStructure[key]= 1);
    for (const key of Object.keys(newPointStructure)){
      if(key === "q"){
        newPointStructure[key] = 10;
      }if(key === "z"){
        newPointStructure[key] = 10;
      }if(key === "j"){
        newPointStructure[key] = 8;
      }if(key === "x"){
        newPointStructure[key] = 8;
      }if(key === "k"){
        newPointStructure[key] = 5;
      }if(key === "f"){
        newPointStructure[key] = 4;
      }if(key === "h"){
        newPointStructure[key] = 4;
      }if(key === "v"){
        newPointStructure[key] = 4;
      }if(key === "w"){
        newPointStructure[key] = 4;
      }if(key === "y"){
        newPointStructure[key] = 4;
      }if(key === "b"){
        newPointStructure[key] = 3;
      }if(key === "c"){
        newPointStructure[key] = 3;
      }if(key === "m"){
        newPointStructure[key] = 3;
      }if(key === "p"){
        newPointStructure[key] = 3;
      }if(key === "d"){
        newPointStructure[key] = 2;
      }if(key === "g"){
        newPointStructure[key] = 2;
      }
    }
};

let newPointStructure = {};
transform(oldPointStructure);

function runProgram() {
  let word = initialPrompt();
  let option = scorerPrompt();
  if(option === "0"){
    console.log(scoringAlgorithms[0].scoringFunction(word));
  }else if(option === "1"){
    console.log("it is going here");
    scoringAlgorithms[1].scoringFunction(word);
  }else{
    console.log("it is failing");
    scoringAlgorithms[2].scoringFunction(word);
  }
  // console.log("Scrabble scoring values for");
  // console.log("Letter a: ", newPointStructure.a);
  // console.log("Letter j: ", newPointStructure.j);
  // console.log("Letter z: ", newPointStructure["z"]);


    
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

