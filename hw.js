$(document).on('ready', function() {
    //initial of array of things that make me happy
    var topics = ["kittens", "puppies", "Beyonce", "friendship", "hugs"];

    //function to make buttons in top of the page container.
    var makeButton = function(item, index) {
        var a = $('<button class=' + 'giphyButton' + ' ' + 'data-name=' + topics[index] + '>' + item + '</button>');
        $('#happinessButtons').append(a);
    };
    //initial function call: for each element in the topics array, make a button. 
    topics.forEach(makeButton);

    //takes input from textbox and makes a new button
    $('#addHappy').on('click', function() {
        var happiness = $('#happy-input').val().trim();
        topics.push(happiness);
        $('#happinessButtons').empty();
        topics.forEach(makeButton);
        return false;
    });

    //function to display 10 GIPHYs with their ratings on the page in their respective containers.
    var tenGiphys = function() {
        var d = $('<div>');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + clickedHappiness + "&api_key=dc6zaTOxFJmzC'&limit=10";


        //     //gets data attribute and replaces all spaces with + for API search query syntax.
        var clickedHappiness = $(this).attr('data-name'); //.replace(/ /g, "+");
        console.log("hello", clickedHappiness);


        $.ajax({
            url: queryURL,
            method: 'GET'
        });

        .done(function(response) {
            result = response.data;

            //         //constructs and places GIHPYs in divs.

        });
    };

    //         // YOUR CODE GOES HERE!!!
    //         // HINT: You will need to create a new div to hold the JSON.



    //     });


    //When a user clicks on a button, 
    $('.giphyButton').on('click', tenGiphys);







});
