import { AuthServiceApi } from "../../api/AuthService.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async (payload, thunkAPI) => {
		try {
			return await new AuthServiceApi().login(payload);
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	},
);

export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async (payload, thunkAPI) => {
		try {
			return await new AuthServiceApi().register(payload);
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

export const logoutUser = createAsyncThunk(
	'auth/logoutUser',
	async (payload, thunkAPI) => {
		try {
			return await new AuthServiceApi().logout();
		} catch (e) {
			return thunkAPI.rejectWithValue('Something went wrong');
		}
	}
);