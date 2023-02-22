import { useReducer } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addQuestion } from "./api";
import { INITIAL_STATE, questionReducer } from "./reducer";

const Add = () => {
    const questionId = useSelector((state) => state.exam.questions.length);
    const [questionData, dispatch] = useReducer(questionReducer, {...INITIAL_STATE, id: questionId});

    const onQuestionTextChange = (e) => {
        dispatch({ type: "SET_QUESTION", payload: { text: e.target.value } });
    };

    const onAnswerTextChange = (e, index) => {
        dispatch({ type: "SET_ANSWER", payload: { text: e.target.value, index } });
    };

    const onCorrectAnswerChange = (e) => {
        dispatch({ type: "SET_CORRECT_ANSWER", payload: parseInt(e.target.value) })
    };

    const onSubmit = () => {
        addQuestion(questionData);
        alert("Question added successfully!");
        window.location.href = "/admin";
    };

    return (
        <div className="container m-5">
            <Link to="/admin" className="btn btn-secondary mb-5">Admin</Link>
            <h1>Add Question</h1>

            <form>
                <div className="mb-3">
                    <div className="form-group">
                        <label htmlFor="question" className="form-label">Question</label>
                        <textarea className="form-control" id="question" rows="3" onChange={onQuestionTextChange}></textarea>
                    </div>

                    {
                        [1,2,3,4].map((answerId, index) => (
                            <div className="form-group" key={answerId}>
                                <label htmlFor="answer1" className="form-label">Answer {answerId}</label>
                                <input type="text" className="form-control" id="answer1" onChange={(e) => onAnswerTextChange(e, index)} />
                            </div>
                        ))
                    }

                    <div className="form-group mb-3 mt-3">
                        <label htmlFor="correctAnswer" className="form-label">Correct Answer</label>
                        <select
                            className="form-select"
                            id="correctAnswer"
                            onChange={onCorrectAnswerChange}>
                            {
                                questionData?.answers?.map(({ id, text }) => (
                                    <option key={id} value={id}>{text}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={onSubmit}>Submit</button>
            </form>
        </div>
    );
};

export default Add;