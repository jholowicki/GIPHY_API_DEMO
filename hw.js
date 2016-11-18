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
        var clickedHappiness = $(this).attr('data-name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + clickedHappiness + "&api_key=dc6zaTOxFJmzC&limit=10";
        $('#happinessGiphys').empty();

        //     //gets data attribute and replaces all spaces with + for API search query syntax.
        //.replace(/ /g, "+");
        console.log("hello", clickedHappiness);

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            result = response.data;
            console.log("hello", result);

            //constructs and places GIHPYs in divs.
            for (var i = 0; i < result.length; i++) {
                var giphyDiv = $('<div class="giphy-div">');
                var rating = result[i].rating;
                var ratingDiv = $('<div class="rating-div">').text('Rating: ' + rating);
                var image = $('<img class="giphy">');
                var giphyAnimate = result[i].images.fixed_height.url;


                //Creates attributes for the animation of GIHPYs

                image.attr('src', giphyAnimate.replace('.gif', '_s.gif'));
                image.attr('data-still', giphyAnimate.replace('.gif', '_s.gif'));
                image.attr('data-animate', giphyAnimate.replace('_s.gif', '.gif'));
                image.attr('data-state', 'still');

                //appends the GIPHY to the divs
                giphyDiv.append(image);
                giphyDiv.append(ratingDiv);

                //append to pre-defined 'giphy area' on DOM
                $('#happinessGiphys').append(giphyDiv);
            }

        });
    };

    $(document).on('click', '.giphy', function() {
        var state = $(this).attr('data-state');

        if (state === 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });

    //When a user clicks on a button, 
    $('.giphyButton').on('click', tenGiphys);


});
