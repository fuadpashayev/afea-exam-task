import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Admin = () => {
    const questions = useSelector((state) => state.exam.questions);

    const deleteQuestion = (id) => {
        deleteQuestion(id);
        alert('Question deleted successfully!')
        window.location.href = "/admin";
    };

    return (
        <div className="container m-5">
            <h1>Admin</h1>
            <Link to="/admin/add" className="btn btn-primary mb-5">Add Question</Link>
            <table className="table table-width">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Question</th>
                        <th scope="col">Answers</th>
                        <th scope="col">Correct Answer</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map(({ id, text, answers, correctAnswer}) => (
                        <tr key={id}>
                            <th scope="row">{id}</th>
                            <td>{text}</td>
                            <td>{answers.map(a => a.text).join(', ')}</td>
                            <td>{answers.find(a => a.id === correctAnswer).text}</td>
                            <td>
                                <Link to={`/admin/edit/${id}`} className="btn btn-primary">Edit</Link>
                                <button className="btn btn-danger ms-1" onClick={() => deleteQuestion(id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;