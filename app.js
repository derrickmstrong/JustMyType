$(function () {
  let sentences = ['ten ate', 'Too atot', 'oat itain', 'itant eate', 'nee en'];

  let sentenceIndex = 0;
  let charIndex = 0;
  let move = 15;
  let numberOfMistakes = 0;
  let startTime = null;
  let endTime = null;

  // Display Sentences
  $('#sentence').html(sentences[sentenceIndex]);

  // Set initial Target Letter
  if (charIndex == 0) {
    $('#target-letter').html(sentences[sentenceIndex].charAt(0));
  }

  $(document).keypress(function (e) {
    // Initialize startTime
    if (startTime === null) {
      startTime = Date.now();
    }

    // Check to see if all the sentences have been completed, if so stop everything with return;
    if (sentenceIndex === 5) {
      if (endTime === null) {
        endTime = Date.now();
      }
      console.log(startTime);
      console.log(endTime);
      console.log('NUM OF MISTAKES:', numberOfMistakes);
      let minutes = endTime - startTime;
      minutes /= 60000;
      console.log('MINUTES:', minutes);
      let score = Math.round((54 / minutes) - (2 * numberOfMistakes));
      console.log('SCORE:', Math.round(score));
      console.log('STOP TIMER');
      $('#sentence').html('Your Score is ' + score);

      return;
    }
    // Compare keypress and sentences; if same display check if not display x
    if (e.key === sentences[sentenceIndex].charAt(charIndex)) {
      console.log('CORRECT', sentences[sentenceIndex].charAt(charIndex));
      $('#feedback').append('<i class="glyphicon glyphicon-ok"></i>');
    } else {
      $('#feedback').append('<i class="glyphicon glyphicon-remove"></i>');
      numberOfMistakes++;
    }
    console.log(numberOfMistakes);

    // Display Target Letter
    $('#target-letter').html(sentences[sentenceIndex].charAt(charIndex + 1));

    charIndex++;

    // Check to see if all the sentences have been completed, if so stop everything with return;
    // if (sentenceIndex === 5 && charIndex === sentences[sentenceIndex].length) {
    //   console.log('STOP TIMER')
    // }

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
    // FIXME: Tht #yellow-block moves but its size and spacing is off
    move += 17.5;

    // TODO: Create Play Again logic
    /*
Yeah, that's pretty close to what I did. There's a method called Date.now() that captures the current time in milliseconds since like 1970 or something like that. So what I did was when the game starts, I set a variable equal to Date.now(). Then when the game ends, I set the same variable equal to Date.now() minus the original variable. I'll paste a little snippet of my code to hopefully better illustrate what I mean
9:40
So at game start I just say startTime = Date.now()  then once the game ends I say timeElapsed = Date.now() - startTime; that will give you the total time it took to go through the game in milliseconds, so to turn that into minutes you just need to divide by 60000
New
9:42
As for making it stop on the last keypress, I added another entry to the sentences array that's just the string " " so that I can use an if statement to check if my array is on the 5th index and stop the game when it hits that
9:43
Also, just a friendly heads up, Date.now is capitalized exactly as I'm typing it, it's not camelcase like bascially everything else we use
  */

    // Calculate Score
    // console.log(startTime);
    // console.log(endTime);

    // let minutes = (endTime - startTime) / 60000;
    // let score = 54 / minutes - 2 * numberOfMistakes;
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
