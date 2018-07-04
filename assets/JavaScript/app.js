// window.onload = function() {
//     if (window.jQuery) { 
//         alert("Yeah!");
//     } else {
//         alert("Doesn't Work");
//     }
// }
// variables:
var apiKey = "zfluSwDcxvo0mZ1fkUB75SS1cgXGyoet";
var queryURL;
var btnList = ["animals", "sports", "dogs", "movies", "cars"];
var searchTerm;

// Functions:

function displayGifs() {

    searchTerm = $(this).attr("data-term");
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + apiKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            $("<img>")
                .attr("src", response.data[i].images.fixed_height_still.url)
                .attr("data-state", "still")
                .attr("data-still", response.data[i].images.fixed_height_still.url)
                .attr("data-animated", response.data[i].images.fixed_height.url)
                .addClass("gif")
                .prependTo($("#gifsWindow"))
            ;
        }    
    })
}

function renderBtns() {
    $("#btnWindow").empty();

    for (var i = 0; i < btnList.length; i++) {
        $("<button>")
            .addClass("gif_button")
            .attr("data-term", btnList[i])
            .append(btnList[i])
            .appendTo("#btnWindow")
        ;
    }
}

function gifSwitch(){
    if ($(this).attr("data-state")=="still"){
        $(this)
            .attr("data-state", "animated")
            .attr("src", $(this).attr("data-animated"))
        ;
    } else if ($(this).attr("data-state") == "animated") {
        $(this)
            .attr("data-state", "still")
            .attr("src", $(this).attr("data-still"))
    }
}

$(document).ready(function () {

    $("#gifAdd").on("click", function(event) {
        event.preventDefault();
            if ($("#gifInput").val() != "") {
                btnList.push($("#gifInput").val().trim());
                $("#gifInput").val("");
                renderBtns();
            }
    });
    renderBtns ();

    $(document).on("click", ".gif_button", displayGifs);

    $(document).on("click", ".gif", gifSwitch)
    $("#gifsClearBtn").on("click", function() {
        $("#gifsWindow").empty();
    });
    $("#btnClearBtn").on("click", function (){
        btnList = ["animals", "sports", "dogs", "movies", "cars"];
        renderBtns();
    });
});
