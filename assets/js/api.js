$(document).ready(function() {
  $("#addTopicBtn").on("click", function() {
    topic = $("#topicInput").val();
    $('#buttonOutput').append('<button id="topicBtn" class="btn btn-block-custom" data-topic="' + topic + '"">' + topic + '</button>')
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
        $('#gifOutput').append("<div class='card gif-block my-2' id='gif"+topic +"'></div>")
        $("#gif"+topic).append("<div class='card-header'>Topic : "+ topic +"</div>");
         $("#gif"+topic).append("<div class='card-block  p-2'></div>");
        var result = response.data;
        for (i = 0; i < 10; i++) {
          var img = $("<img class='figure-img mx-1'>");
          var imageUrl = result[i].images.fixed_height_small.url;
          var imageStill = result[i].images.fixed_height_small_still.url;
          var figure = $("<figure class='figure "+i+"'></figure>")
          //
          img.attr("src", imageStill);
          img.attr("alt", "gif" + topic);
          img.addClass("gifToggle");
          img.attr("data-still", imageStill);
          img.attr("data-animate", imageUrl)
          //
          $("#gif"+topic+" .card-block").append(figure);
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
