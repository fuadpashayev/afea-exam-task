import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchQuestions = createAsyncThunk('exam/fetchQuestions', async () => {
    const questionsResponse = await fetch('http://localhost:3001/questions');
    const questions = await questionsResponse.json();
    return questions;
});

const examSlice = createSlice({
    name: "exam",
    initialState: {
        questions: [],
        status: 'idle',
        error: null
    },
    reducers: {
        // Add your reducers here
    },
    extraReducers: builder => {
        builder.addCase(fetchQuestions.pending, (state) => {
            state.status = 'loading';
        });

        builder.addCase(fetchQuestions.fulfilled, (state, action) => {
            state.questions = action.payload;
        });
        
        builder.addCase(fetchQuestions.rejected, (state, action) => {
            state.error = action.error.message;
        });
    }
});

export const { /* Add your actions here */ } = examSlice.actions;

export default examSlice.reducer;
export { fetchQuestions };