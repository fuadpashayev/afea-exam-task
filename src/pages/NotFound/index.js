import { Navigate } from "react-router-dom";

const PageNotFound = () => {
    return <Navigate to="/" replace={true} />;
};

export default PageNotFound;