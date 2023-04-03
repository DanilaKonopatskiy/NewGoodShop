import { AuthServiceApi } from "../../api/AuthService.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const loginUser = (data) => async (dispatch) => {
// 	const authService = new AuthServiceApi();
// 	try {
// 		dispatch(() => AuthSlice.actions.setLoading(true));
//
// 		const response = await authService.login(data);
// 		console.log('response: ', response);
// 		dispatch(() => AuthSlice.actions.setLoading(false));
// 	} catch (error) {
// 		console.log('error: ', error);
// 	}
// };

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
