var questionIndex = 0;
var correctQuestions = [];
var incorrectQuestions = [];


var populateItems = function() {
  var currentQuestion = questions[questionIndex];
  $('.image').append('<img src= ' + currentQuestion.image + '>').append('<p>source: ' + currentQuestion.imageSource + '</p>');
  $('.question').append('<p>' + currentQuestion.question + '</p>');
  $('.column-a').append('<p id=0 class="answer">' + currentQuestion.answers[0] + '</p>')
                .append('<p id=1 class="answer">' + currentQuestion.answers[1] + '</p>');
  $('.column-b').append('<p id=2 class="answer">' + currentQuestion.answers[2] + '</p>')
                .append('<p id=3 class="answer">' + currentQuestion.answers[3] + '</p>');
  $('.answer-feedback').hide();
};

var appendAnswers = function() {
  for (i=0; i < currentQuestion.answers.length; i++) {
    var html = $('answer-template').html.replace(/{{id}}/g, i).replace(/{{answer}}/g, currentQuestion.answers[i]);
    $('.answers').append(html);
  }
};

var testUserResponse = function() {
  $('.answers p').click( function() {
    var currentQuestion = questions[questionIndex];
    var answerID = $(this).attr('id');
    if (answerID == currentQuestion.correctAnswer) {
      correctQuestions.push(questionIndex);
      $('.answer').css({'background-color' : '#DCDDD8'});
      $(this).css({'background-color' : '#468966'});
      $('.answer-feedback').append('<p class="correct-incorrect correct">Correct!</p>');
    }
    else {
      incorrectQuestions.push(questionIndex);
      $(".answer").css({"background-color" : "#DCDDD8"});
      $(this).css({"background-color" : "#D74B4B"});
      $('.answer-feedback').append('<p class="correct-incorrect incorrect">Incorrect</p>');
    }

    questionIndex +=1;

    $(".answer").css("pointer-events", "none").css('box-shadow', 'none');
    // $(this).css("color", "#f2f2f2").css('box-shadow', '0 15px 20px -12px #354B5E');
    $('.answer-feedback').append('<p class="wiki-desc">' + currentQuestion.answerFeedback + '</p>')
                         .append('<a class=link href=' + currentQuestion.link + ' target=_blank>' + '<p id=answer-source>' + currentQuestion.answerFeedbackSource + '</p>' + '</a>')
                         .fadeIn(750);
    // $('.correct-count').append('<p>' + correctCount + ' out of ' + (questionCount + 1) + ' correct.</p>');
    
    if (questionIndex == questions.length) {
      $('.next-question').append('<p class=results>See Results</p>');
    }
    else {
    $('.next-question').append('<p>' + 'Go to question ' + (questionIndex + 1) + ' of ' + (questions.length)  + '</p>');
    }


  });
};

var endOfQuestions = function() {
  if ((questionIndex) == questions.length) {
    unpopulateItems();
    $('.answer-feedback').hide();
    $('.question').append('<p class=finale>Congratulations! You finished the quiz.</p>')
                  .append('<p class=finale>You got ' + correctQuestions.length + ' questions correct and missed ' + incorrectQuestions.length + '.</p>')
                  .append('<p class=try-again>Try Again?</p>');
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
    if ((questionIndex) == questions.length) {
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


