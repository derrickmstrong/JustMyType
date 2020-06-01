$(function () {
  let barsIndex = 0;
  let charIndex = 0;
  let move = 35;
  let wordCount = 55;
  let incorrect = 0;
  let correct = 0;
  let startTime = null;
  let endTime = null;

  let bars = [
    `So I typed a text to a girl I used to see`,
    `Sayin' that I chose this cutie pie with whom I wanna be`,
    `And I apologize if this message gets you down`,
    `Then I CC'ed every girl that I'd see-see 'round town`,
    `And hate to see y'all frown, but I'd rather see her smilin`,
  ];

  // Special (lower) keyboard styles
  $('#97').css({
    backgroundColor: 'rgba(30, 30, 139, 0.85)',
    color: 'white',
  });
  $('#110').css({
    backgroundColor: 'rgba(30, 30, 139, 0.85)',
    color: 'white',
  });
  $('#100').css({
    backgroundColor: 'rgba(30, 30, 139, 0.85)',
    color: 'white',
  });
  $('#114').css({
    backgroundColor: 'rgba(30, 30, 139, 0.85)',
    color: 'white',
  });
  $('#101').css({
    backgroundColor: 'rgba(30, 30, 139, 0.85)',
    color: 'white',
  });
  $('#51').css({
    backgroundColor: 'rgba(67, 241, 44, 0.932)',
    color: 'white',
  });
  $('#48').css({
    backgroundColor: 'rgba(67, 241, 44, 0.932)',
    color: 'white',
  });
  $('#39').css({
    color: 'white',
    backgroundImage: 'url(./images/emoji_andre3000v3.png)',
    backgroundSize: 'cover',
  });

  // Special (upper) keyboard styles
  $('#79').css({
    backgroundColor: 'rgba(30, 30, 139, 0.85)',
    color: 'white',
  });
  $('#85').css({
    backgroundColor: 'rgba(67, 241, 44, 0.932)',
    color: 'white',
  });
  $('#84').css({
    backgroundColor: 'rgba(30, 30, 139, 0.85)',
    color: 'white',
  });
  $('#75').css({
    backgroundColor: 'rgba(67, 241, 44, 0.932)',
    color: 'white',
  });
  $('#65').css({
    backgroundColor: 'rgba(30, 30, 139, 0.85)',
    color: 'white',
  });
  $('#83').css({
    backgroundColor: 'rgba(30, 30, 139, 0.85)',
    color: 'white',
  });
  $('#71').css({
    backgroundColor: 'rgba(67, 241, 44, 0.932)',
    color: 'white',
  });

  // Start Message styles
  $('#start-test').css({
    position: 'relative',
    top: '-30em',
    backgroundColor: 'rgba(30, 30, 139, 0.97)',
    color: 'white',
    zIndex: '10',
  });

  // Display bars
  $('#bars').html(bars[barsIndex]);

  // Set initial Target Letter
  charIndex === 0 ? $('#target-letter').html(bars[barsIndex].charAt(0)) : null;

  // Set initial feedback
  barsIndex < 5 ? $('#feedback').html('<span class="spacer">.</span>') : null;

  /************* 
  ON KEYPRESS
  *************/
  $(document).keypress(function (e) {
    // Remove Start message
    $('#start-test').remove();

    // Start audio
    if (barsIndex === 5) {
      return;
    } else {
      // Set audio volume
      audioVolume(0.5);
      $('#typewriter').trigger('play');
      $('#andre3000').trigger('play');
    }

    // Compare keypress and bars; if same display 🎤 if not display 👎🏾
    if (barsIndex < 5) {
      if (e.key === bars[barsIndex].charAt(charIndex)) {
        $('#feedback').append('🎤');
        correct++;
      } else {
        $('#feedback').append('👎🏾');
        incorrect++;
      }
    }

    // Initialize startTime
    startTime === null ? (startTime = new Date()) : null;

    // Check to see if all the bars have been completed, if so, complete end of game steps and stop further sentence checks with return;
    barsIndex === 5 ? '' : null;

    // Display Target Letter
    bars[barsIndex].charAt(charIndex + 1) == ' '
      ? $('#target-letter').html('space')
      : $('#target-letter').html(bars[barsIndex].charAt(charIndex + 1));

    charIndex++;
    // Check for end of sentence
    if (charIndex === bars[barsIndex].length) {
      barsIndex++;
      move = 17.5;
      charIndex = 0;
      // Add "spacer" to deal with page jump at feedback
      $('#feedback').html('<span class="spacer">.</span>');
      $('#bars').html(bars[barsIndex]);
    }

    // End of typing test | Remove all unnecessary items + Display end of test message
    if (barsIndex === 5) {
      // Stop/Remove audio
      $('#typewriter').remove();
      $('#andre3000').remove();

      // Remove block
      $('#position-block').remove();

      // Remove feedback
      $('#feedback').remove();

      // Animate try again
      $('#target-letter')
        .css({
          opacity: '0',
          cursor: 'pointer',
        })
        .delay(3000)
        .fadeIn()
        .animate({
          fontSize: '15px',
          margin: '1.25em 0',
          padding: '30px 0',
          opacity: '1',
          top: '1em',
        })
        .html(`<input class='btn try-again' type='button' value='Try Again'>`)
        .click(function () {
          location.reload();
        });

      // Remove keyboards
      $('#keyboard-container').remove();

      // Check for endTime
      endTime === null ? (endTime = new Date()) : null;

      // Evaluate score
      const seconds = Math.floor(
        (endTime.getTime() - startTime.getTime()) / 1000
      );

      const accuracy = Math.floor((correct / (incorrect + correct)) * 100);
      const wpm = Math.floor(wordCount / (seconds / 60));
      const score = Math.floor(correct / (seconds / 60));

      // Display Test results
      $('#bars')
        .css({
          textAlign: 'center',
        })
        .html(
          `Source.code gave you ${
            score > 175
              ? '🎤🎤🎤🎤🎤 mics'
              : score < 175 && score >= 150
              ? '🎤🎤🎤🎤 mics'
              : score < 150 && score >= 125
              ? '🎤🎤🎤 mics'
              : score < 125 && score >= 124
              ? '🎤🎤 mics'
              : '🎤 mic'
          } for your performance!
         <br><br>
        You typed ${wordCount} words in ${seconds} seconds at ${wpm} wpm (w/${accuracy}% accuracy)`
        );

      return;
    } else if (charIndex == 0) {
      $('#target-letter').html(bars[barsIndex].charAt(0));
    }

    // Check if keypress equal keyboard key
    if (e.which == e.keyCode) {
      $('#' + e.keyCode).toggleClass('highlight-key');
      $('#lower-left-speaker').toggleClass('speaker');
      $('#lower-right-speaker').toggleClass('speaker');
      $('#upper-left-speaker').toggleClass('speaker');
      $('#upper-right-speaker').toggleClass('speaker');
    }

    // Move block along page
    $('#position-block').css({
      left: move,
    });
    move += 17.5;
  });

  /************* 
  ON KEYDOWN
  *************/
  // Toggle Keyboards
  $(document).keydown(function (e) {
    if (e.which == 16) {
      $('#keyboard-upper-container').toggle();
      $('#keyboard-lower-container').toggle();
    }
  });

  /************* 
  ON KEYUP
  *************/
  // Toggle Keyboards
  $(document).keyup(function (e) {
    if (e.which == 16) {
      $('#keyboard-upper-container').toggle();
      $('#keyboard-lower-container').toggle();
    }
    if (e.which == e.keyCode) {
      $('.key').removeClass('highlight-key');
      $('#lower-left-speaker').removeClass('speaker');
      $('#lower-right-speaker').removeClass('speaker');
      $('#upper-left-speaker').removeClass('speaker');
      $('#upper-right-speaker').removeClass('speaker');
    }
  });
  // Function Declarations
  function audioVolume(num) {
    const typewriterAudio = document.querySelector('#typewriter');
    const andreAudio = document.querySelector('#andre3000');
    typewriterAudio.volume = num;
    andreAudio.volume = num;
  }
});
