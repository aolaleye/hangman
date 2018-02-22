
//<--- Hides PLAY button for Game 1 --->
$("#play-1").click(function(){
    $("#get-started").hide();
    $("#play-1").hide();
    //Reveals Game 1
    $(".current-game").show();
}) 

var themes = ['Landscape', 'Outer Space', 'Instruments'];
var words = ['mountain', 'galaxy', 'trombone'];
var word1 = ['m', 'o', 'u', 'n', 't', 'a', 'i', 'n'];
var word2 = ['g', 'a', 'l', 'a', 'x', 'y'];
var word3 = ['t', 'r', 'o', 'm', 'b', 'o', 'n', 'e'];

//<--- Reveals Theme 1 --->
$(".theme").append(themes[0]);

//creates blank spaces for each letter of the word
for (i=0; i < words[0].length; i++) {
$(".each-letter").append("<li> _ </li>");
}






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

// //<--- Reveals Theme 2 --->
// $(".theme").append(themes[1]);

// //<--- Reveals Theme 3 --->
// $(".theme").append(themes[2]);

