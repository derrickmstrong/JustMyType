$(function () {
  let sentences = [
    'ten ate neite ate nee enet ite ate inet ent eate',
    'Too ato too nOt enot one totA not anot tOO aNot',
    'oat itain oat tain nate eate tea anne inant nean',
    'itant eate anot eat nato inate eat anot tain eat',
    'nee ene ate ite tent tiet ent ine ene ete ene ate',
  ];

  let count = 0;

  $('#sentence').html(sentences[count]);

  // FIXME: The count should increment once you get to the end of the sentence therefore there should be a check that will conditionally loop this forEach
  // String(sentences[count])
  //   .split('')
  //   .forEach((el) =>
  //     $('#sentence').append(function () {
  //       const characterSpan = document.createElement('span');
  //       characterSpan.innerText = el;
  //       return characterSpan;
  //     })
  //   );

  let charCount = 0;
  let nudge = 15;

  $(document).keypress(function (e) {
    if (count === 5) {
      return;
    }
    charCount++;
    console.log(charCount);
    // End of Sentence
    if (charCount === sentences[count].length + 1) {
      console.log('Sentences Count: ', count);
      count++;
      nudge = 15;
      charCount = 0;
      $('#sentence').html(sentences[count]);
    }  
    // FIXME: The if condition only checks if a key has been pressed but its not reacting to the specific keys of the sentence above yet
    if (e.which == e.keyCode) {
      console.log(e.key);
      $('#' + e.keyCode).toggleClass('highlight-key');
      $('#yellow-block').css({
        left: nudge,
      });
      // FIXME: Tht #yellow-block moves but its size and spacing is off
      nudge += 17;
      // TODO: Show the next expected letter in the sentence above else nothing
      // $('#target-letter').append(function () {
      //   if (condition) {
      //   } else {
      //   }
      // });
      // TODO: Show visual log of correct vs incorrect has been set up but if statements below are incomplete
      // $('#feedback').append(function () {
      //   if ('end of sentence') {
      //   } else if ('correct') {
      //   } else if ('incorrect') {
      //   }
      // });
    }
  });
  // TODO: Create End of Typing Test logic

  // TODO: Create Play Again logic

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
