import { configureStore } from "@reduxjs/toolkit";
import examReducer from "state/modules/examSlice";

const store = configureStore({
    reducer: {
        exam: examReducer,
    },
});

export default store;