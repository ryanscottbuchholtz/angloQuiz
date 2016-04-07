var questionCount = 0;
var correctCount = 0;
var correctQuestions = [];
var incorrectQuestions = [];
var incorrectCount = 0;
var currentQuestion = questions[questionCount];  //why will this not update unless placed in the testUserResponse function?

var populateItems = function() {
  $('.image').append('<img src= ' + currentQuestion.image + '>').append('<p>source: ' + currentQuestion.imageSource + '</p>');
  $('.question').append('<p>' + currentQuestion.question + '</p>');
  $('.column-a').append('<p id=0 class="answer">' + currentQuestion.answers[0] + '</p>').append('<p id=1 class="answer">' + currentQuestion.answers[1] + '</p>');
  $('.column-b').append('<p id=2 class="answer">' + currentQuestion.answers[2] + '</p>').append('<p id=3 class="answer">' + currentQuestion.answers[3] + '</p>');
  $('.answer-feedback').hide();
};

var testUserResponse = function() {
  $('.answers p').click( function() {
    var answerID = $(this).attr('id');
    if (answerID == currentQuestion.correctAnswer) {
      correctCount += 1;
      correctQuestions.push(questionCount);
      $('.answer').css({'background-color' : '#DCDDD8'});
      $(this).css({'background-color' : '#468966'});
      $('.answer-feedback').append('<p class="correct-incorrect correct">Correct!</p>');
    }
    else {
      incorrectCount += 1;
      incorrectQuestions.push(questionCount);
      $(".answer").css({"background-color" : "#DCDDD8"});
      $(this).css({"background-color" : "#D74B4B"});
      $('.answer-feedback').append('<p class="correct-incorrect incorrect">Incorrect</p>');
    }

    questionCount +=1;

    $(".answer").css("pointer-events", "none").css('box-shadow', 'none');
    // $(this).css("color", "#f2f2f2").css('box-shadow', '0 15px 20px -12px #354B5E');
    $('.answer-feedback').append('<p class="wiki-desc">' + currentQuestion.answerFeedback + '</p>').append('<a class=link href=' + currentQuestion.link + ' target=_blank>' + '<p id=answer-source>' + currentQuestion.answerFeedbackSource + '</p>' + '</a>').fadeIn(750);
    // $('.correct-count').append('<p>' + correctCount + ' out of ' + (questionCount + 1) + ' correct.</p>');
    
    if (questionCount == questions.length) {
      $('.next-question').append('<p class=results>See Results</p>');
    }
    else {
    $('.next-question').append('<p>' + 'Go to question ' + (questionCount + 1) + ' of ' + (questions.length)  + '</p>');
    }

    currentQuestion = questions[questionCount];

  });
};

var endOfQuestions = function() {
  if (questionCount == questions.length) {
    unpopulateItems();
    $('.answer-feedback').hide();
    $('.question').append('<p class=finale>Congratulations! You finished the quiz.</p>').append('<p class=finale>You got ' + correctCount + ' questions correct and missed ' + incorrectCount + '.</p>').append('<p class=try-again>Try Again?</p>');
    // results();
    tryAgain();
  }
};

var unpopulateItems = function() {
  $('.image').empty();
  $('.question').empty();
  $('.column-a').empty();
  $('.column-b').empty();
  $('.correct-incorrect').remove();
  $('.wiki-desc').remove();
  $('.link').remove();
  $('.next-question').empty();
};

var nextQuestion = function() {
    if (questionCount == questions.length) {
    unpopulateItems();
    endOfQuestions();
  }
  else {
    unpopulateItems();
    populateItems();
    $('.answer-feedback').fadeOut(750);
    testUserResponse();
  }
};

// var results = function() {
//   $('.results').click( function() {

//   });
// };

var tryAgain = function() {
  $('.try-again').click( function() {
    location.reload(true);
  });
};


$('.next-question').click( function() {
  nextQuestion();
});

populateItems();
testUserResponse();


