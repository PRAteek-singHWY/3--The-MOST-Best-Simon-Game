//arrays to keep a note of game pattern and user cliking pattern which helps their comparison later on
var userClickedPattern = [];
var gamePattern = [];



//button color array//
var buttonColours = ["red", "blue", "green", "yellow"];
$("h1").css("color", "yellow");



// function for playing the sound for the colored_button
function playSound(btnColor) {
    var audio = new Audio('sounds/' + btnColor + '.mp3');
    audio.play();
}




//sound on click
function sound_OnClick() {
    $(".btn").click(function () {
        // $(this) is button being clicked //
        var userColor = $(this).attr("id");
        playSound(userColor);
    })
}
sound_OnClick();



//on clciking the button shows box shadow and then unshadows //
function on_Click_Flashing() {
    $(".btn").click(function () {
        var currentColor = $(this).attr("id");
        $("#" + currentColor).addClass("pressed");
        setTimeout(function () {
            $("#" + currentColor).removeClass("pressed");
        }, 100);
    })
}
on_Click_Flashing();




//initialising level
var level = 0;
//next sequence to
function next_Sequence() {
    //randomly generating the color out of the buttonColors array//
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColor = buttonColours[randomNumber];

    //filling up the game pattern array with these randomly genertaed numbers
    gamePattern.push(randomChosenColor);
    // console.log(gamePattern);//

    // the randomly chosen colored button flashes and then unflashes //
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColor); 
}


//game only begins here when Enter key is pressed//

//detecing the keyboard key when it is pressed and initialising and reseting level to 0 and also restaringt game
$(document).on("keypress",function(event){
    if(event.which === 13){
    count = 1;
    userClickedPattern.length = 0;
    gamePattern.length = 0;

    setTimeout(function(){
        $("h1").text("Level 0");
    },1500)
   
    next_Sequence();
    }

})

 
//on Clicking the Button after seeing the fading out and fading in 
$(".btn").click(function () {
    // $(this) refers to the button which's  being clicked //
    var userColour = $(this).attr("id");
    // user's pattern is being stored here
    userClickedPattern.push(userColour);
    // console.log(userClickedPattern);
    checkAnswer(userColour);
});




//checking if the color of the button clicked is same as the color in the game pattern using **count**
var count  =1;
function checkAnswer(currentColor) {

    if (currentColor === gamePattern[count-1] ) {
        count++;
        console.log("success")
        if (userClickedPattern.length === (gamePattern.length)) {
            userClickedPattern.length = 0;
            count = 1;
            level++;
            $("h1").text("Level " + level);
            setTimeout(function () {

                next_Sequence(), 1000
            })
        } 
    }

    else {
        console.log("wrong");
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        //resetting level to '0' afetr every time game's over
        level = 0 ;
        $("h1").text("Game over press ENTER kEY to start again")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },120);
    }

}




































