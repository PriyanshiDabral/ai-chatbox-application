import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendMessageAPI } from "../services/api";

export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async (message, { rejectWithValue }) => {
        try {
            const response = await sendMessageAPI(message);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to get a response. Please try again.");
        }
    }
);

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: [],
        loading: false,
        error: null,
    },
    reducers: {
        addUserMessage: (state, action) => {
            state.messages.push({ role: "user", content: action.payload });
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear previous error on new request
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.messages.push({ role: "ai", content: action.payload });
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false;
                // Use the specific error from rejectWithValue, or a fallback
                state.error = action.payload || "An unexpected error occurred. Please try again.";
            });
    },
});

export const { addUserMessage, clearError } = chatSlice.actions;
export default chatSlice.reducer;