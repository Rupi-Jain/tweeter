
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

function createTweetElement(userTweet) {

  let text = escape(userTweet.content.text);
  const tweet = `   
    <article class = "user-tweets">
      <header>
        <span><img src="${userTweet.user.avatars}"></img></span>
        <span class="tweet-uname">${userTweet.user.name}</span>            
        <span class="tweet-handle">${userTweet.user.handle}</span>
      </header>
      <p>${text}</p>
      <footer>
        <span>${timeago.format(userTweet.created_at)}</span>
        <div class="tweet-images">
          <i class="fas fa-heart space-in-images"></i>
          <i class="fas fa-retweet space-in-images"></i>
          <i class="fas fa-flag space-in-images"></i>
        </div>          
      </footer>                     
    </article>  ` 
  return tweet;
}

const renderTweets = function(tweets) {
  for (let tweet of tweets.reverse()) {
    $('.tweet-container').append(createTweetElement(tweet));
  }
}

const loadTweets = () => {
  $.ajax({
    url: `/tweets`,
    method: 'GET',
    dataType: 'JSON'
  }).then(function(response) {
    console.log(response);
    $('.tweet-container').empty();
    renderTweets(response);
  })
}

$(document).ready(function() { 
  $("#tweet-text").focus();

  $("form").on("submit", function (event) {
    
    event.preventDefault();
   
    if (!event.target['tweet-text'].value) {
      return $(".error-msgs").text("Post cannot be empty!").slideDown().show();
    }
    if ((event.target['tweet-text'].value).length > 140) {
      return $(".error-msgs").text("Post cannot exceed over 140 character limit!").slideDown().show();
    }

    const data = $(this).serialize();
    const jqxhr = $.post("/tweets",data);
    jqxhr.done(function(result){
      loadTweets();  
      event.target['tweet-text'].value = '';
      event.target['counter'].value = 140;
    })
    jqxhr.fail(function(){
      console.log("fail");
    })
    jqxhr.always(function(){
      console.log("ajax complete");
    })
  });
  loadTweets();
});
