export const questionReducer = (state, action) => {
    switch (action.type) {
        case "SET_QUESTION":
            return {
                ...state,
                ...action.payload
            };
        case "SET_ANSWER":
            return {
                ...state,
                answers: state.answers.map((a, index) => {
                    if (index === action.payload.index) {
                        return {
                            ...a,
                            text: action.payload.text
                        }
                    }
                    return a;
                })
            };
        case "SET_CORRECT_ANSWER":
            return {
                ...state,
                correctAnswer: action.payload
            };
        default:
            return state;
    }
};

export const INITIAL_STATE = {
    id: 0,
    text: "",
    answers: [
        { id: 1, text: "" },
        { id: 2, text: "" },
        { id: 3, text: "" },
        { id: 4, text: "" }
    ],
    correctAnswer: 0
};