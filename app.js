$(function () {
  let sentences = [
    'ten ate neite ate nee enet ite ate inet ent eate',
    'Too ato too nOt enot one totA not anot tOO aNot',
    'oat itain oat tain nate eate tea anne inant nean',
    'itant eate anot eat nato inate eat anot tain eat',
    'nee ene ate ite tent tiet ent ine ene ete ene ate',
  ];

  let arrIndex = 0;
  let charIndex = 0;
  let nudge = 15;
  let numberOfMistakes = 0;
  let minutes;

  // Display Sentences
  $('#sentence').html(sentences[arrIndex]);

  // Set initial Target Letter
  if (charIndex == 0) {
    $('#target-letter').html(sentences[arrIndex].charAt(0));
  }

  $(document).keypress(function (e) {
    // Compare keypress and sentences; if same display check if not display x
    if (e.key === sentences[arrIndex].charAt(charIndex)) {
      $('#feedback').append('<i class="glyphicon glyphicon-ok"></i>');
    } else {
      $('#feedback').append('<i class="glyphicon glyphicon-remove"></i>');
      numberOfMistakes++;
    }
    console.log(numberOfMistakes);
    // Display Target Letter
    $('#target-letter').html(sentences[arrIndex].charAt(charIndex + 1));

    // Check to see if all the sentences have been completed, if so stop everything with return;
    if (arrIndex === 5) {
      return;
    }
    charIndex++;
    console.log(charIndex);

    // Check for end of Sentence
    if (charIndex === sentences[arrIndex].length) {
      console.log('Sentences arrIndex: ', arrIndex);
      arrIndex++;
      nudge = 15;
      charIndex = 0;
      $('#feedback').empty();
      $('#sentence').html(sentences[arrIndex]);
    }

    // Check if keypress equal keyboard key
    if (e.which == e.keyCode) {
      console.log(e.key);
      $('#' + e.keyCode).toggleClass('highlight-key');
      $('#yellow-block').css({
        left: nudge,
      });
      // FIXME: Tht #yellow-block moves but its size and spacing is off
      nudge += 17;
    }

    // Calculate Score
    let score = 54 / minutes - 2 * numberOfMistakes;
  });

  // TODO: Create Play Again logic

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
