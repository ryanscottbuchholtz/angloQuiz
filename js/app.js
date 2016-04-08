var questionIndex = 0;
var correctQuestions = [];
var incorrectQuestions = [];

var testUserResponse = function() {
  $('.answers p').click( function() {
    var currentQuestion = questions[questionIndex];
    var answerID = $(this).attr('id');
    if (answerID == currentQuestion.correctAnswer) {
      correctQuestions.push(questionIndex);
      $('.answer').css({'background-color' : '#DCDDD8'});
      $(this).css({'background-color' : '#468966'});
      rightAnswer('Correct');
    }
    else {
      incorrectQuestions.push(questionIndex);
      $(".answer").css({"background-color" : "#DCDDD8"});
      $(this).css({"background-color" : "#D74B4B"});
      rightAnswer('Incorrect');
    }
    $(".answer").css("pointer-events", "none").css('box-shadow', 'none');
    answerDescription();
    nextButton();
    questionIndex +=1;
  });
};


var populateItems = function() {
  appendImage();
  appendQuestion();
  appendAnswers();
};

var appendImage = function() {
  var currentQuestion = questions[questionIndex];
  var html = $('#image-template').html()
                                 .replace(/{{image}}/g, currentQuestion.image)
                                 .replace(/{{imageSource}}/g, currentQuestion.imageSource);
  $('.image').append(html);
};

var appendQuestion = function() {
  var currentQuestion = questions[questionIndex];
  var html = $('#question-template').html()
                                    .replace(/{{question}}/g, currentQuestion.question);
  $('.question').append(html);
};

var appendAnswers = function() {
  var currentQuestion = questions[questionIndex];
  for (i=0; i < currentQuestion.answers.length; i++) {
    var html = $('#answer-template').html()
                                    .replace(/{{id}}/g, i)
                                    .replace(/{{answer}}/g, currentQuestion.answers[i]);
    $('.answers').append(html);
  }
};

var rightAnswer = function(correctOrIncorrect) {
  var currentQuestion = questions[questionIndex];
  var html = $('#answer-feedback-template').html().replace(/{{right-wrong}}/g, correctOrIncorrect);
  $('.answer-feedback').append(html);
  $('.correct-incorrect').addClass(correctOrIncorrect);
};

var answerDescription = function() {
  var currentQuestion = questions[questionIndex];
  var html = $('#answer-feedback-template-2').html()
                                           .replace(/{{wiki-desc}}/g, currentQuestion.answerFeedback)
                                           .replace(/{{link}}/g, currentQuestion.link)
                                           .replace(/{{source}}/g, currentQuestion.answerFeedbackSource);
  $('.answer-feedback').append(html).fadeIn(800);

};

var nextButton = function() {
  if (questionIndex == (questions.length)-1) {
    var html = $('#next-question-template').html()
                                           .replace(/{{button-message}}/g, 'See Results');
    $('.next-question').append(html);
  }
  else {
    var html2 = $('#next-question-template').html()
                                           .replace(/{{button-message}}/g, 'Go to question ' + (questionIndex + 2) + ' of ' + (questions.length));
    $('.next-question').append(html2);
  }
};

var endOfQuestions = function() {
  if ((questionIndex) == questions.length) {
    unpopulateItems();
    $('.answer-feedback').hide();
    $('.question').append('<p class=finale>Congratulations! You finished the quiz.</p>')
                  .append('<p class=finale>You got ' + correctQuestions.length + ' questions correct and missed ' + incorrectQuestions.length + '.</p>')
                  .append('<p class=try-again>Try Again?</p>');
    tryAgain();
  }
};

var unpopulateItems = function() {
  $('#image').remove();
  $('#source').remove();
  $('#question').remove();
  $('.answer').remove();
  $('.correct-incorrect').remove();
  $('.wiki-desc').remove();
  $('.link').remove();
  $('#next-button').remove();
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

$('.next-question').click( function() {
  nextQuestion();
});

var tryAgain = function() {
  $('.try-again').click( function() {
    location.reload(true);
  });
};

populateItems();
testUserResponse();
$('.answer-feedback').hide();


