import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../actions-creators/auth.actions";

export const initialState = {
    isLoading: false,
    isAuthed: false,
    token: '',
    login: '',
    error: '',
};

const name = 'auth';

const slice = createSlice({
    name, initialState,
    reducers: {
        clearError(state) {
            state.error = '';
        },
    },
    extraReducers: {
        [loginUser.pending.type]: (state, action) => {
            state.isLoading = true;
            state.error = '';
        },
        [loginUser.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.isAuthed = !!action.payload.token;
            state.token = action.payload.token;
            state.login = action.payload.login;

            // localStorage.setItem('auth', JSON.stringify({
            //     login: state.login,
            //     token: state.token,
            // }));
        },
        [loginUser.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.isAuthed = false;
            state.token = '';
            state.login = '';

            localStorage.removeItem('auth');
        },
        [registerUser.pending.type]: (state) => {
            state.isLoading = true;
            state.error = '';
        },
        [registerUser.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = '';
        },
        [registerUser.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

export default slice;