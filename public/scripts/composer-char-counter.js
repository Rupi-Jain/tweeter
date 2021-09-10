$(document).ready(function() {

  $('#tweet-text').on('keyup', function(event) {
     $('.error-msgs').slideUp();
    const $parentSection = $(event.target).closest('section');
    const $counter = $parentSection.find('#counter');
    const counterMaxLength = 140;
    let totalWords = counterMaxLength - this.value.length;
    if (totalWords < 0) {
      $counter.css("color", "red");
    } else {
      $counter.css("color", "black");    
    }
    $counter.val(totalWords);
  });
}); 
