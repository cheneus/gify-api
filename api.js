$(document).ready(function() {
  $("#addTopicBtn").on("click", function() {
    topic = $("#topicInput").val();
    $('#buttonOutput').append('<button id="topicBtn" class="btn btn-block"data-topic="' + topic + '"">' + topic + '</button>')
  });
  $(document).on("click", "button[id='topicBtn']", function() {
    var topic = $(this).data("topic");

    console.log(topic)
    //where to get the images
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8xtUZq3kbS6VZpOnKfUGZ4vCScm3Nh9r&q=" + topic;

    //method of the API
    $.ajax({
        url: queryURL,
        method: "GET"
      })

      // making sure the method is done before proceeding
      .done(function(response) {
        console.log(response);
        // response
        $('#gifOutput').append("<div class='gif-block' id='gif"+topic +"'></div>")
        var result = response.data;
        for (i = 0; i < 10; i++) {
          var img = $("<img class='figure-img'>");
          var imageUrl = result[i].images.fixed_height_small.url;
          var imageStill = result[i].images.fixed_height_small_still.url;
          var figure = $("<figure class='figure "+i+"'></figure>")
          //
          img.attr("src", imageUrl);
          img.attr("alt", "gif" + topic);
          img.addClass("gifToggle");
          img.attr("data-still", imageStill);
          img.attr("data-animate", imageUrl)
          //
          $("#gif"+topic).append(figure);
          figure.append(img);
          figure.append("<figcaption class='figure-caption'>Rating: "+result[i].rating+"</figcaption>");
        }
      })
    // var imageUrl = response.data.url;

    // img tag

  });
  $(document).on('click', ".gifToggle", function(){
    var src = ($(this).attr("src") == $(this).data("animate"))
                ? $(this).data("still") 
                : $(this).data("animate");
  $(this).attr("src", src);
  })
});