export const editQuestion = (id, data) => {
    try {
        fetch(`http://localhost:3001/questions/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }
};

export const addQuestion = (data) => {
    try {
        fetch(`http://localhost:3001/questions`, {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteQuestion = (id) => {
    try {
        fetch(`http://localhost:3001/questions/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.log(error);
    }
};