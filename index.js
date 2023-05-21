
//ANSWERS ARRAY & VARIABLE 

const answers =["arise","force","fully","funny","mixed","rapid","style","think","vital","worst"];
var answer = answers[Math.floor(Math.random() * 10)].toUpperCase(); // answer is randomised from the array and then converted to all caps



//VARIABLES

var guessNumber = 0; // tracks current guess, this is the row you are on
var position = 0; // tracks letter position, this is the column you are on 
var allKeys = document.querySelectorAll("button"); // all the html buttons available: alphabet, backspace and enter
var keyboard = "qwertyuiopasdfghjklzxcvbnm"; 
var keyboardUpper = "QWERTYUIOPASDFGHJKLZXCVBNM";
var count = 0; // used to see if a potentail yellow should become a grey or yellow
var inPlay = true; // used to end all inputs at the end of the game 
//var error_count = 0; //Used for debugging



//ARRAYS

const guessLetters = []; 
const answerLetters = []; 
const greenLetters = [,,,,,]; // commas are placeholders. MUST BE RESET EACH GUESS
const notGreen = [,,,,,]; // all letters that aren't green go in this array 
const potentialYellows = [,,,,,]; // this sperates duplicate letters that land on a green 
const yellows = [,,,,,]; 
const lettersUsed = [,,,,,];
const allLetters = []; 
const allLettersUpper = [];



//FUNCTIONS

function split(word, array){        // used to split string into an array by letter
    for(let i=0; i<word.length; i++){
        array.push(word.slice(i,i+1));
    }
}


function guess(){                   // processes the guess after confimation, checking for greens, yellows and greys
    for(let i=0; i<5; i++){
        
        if(guessLetters[i] === answerLetters[i]){ // checking if the letters in the guess word match the letters in the answer
            greenLetters[i] = guessLetters[i];  

        }
        else{
            
            notGreen[i] = guessLetters[i];
            potentialYellows[i] = guessLetters[i]; 
        } 
    }

    for (let i = 0; i <notGreen.length;i++){            // This is for a special circumstance when a letter is used twice in the word and one 
        for(let j = 0; j <greenLetters.length;j++){     // lands on a green eg. answer is 'world' guess is 'hello'. The second 'l' should be green 
            if (notGreen[i] === greenLetters[j]){       // and the first one is grey not yellow. This process ensures the first 'l' isn't yellow.
                potentialYellows[i] = "," ;
                
             }
        }
    }
   
    for (let i = 0; i <potentialYellows.length;i++){    // checks for yellows and adds grey letters to letters used. 
        count = 0;
        for(let j = 0; j <answerLetters.length;j++){
            if(potentialYellows[i] === answerLetters[j]){
                yellows[i] = potentialYellows[i];
                count+=1;
             } 
        }

        if(count === 0){                                     
        lettersUsed[i] = potentialYellows[i];  
        }
    }

    position = 0;
    guessNumber +=1;
}


function reset(){                   // sets greens, yellows, notGreens & potentialYellows back to defualt array 
    for(let i = 0;i<5;i++){         
        yellows[i]= "";
        greenLetters[i]="";
        potentialYellows[i] = "";
        notGreen[i]= "";
        lettersUsed[i]= "";
    }
    
}


function validKey(key){             // checks that key pressed is in the keyboard array 
    for( let i=0;i<allLetters.length;i++){
        if(key === allLetters[i] || key === allLettersUpper[i]){
            return true
        }
    }
}


function winLose(){                 // displays image depending on win or loss & toggles inPLay which then disables any further input
    
    if(greenLetters.toString() === answerLetters.toString()){ // must convert to string as JS wont verify two arrays being equal
        inPlay = false;
        document.querySelector(".picDiv").children[0].style.display = 'inline'; // current dispaly is none, this changes it to inline and reveals it
    }
    if (guessNumber >= 6 && greenLetters.toString() !== answerLetters.toString()){
        inPlay = false;
        document.querySelector(".picDiv").children[1].style.display = 'inline';
    }
}


function squareColours(){           // changes the guess square colours to green, yellow or grey appropriately
    for(let i = 0; i<5; i++){
        if(validKey(yellows[i]) === true){ // this checks that value of array[i] is a letter and not a blank space 
            document.querySelector(".template").children[position+(5*guessNumber)-5+i].style.backgroundColor = "rgb(220, 193, 96)";
            
        }
        else if (validKey(greenLetters[i]) === true){
            document.querySelector(".template").children[position+(5*guessNumber)-5+i].style.backgroundColor = "rgb(41, 166, 41)";
        }

        else { 
            document.querySelector(".template").children[position+(5*guessNumber)-5+i].style.backgroundColor = "rgb(198, 184, 184)";
        }
    }

}


