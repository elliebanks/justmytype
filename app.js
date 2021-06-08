$(document).ready(function () {
    let upperKB = $('#keyboard-upper-container');
    let lowerKB = $('#keyboard-lower-container');
    let blockPosition = 0; //sets the beginning point of the highlight block
    let sentenceCount = 0;
    let letterCount = 0;
    const numWords = 54; //total number of words in the array
    let numMistakes = 0; //count will go up if wrong item is pressed

    let sentences = [
        "ten ate neite ate nee enet ite ate inet ent eate",
        "Too ato too nOt enot one totA not anot tOO aNot",
        "oat itain oat tain nate eate tea anne inant nean",
        "itant eate anot eat nato inate eat anot tain eat",
        "nee ene ate ite tent tiet ent ine ene ete ene ate",
        
    ];

    let sentDiv = $('#sentence')
    let target = $('#target-letter')
    let yellowBlock = $('#yellow-block');

    let lastSentence = sentences[4]; //the game will end after 4th sentence. There are 4 sentences because of the 0 index.
    let feedbackDiv = $('#feedback');
    let gameStart = $.now();

    target.append(sentences[sentenceCount][letterCount]); //displays the current letter to be pressed in the html
    sentDiv.append(sentences[sentenceCount]); //displays the current sentence to be typed in the html


    //lowercase keyboard should be the only one displayed when the page loads. 
    //Write code to hide the uppercase keyboard when the page loads.
    upperKB.hide();

    /*Write jQuery code to set up keyboard toggling:
    While the shift key is held down, hide the lowercase keyboard and show the uppercase one
    When the shift key is released, show the lowercase keyboard and hide the uppercase one*/
    $(document).one('keydown', function () {
        gameStart
        console.log('Start Game!');
    });

    /*For each sentence, show a visual "log" of right/wrong per character.
    If correct key use green check, if wrong key use red X*/
    //HINT: For the green checks and red X, use Bootstrap glyphicons for 'ok' and 'remove'.
    $(document).keydown(function (event) {
        if (event.keyCode == 16) { //16 chooses the SHIFT key
            lowerKB.hide(); //when SHIFT key is held, lower keyboard will be hidden
            upperKB.show(); //when SHIFT key is held, upper keyboard will be shown
        }
        //$(document).keydown(function (event) {
        if (event.key == sentences[sentenceCount][letterCount]) {
            letterCount++;
            blockPosition = blockPosition + 17.5;
            feedbackDiv.append('<span class="glyphicon glyphicon-ok">');
            // console.log(event); //not sure about this part...
            yellowBlock.css("margin-left", `${blockPosition}px`)
            // console.log(letterCount);
            target.empty();
            target.append(sentences[sentenceCount][letterCount]);

        } else if (event.key !== sentences[sentenceCount][letterCount]) {
            feedbackDiv.append('<span class="glyphicon glyphicon-remove">');
            myMistakes();
        }
    });




    //highlight the currently expected letter in the on-screen sentence that should be typed next
    $(document).keypress(function (event) {
        $(`#${event.keyCode}`).css("background-color", "#FFFF00"); //will highlight the current letter being typed
        $(document).keyup(function (event) {
            let asciiLetter = event.key.charCodeAt(0)
            if (event.keyCode == 16) {
                lowerKB.show();
                upperKB.hide();
            }
            $(`#${asciiLetter}`).css("background-color", "#f5f5f5"); //returns background of keys to original color




        });
        /*  
                 blockPosition += 17.5; //same as blockPosition = blockPosition+17.5px. Sets the distance of nudging highlight 
                 $('#yellow-block').css('margin-left', blockPosition + 'px'); //nudges the highlight block along the sentence. (Use 'Left' because the yb position is 'absolute')
                 */

        //  letterCount += 1; //same as currentLetter = currentLetter+1. With each keypress you will move over 1 letter
    });

    $(document).keyup(function () {
        if (sentenceCount >= sentences.length) {
            newGame();
        } else {
            if (letterCount === sentences[sentenceCount].length) { //when the letter count has reached the end of the
                //current sentence this will trigger the function to put the next sentence in place
                makeSentence();
            }
        }
    })

    //Once sentence is completed, next sentence in array will be displayed one at a time
    function makeSentence(event) {
        sentenceCount++; //next sentence in array
        feedbackDiv.empty();
        letterCount = 0; //resets the letter counter at zero for new sentence
        sentDiv.empty(); //sentence will be cleared
        sentDiv.append(sentences[sentenceCount]); //new senetence will be added
        blockPosition = 0; //puts highlighter back at the beginning of the sentence
        yellowBlock.css("margin-left", 0);
    };



    function myMistakes() {
        numMistakes++;
        console.log(numMistakes);
    };


    // numWords / minutes - 2 * numMistakes
    function newGame() {
        let gameEnd = $.now();
        // console.log(gameEnd); //this will show the time when the game is finished
        let minutes = (gameEnd - gameStart) / 6000; //convert to minutes in order to calculate score 
        let score = numWords / Math.round(minutes) - 2 * numMistakes;
        let results = (`<div> You typed ${score} words per minute! Would you like to play again?</div>`)
        console.log(numWords, Math.round(minutes), numMistakes);
        target.empty();
        let resetButton = ('<button id="reset">Yes plz!</button>');
        let cancelButton = ('<button id="cancel">No thx!</button>');
        feedbackDiv.append(results);
        feedbackDiv.append(resetButton);
        feedbackDiv.append(cancelButton);
        cancelButton.click(function () {
            let img = $('<img src="http://clipart-library.com/images/BcgE88XLi.jpg">')
            feedbackDiv.append(img)
        });
        resetButton.click(function () {
            window.location.reload();
        });

    };


});





















