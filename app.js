$(function () {
  let sentences = ['ten ate', 'Too atot', 'oat itain', 'itant eate', 'nee en'];

  let sentenceIndex = 0;
  let charIndex = 0;
  let move = 15;
  let wordCount = 10;
  let incorrect = 0;
  let correct = 0;
  let startTime = null;
  let endTime = null;

  // Display Sentences
  $('#sentence').html(sentences[sentenceIndex]);

  // Set initial Target Letter
  if (charIndex == 0) {
    $('#target-letter').html(sentences[sentenceIndex].charAt(0));
  }

  $(document).keypress(function (e) {
    // Compare keypress and sentences; if same display check if not display x
    if (sentenceIndex < 5) {
      if (e.key === sentences[sentenceIndex].charAt(charIndex)) {
        $('#feedback').append('<i class="glyphicon glyphicon-ok"></i>');
        correct++;
      } else {
        $('#feedback').append('💩');
        incorrect++;
      }
      // console.log('Correct;', correct);
      // console.log('Incorrect;', incorrect);
    }

    // Initialize startTime
    if (startTime === null) {
      startTime = new Date();
    }

    // Check to see if all the sentences have been completed, if so, complete end of game steps and stop further sentence checks with return;
    if (sentenceIndex === 5) {
      if (endTime === null) {
        endTime = new Date();
      }

      // Remove cursor
      $('#yellow-block').remove();

      // Evaluate score
      const seconds = Math.floor(
        (endTime.getTime() - startTime.getTime()) / 1000
      );
      const accuracy = Math.floor((correct / (incorrect + correct)) * 100);
      const wpm = Math.floor(wordCount / (seconds / 60));
      const score = Math.floor(correct / (seconds / 60));

      $('#sentence').html(
        `You scored ${score} points (from your correct characters per minute)! You typed ${wordCount} words in ${seconds} seconds at ${wpm} wpm and your accuracy was ${accuracy}%.`
      );

      return;
    }

    // Display Target Letter
    $('#target-letter').html(sentences[sentenceIndex].charAt(charIndex + 1));

    charIndex++;

    // Check for end of Sentence
    if (charIndex === sentences[sentenceIndex].length) {
      console.log('Sentences sentenceIndex: ', sentenceIndex);
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

    // move chars along page
    // $(#yellow-block).animate({ left: '+=17.5px'})
    $('#yellow-block').css({
      left: move,
    });
    move += 17.5;

    // TODO: Create Play Again logic
    
  });

  // Toggle Keyboards
  $(document).keydown(function (e) {
    if (e.which == 16) {
      $('#keyboard-upper-container').toggle();
      $('#keyboard-lower-container').toggle();
    }
  });
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
