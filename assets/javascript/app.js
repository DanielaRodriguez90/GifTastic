$(document).ready(function(){
//create buttons array
var topics = ["The Oscars", "The Emmy's", "SAG Awards", "Golden Globes"]

//function to display buttons
function renderButtons() {
    //empty buttons
    $("#buttons-view").empty();

    //loop through array of topics
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>" + topics[i] + "</button>");
        button.addClass("show-button");
        button.attr("data-name", topics[i]);
        button.appendTo("#buttons-view");
    }
}

renderButtons();

//display giphy function

function displayGiph() {

    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=mboPXe7ohFrmyyJ0N0ddAxCfP91LmoQ6&limit=10";
    console.log(queryURL);


    // Creating an AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;
        //loop through the results
        for (var i = 0; i < results.length; i++) {

            var topicDiv = $("<div>");
            var p = $("<p>");
            p.html("Rating: " + results[i].rating.toUpperCase());

            var topicImg = $("<img>");
            //assign still and animate state and url to each giphy
            topicImg.attr("src", results[i].images.fixed_height_still.url);
            topicImg.attr("data-still", results[i].images.fixed_height_still.url);
            topicImg.attr("data-animate", results[i].images.fixed_height.url);
            topicImg.attr("data-state", "still");
            topicImg.addClass("data-img");
            topicDiv.append(topicImg);
            topicDiv.append(p);
            topicDiv.addClass("gif-div");
            console.log(topicDiv)
            $("#gif-view").prepend(topicDiv);
        }
    })
};

//click event changing still to animate
$("#gif-view").on("click", ".data-img", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


//add button click event
$("#add-gifs").on("click", function (event) {
    event.preventDefault();
    var topic = $("#gifs-input").val().trim();
    topics.push(topic);
    renderButtons();
    $("#gifs-input").val("");
});

//document click event listener
$(document).on("click", ".show-button", displayGiph);

});