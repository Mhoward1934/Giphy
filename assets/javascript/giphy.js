// Initial array of giphys
var topics = ["funny", "whatever", "laughing"];

//Display GiphyInfo function re-render the HTML to display the appropriate content
function displayGiphyInfo() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=V2w984oZdTWn5V7V54Zc4fLwoy2kkM6u&limit=10&rating=G";

    //Created AJAX to call for the specfic giphy
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            giphy = topic[i];

            //Creating the div to hold the giphy
            var topicDiv = $("<div class='topic'>");

            //Store the rating data
            var rating = response.data[i].rating;
            var title = response.data[i].title;

            //Create an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);
            var pTwo = $("<p>").text("Title: " + title);

            //Displaying the rating
            topicDiv.append(pOne, pTwo);
            //topicDiv.append(pTwo);

            //Getting the giphy image
            var imgURL = response.data[i].images.original.url;

            // Creating an element to hold the image
            var images = $("<img>").attr("src", imgURL);

            // Appending the image
            topicDiv.prepend(images);

            //Putting giphys in the html
            $("#laughs-view").append(topicDiv);
        }
    });
}

// Function for displaying giphy data
function renderButtons() {

    // Deleting the giphy buttons prior to adding new giphy buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#laughs").empty();

    // Looping through the array of giphys
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each topic in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("giphy");
        // Adding a data-attribute with a value of the topics at index i
        a.attr("data-name", topics[i]);
        // Providing the button's text with a value of the topics at index i
        a.text(topics[i]);
        // Adding the button to the HTML
        $("#laughs").append(a);
    }
}
// 4. Still needed====>This function pauses and animates the gif
// 6. Still need===>Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

// This function handles events where one button is clicked
$("#add-giphy").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    event.preventDefault();

    // This line will grab the text from the input box
    var topic = $("#giphy-input").val().trim();
    // The topic from the textbox is then added to the array
    topics.push(topic);

    // calling renderButtons which handles the processing of our topics array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "giphy-btn"
$(document).on("click", ".giphy", displayGiphyInfo);

// Calling the renderButtons function at least once to display the initial list of topics
renderButtons();