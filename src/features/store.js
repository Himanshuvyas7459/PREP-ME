import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice.js";
import questionReducer from "./questions/questionslice.js";

const store = configureStore({
    reducer: { 
        auth,
        question: questionReducer 
    }
});

export default store;