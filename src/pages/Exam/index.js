import { useReducer } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkExamResult } from "utils";
import { getCookie, removeCookie, setCookie } from "utils/cookie";

const examAnswers = getCookie('examAnswers');
const initialState = examAnswers ? JSON.parse(examAnswers) : {};
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_ANSWER":
            const data = { ...state, [action.payload.questionId]: action.payload.answerId };
            setCookie('examAnswers', JSON.stringify(data));
            return data;
        default:
            return state;
    }
};

const Exam = () => {
    const questions = useSelector((state) => state.exam.questions);
    const [answersData, dispatch] = useReducer(reducer, initialState);

    const finishExam = () => {
        const result = checkExamResult(questions, answersData);
        removeCookie('examAnswers');
        alert(' Your result is: ' + result.correctAnswers + ' correct answers, ' + result.incorrectAnswers + ' incorrect answers, ' + result.unanswered + ' unanswered questions.');
        window.location.reload();
    }

    return (
        <div className="container m-5">
            <h1 className="mb-3">Exam</h1>
            <Link to="/admin" className="btn btn-secondary mb-5">Admin</Link>
            <div>
                {questions.map(({ id: questionId, text: questionText, answers }) => (
                    <div key={questionId} className="mb-3">
                        <h5>{questionId}. {questionText}</h5>
                        {answers.map(({ id: answerId, text: answerText }) => (
                            <div key={answerId}>
                                <input
                                    onChange={() => dispatch({ type: "SET_ANSWER", payload: { questionId, answerId } })}
                                    id={`${questionId}-${answerId}`}
                                    type="radio"
                                    name={`${questionId}`}
                                    value={answerId}
                                    className="me-1"
                                    checked={answersData[questionId] === answerId} />
                                <label htmlFor={`${questionId}-${answerId}`}>{answerText}</label>
                            </div>
                        ))}
                    </div>
                ))}
                <button className="btn btn-primary" onClick={finishExam}>Finish exam</button>
            </div>
        </div>
    );
};

export default Exam;