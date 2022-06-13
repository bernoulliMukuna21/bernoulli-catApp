$(document).on("click", "button.next-question", function (event) {

    $('.answer-options-section').attr("id","allowed-answering");

    $.ajax({
        method: 'GET',
        url: `/test?show_another_question=true`,
        success: function (data) {
            $('.question-section img').attr('src', data.image_url);
            $('#correct_answer').attr('value', JSON.stringify(data.correctAnswer));

            // update options
            $('.answer-options-section ul').empty();

            (data.selectedBreedsOptions).forEach(option => {
                $('<li>'+option.name+'</li>')
                    .appendTo('.answer-options-section ul');
            });
        }
    });
});

$(document).on("click", ".answer-options-section li", function (event) {

    $('.answer-options-section').attr("id","disallowed-answering");

    var clickedElement = event.target;
    const chosenAnswer = clickedElement.innerText.trim();
    const correctAnswer = JSON.parse($('#correct_answer')[0].value).name;

    const allAnswers = [...clickedElement.parentElement.children];
    const indexOfCorrectAnswer = allAnswers.findIndex(singleAnswer => 
        singleAnswer.innerText.trim() === correctAnswer);
    
    $(allAnswers[indexOfCorrectAnswer]).addClass('correctAnswer');
    if(chosenAnswer !== correctAnswer)
        $(this).addClass('wrongAnswer');
});