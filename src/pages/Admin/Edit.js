import { useEffect, useMemo, useReducer } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { editQuestion } from "./api";
import { questionReducer } from "./reducer";

const Edit = () => {
    const { questionId } = useParams();
    const questions = useSelector((state) => state.exam.questions);
    const question = useMemo(() => {
        return questions.find(q => q.id === parseInt(questionId));
    }, [questionId, questions]);

    const [questionData, dispatch] = useReducer(questionReducer, question);
    useEffect(() => {
        dispatch({ type: "SET_QUESTION", payload: question });
    }, [question]);

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
        editQuestion(questionId, questionData);
        alert('Question updated successfully!')
        window.location.href = "/admin";
    };

    return (
        <div className="container m-5">
            <Link to="/admin" className="btn btn-secondary mb-5">Admin</Link>
            <h1>Edit Question</h1>

            <form>
                <div className="mb-3">
                    <div className="form-group">
                        <label htmlFor="question" className="form-label">Question</label>
                        <textarea
                            className="form-control"
                            id="question"
                            rows="3"
                            defaultValue={question?.text}
                            onChange={onQuestionTextChange}></textarea>
                    </div>

                    {
                        question?.answers.map(({ id, text }, index) => (
                            <div className="form-group mb-3 mt-3" key={id}>
                                <label htmlFor="answer1" className="form-label">Answer {index + 1}</label>
                                <input type="text" className="form-control" id="answer1" defaultValue={text} onChange={(e) => onAnswerTextChange(e, index)} />
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

export default Edit;