function usedLetters(){             // changes the button colours to green, yellow or grey appropriately
    for(let i =0; i<lettersUsed.length;i++){
       // console.log("usedLetters: "+ lettersUsed[i])
        for(let j =0; j<26;j++){
            //console.log("keyboard letters: "+ document.querySelectorAll(".keyboard")[j].innerHTML)
            if (lettersUsed[i] === document.querySelectorAll(".keyboard")[j].innerHTML){
                document.querySelectorAll(".keyboard")[j].style.backgroundColor = "rgb(55, 53, 53)";
            }
        }
        
    }

    for(let i =0; i<yellows.length;i++){
        // console.log("usedLetters: "+ lettersUsed[i])
         for(let j =0; j<26;j++){
             //console.log("keyboard letters: "+ document.querySelectorAll(".keyboard")[j].innerHTML)
             if (yellows[i] === document.querySelectorAll(".keyboard")[j].innerHTML){
                 document.querySelectorAll(".keyboard")[j].style.backgroundColor = "rgb(220, 193, 96)";
             }
         }
         
     }

     for(let i =0; i<greenLetters.length;i++){
        // console.log("usedLetters: "+ lettersUsed[i])
         for(let j =0; j<26;j++){
             //console.log("keyboard letters: "+ document.querySelectorAll(".keyboard")[j].innerHTML)
             if (greenLetters[i] === document.querySelectorAll(".keyboard")[j].innerHTML){
                 document.querySelectorAll(".keyboard")[j].style.backgroundColor = "rgb(41, 166, 41)";
             }
         }
         
     }





}


//EVENT LISTENERS

// KEYBOARD

document.addEventListener("keyup",function(event){      //  event listener using the keyboard
    

    if(position <5 && validKey(event.key) === true && inPlay === true){                                                         // makes sure the event key value is valid then inserts it into the correct                  
        document.querySelector(".template").children[position+(5*guessNumber)].innerHTML = event.key.toUpperCase();             // position and increases position by 1.          
        position+=1;
    }
    
    else if(position>0 && event.key === 'Backspace' && inPlay === true){                                                        // goes back a position then clears it
        position-=1;
        document.querySelector(".template").children[position+(5*guessNumber)].innerHTML = ''; //must come after the position change 
    }

    else if(position == 5 && event.key === 'Enter' && inPlay === true){
        
        for(let i = 0;i<5;i++){
            guessLetters[i] = document.querySelector(".template").children[position+(5*guessNumber)-5+i].innerHTML; // the for loop adds the guess to the guessLetters array
        }                                                                                                           // [position+(5*guessNumber)-5+i] determines the correct position

        guess();            // runs the functions after each guess. 
        squareColours();
        usedLetters();
        winLose();  // must call after guess number changes 
        reset(); 
    }

})

//BUTTONS

for(let i=0;i<3;i++){               // event listener using onscreen buttons. 3 rows with 10/9/9 buttons in. 
    for(let j=0;j<document.querySelector(".container2").children[i].children.length;j++){


        document.querySelector(".container2").children[i].children[j].addEventListener("click",function(event){

            if(position <5 && inPlay === true  && document.querySelector(".container2").children[i].children[j] !== document.querySelector(".container2").children[2].children[0] && document.querySelector(".container2").children[i].children[j] !== document.querySelector(".container2").children[2].children[8] ){     // Validating that the button pressed isn't backspace or enter: 
                document.querySelector(".template").children[position+(5*guessNumber)].innerHTML = document.querySelector(".container2").children[i].children[j].innerHTML;                                                                                                                                                 // .children[2].children[0] & .children[2].children[8]
                position+=1;
            }

            else if(position>0 && inPlay === true && document.querySelector(".container2").children[i].children[j] === document.querySelector(".container2").children[2].children[8]){ // validates the button is backspace 
                position-=1;
                document.querySelector(".template").children[position+(5*guessNumber)].innerHTML = ''; //must come after the position change 
            
            }

            else if(position == 5 && inPlay === true && document.querySelector(".container2").children[i].children[j] === document.querySelector(".container2").children[2].children[0]){ // validates the button is enter 

                for(let i = 0;i<5;i++){
                    guessLetters[i] = document.querySelector(".template").children[position+(5*guessNumber)-5+i].innerHTML; //shifts the position to the next line 
                }
    
                guess();
                squareColours();
                usedLetters();
                winLose();// must call after guess number changes 
                reset();
   
            }

        })
        
    }

}


