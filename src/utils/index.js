export const checkExamResult = (questions, answers) => {
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unanswered = 0;
    questions.forEach(({ id: questionId, correctAnswer }) => {
        if (answers[questionId] === correctAnswer) {
            correctAnswers++;
        } else if (answers[questionId] === undefined) {
            unanswered++;
        } else {
            incorrectAnswers++;
        }
    });
    return {
        correctAnswers,
        incorrectAnswers,
        unanswered,
    };
};