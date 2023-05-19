
const answers =["arise","force","fully","funny","mixed","rapid","style","think","vital","worst"];
var answer = answers[Math.floor(Math.random() * 10)].toUpperCase();


var guessNumber = 0;
var position = 0;
var allKeys = document.querySelectorAll("button");
var keyboard = "qwertyuiopasdfghjklzxcvbnm";
var keyboardUpper = "QWERTYUIOPASDFGHJKLZXCVBNM";
var count = 0;

var inPlay = true;


const guessLetters = [];
const answerLetters = [];
const greenLetters = [,,,,,]; //commas are placeholders
const notGreen = [,,,,,];
const potentialYellows = [,,,,,];
const yellows = [,,,,,];
//const guessColors = [,,,,,];

const lettersUsed = [];
const allLetters = []; 
const allLettersUpper = [];




function split(word, array){
    for(let i=0; i<word.length; i++){
        array.push(word.slice(i,i+1));
    }
}

function checkGreens(){
    for(let i=0; i<5; i++){
        
        if(guessLetters[i] === answerLetters[i]){ // checking if the letters in the guess word match the letters in the answer
            greenLetters[i] = guessLetters[i];  

            //guessColors[i] = "green";
        }
        else{
            
            notGreen[i] = guessLetters[i];
            potentialYellows[i] = guessLetters[i];
        }
        
    }
    
}

function removeGreens(){
    for (let i = 0; i <notGreen.length;i++){
        for(let j = 0; j <greenLetters.length;j++){
            if (notGreen[i] === greenLetters[j]){
                potentialYellows[i] = "," ;
                
             }
        }
    }

    // return potentialYellows   - dont think its needed anymore
}

function checkYellows (){
    for (let i = 0; i <potentialYellows.length;i++){
        count = 0;
        for(let j = 0; j <answerLetters.length;j++){
            if(potentialYellows[i] === answerLetters[j]){
                yellows[i] = potentialYellows[i];
                count+=1;
             } 
        }

        if(count === 0){
        lettersUsed[i] = potentialYellows[i];  //for the keyboard to color out used letters 
        }
    }
}


// KEYBOARD

document.addEventListener("keyup",function(event){
    

        if(guessNumber <6 && position>=0 && position <5 && validKey(event.key) === true && inPlay === true){
            document.querySelector(".template").children[position+(5*guessNumber)].innerHTML = event.key.toUpperCase();
            position+=1;
        }
            

        //console.log("event key:"+event.key); // put console log at the end to see final result
            //console.log("position:"+position);}

        else if(guessNumber <6 && position>0 && event.key === 'Backspace' && inPlay === true){
            position-=1;
            document.querySelector(".template").children[position+(5*guessNumber)].innerHTML = ''; //must come after the position change 
            
            //console.log("event key:"+event.key);
            //console.log("position:"+position);
            

        }

        else if(guessNumber <6 && position == 5 && event.key === 'Enter' && inPlay === true){
            
            //console.log("greens"+greenLetters);
            //console.log("yellows:"+yellows);
            
            for(let i = 0;i<5;i++){
                guessLetters[i] = document.querySelector(".template").children[position+(5*guessNumber)-5+i].innerHTML; //shifts the position to the next line 
            }

            checkGreens();
            removeGreens();
            checkYellows ();
            
            squareColours();
            usedLetters();

    
            //console.log("greens:" + greenLetters);
            //console.log("yellows:" + yellows);

        
            guessNumber +=1;
            position=0;


            winLose();// must call after guess number changes 

            //console.log("position:"+position);
            //console.log("event key:"+event.key);
            //console.log("guess number:"+guessNumber);

            for(let i = 0;i<5;i++){ // resets each guess
                yellows[i]= ",";
                greenLetters[i]=",";
            }
            
            
        }
    
})



//BUTTONS

for(let i=0;i<3;i++){
    for(let j=0;j<document.querySelector(".container2").children[i].children.length;j++){


        document.querySelector(".container2").children[i].children[j].addEventListener("click",function(event){

            if(guessNumber <6 && position>=0 && position <5 && inPlay === true  && document.querySelector(".container2").children[i].children[j] !== document.querySelector(".container2").children[2].children[0] && document.querySelector(".container2").children[i].children[j] !== document.querySelector(".container2").children[2].children[8] ){
                document.querySelector(".template").children[position+(5*guessNumber)].innerHTML = document.querySelector(".container2").children[i].children[j].innerHTML;
                position+=1;
            }

            else if(guessNumber <6 && position>0 && inPlay === true && document.querySelector(".container2").children[i].children[j] === document.querySelector(".container2").children[2].children[8]){
                position-=1;
                document.querySelector(".template").children[position+(5*guessNumber)].innerHTML = ''; //must come after the position change 
                
                //console.log("event key:"+event.key);
                //console.log("position:"+position);
                
    
            }

            else if(guessNumber <6 && position == 5 && inPlay === true && document.querySelector(".container2").children[i].children[j] === document.querySelector(".container2").children[2].children[0]){
            
                //console.log("greens"+greenLetters);
                //console.log("yellows:"+yellows);
                
                for(let i = 0;i<5;i++){
                    guessLetters[i] = document.querySelector(".template").children[position+(5*guessNumber)-5+i].innerHTML; //shifts the position to the next line 
                }
    
                checkGreens();
                removeGreens();
                checkYellows ();
                
                squareColours();
                usedLetters();
    
        
                //console.log("greens:" + greenLetters);
                //console.log("yellows:" + yellows);
    
            
                guessNumber +=1;
                position=0;
    
    
                winLose();// must call after guess number changes 
    
                //console.log("position:"+position);
                //console.log("event key:"+event.key);
                //console.log("guess number:"+guessNumber);
    
                for(let i = 0;i<5;i++){ // resets each guess
                    yellows[i]= ",";
                    greenLetters[i]=",";
                }
                
                
            }






            //alert(document.querySelector(".container2").children[i].children[j].innerHTML);

            


        })
        
    }

}




function validKey(key){
    for( let i=0;i<allLetters.length;i++){
        if(key === allLetters[i] || key === allLettersUpper[i]){
            return true
        }
    }
}


function winLose(){
    if(greenLetters.toString() === answerLetters.toString()){
        inPlay = false;
        //alert("You win in " + guessNumber + " attempts")
        document.querySelector(".picDiv").children[0].style.display = 'inline';
    }
    if (guessNumber >= 6 && greenLetters.toString() !== answerLetters.toString()){
        document.querySelector(".picDiv").children[1].style.display = 'inline';
        //alert("better luck next time");
    }
}



function squareColours(){
    for(let i = 0; i<5; i++){
        if(validKey(yellows[i]) === true){
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

function usedLetters(){
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

