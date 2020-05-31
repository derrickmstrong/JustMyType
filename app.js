$(function () {
  let sentenceIndex = 0;
  let charIndex = 0;
  let move = 50;
  let wordCount = 57;
  let incorrect = 0;
  let correct = 0;
  let startTime = null;
  let endTime = null;

  let sentences = [
    `So I typed a text to a girl I used to see`,
    `Sayin’ that I chose this cutie pie with whom I wanna be`,
    `And I apologize if this message gets you down`,
    `Then I CC’ed every girl that I’d see-see ’round town`,
    `And hate to see y’all frown, but I’d rather see her smilin' - Andre 3000`,
  ];

  // Styles
  $('#97').css({
    backgroundColor: 'purple',
    color: 'white',
  });
  $('#110').css({
    backgroundColor: 'purple',
    color: 'white',
  });
  $('#100').css({
    backgroundColor: 'purple',
    color: 'white',
  });
  $('#114').css({
    backgroundColor: 'purple',
    color: 'white',
  });
  $('#101').css({
    backgroundColor: 'purple',
    color: 'white',
  });
  $('#51').css({
    backgroundColor: 'purple',
    color: 'white',
  });
  $('#48').css({
    backgroundColor: 'purple',
    color: 'white',
  });

  $('#79').css({
    backgroundColor: 'purple',
    color: 'white',
  });
  $('#85').css({
    backgroundColor: 'purple',
    color: 'white',
  });
  $('#84').css({
    backgroundColor: 'purple',
    color: 'white',
  });
  $('#75').css({
    backgroundColor: 'purple',
    color: 'white',
  });
  $('#65').css({
    backgroundColor: 'purple',
    color: 'white',
  });
  $('#83').css({
    backgroundColor: 'purple',
    color: 'white',
  });
  $('#71').css({
    backgroundColor: 'purple',
    color: 'white',
  });



  // Display Sentences
  $('#sentence').html(sentences[sentenceIndex]);

  // Set initial Target Letter
  if (charIndex == 0) {
    $('#target-letter').html(sentences[sentenceIndex].charAt(0));
  }

// ON KEYPRESS
  $(document).keypress(function (e) {
    // Start audio
    let andre3000 = document.querySelector('#andre3000')
    andre3000.play();

    // Compare keypress and sentences; if same display check if not display x
    if (sentenceIndex < 5) {
      if (e.key === sentences[sentenceIndex].charAt(charIndex)) {
        $('#feedback').append('🎤');
        correct++;
      } else {
        $('#feedback').append('😡');
        incorrect++;
      }
    }
    
    // Initialize startTime
    if (startTime === null) {
      startTime = new Date();
    }
    
    // Check to see if all the sentences have been completed, if so, complete end of game steps and stop further sentence checks with return;
    if (sentenceIndex === 5) {
      // End audio
      $('#andre3000').trigger('pause');
      // $('#andre3000').currentTime = 0;

      // Remove cursor
      $('#yellow-block').remove();

      // Check for endTime
      if (endTime === null) {
        endTime = new Date();
      }

      // Evaluate score
      const seconds = Math.floor(
        (endTime.getTime() - startTime.getTime()) / 1000
      );

      const accuracy = Math.floor((correct / (incorrect + correct)) * 100);
      const wpm = Math.floor(wordCount / (seconds / 60));
      const score = Math.floor(correct / (seconds / 60));

      // Display Test results
      $('#sentence').html(
        `You scored ${score} points! You typed ${wordCount} words in ${seconds} seconds at ${wpm} wpm and your accuracy was ${accuracy}%.`
      );

      return;
    }

    // Display Target Letter
    if (sentences[sentenceIndex].charAt(charIndex + 1) == ' ') {
      $('#target-letter').html('space');
    } else {
      $('#target-letter').html(sentences[sentenceIndex].charAt(charIndex + 1));
    }

    charIndex++;

    // Check for end of sentence
    if (charIndex === sentences[sentenceIndex].length) {
      sentenceIndex++;
      move = 17.5;
      charIndex = 0;
      $('#feedback').empty();
      $('#sentence').html(sentences[sentenceIndex]);
    }

    // Check if keypress equal keyboard key
    if (e.which == e.keyCode) {
      console.log(e.key);
      $('#' + e.keyCode).toggleClass('highlight-key');
    }

    // Move chars along page
    $('#yellow-block').css({
      left: move,
    });
    move += 17.5;

    // TODO: Create Play Again logic
  });

  // ON KEYDOWN
  // Toggle Keyboards
  $(document).keydown(function (e) {
    if (e.which == 16) {
      $('#keyboard-upper-container').toggle();
      $('#keyboard-lower-container').toggle();
    }
  });
  
  // ON KEYUP
  $(document).keyup(function (e) {
    if (e.which == 16) {
      $('#keyboard-upper-container').toggle();
      $('#keyboard-lower-container').toggle();
    }
    if (e.which == e.keyCode) {
      $('.key').removeClass('highlight-key');
    }
  });
});
