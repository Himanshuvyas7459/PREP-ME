import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generateInterviewQuestions } from "./questionService.js";

const initialState = {
  allQuestions: [],
  questionsLoading: false,
  questionsSuccess: false,
  questionsError: false,
  questionsErrorMessage: "",
};

export const getQuestions = createAsyncThunk(
  "FETCH/QUESTIONS",
  async (formData, thunkAPI) => {
    try {
      const response = await generateInterviewQuestions(formData);

      console.log("Raw Gemini response:", response);

      let parsedData = [];

      // If already array
      if (Array.isArray(response)) {
        parsedData = response;
      }

      // If string → parse safely
      else if (typeof response === "string") {
        try {
          parsedData = JSON.parse(response);
        } catch (err) {
          console.error("JSON Parse Failed:", err);

          const cleaned = response
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

          try {
            parsedData = JSON.parse(cleaned);
          } catch (err2) {
            console.error("Cleaned JSON failed:", err2);
            return thunkAPI.rejectWithValue("Invalid AI response format");
          }
        }
      }

      // Final check
      if (!Array.isArray(parsedData)) {
        return thunkAPI.rejectWithValue("Response is not an array");
      }

      return parsedData;
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue(
        error?.message || "Failed to fetch questions"
      );
    }
  }
);

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    clearQuestions(state) {
      state.allQuestions = [];
      state.questionsSuccess = false;
      state.questionsError = false;
      state.questionsErrorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.questionsLoading = true;
        state.questionsSuccess = false;
        state.questionsError = false;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.questionsLoading = false;
        state.questionsSuccess = true;
        state.questionsError = false;
        state.allQuestions = action.payload || [];
        state.questionsErrorMessage = "";
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.questionsLoading = false;
        state.questionsSuccess = false;
        state.questionsError = true;
        state.allQuestions = [];
        state.questionsErrorMessage =
          action.payload || "Something went wrong";
      });
  },
});

export const { clearQuestions } = questionSlice.actions;
export default questionSlice.reducer;
