
//<--- Hides PLAY button for Game 1 --->
$("#play-1").click(function(){
    $("#get-started").hide();
    $("#play-1").hide();
    //Reveals Game 1
    $(".current-game").show();
}) 

var themes = ['"Landscape"', '"Space"', '"Holidays"'];
var revealTheme1 = document.getElementsByClassName("theme").innerHTML = themes[0];





// //<--- Reveals PLAY AGAIN button for Game 2 --->
// $(".current-game").hide();
// $("#get-started").show();
// $("play-2").show();
// $("#play-2").click(function(){
//     $("#get-started").hide();
//     $("#play-2").hide();
//     //Reveals Game 2
//     $(".current-game").show();
// }) 

