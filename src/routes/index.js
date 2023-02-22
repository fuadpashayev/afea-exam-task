import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Exam from "pages/Exam";
import NotFound from "pages/NotFound";
import Admin from "pages/Admin";
import Edit from "pages/Admin/Edit";
import Add from "pages/Admin/Add";
import { fetchQuestions } from "state/modules/examSlice";

const Router = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchQuestions());
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Exam />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/edit/:questionId" element={<Edit />} />
                <Route path="/admin/add" element={<Add />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;