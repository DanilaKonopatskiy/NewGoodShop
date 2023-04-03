import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartServiceApi } from "../../api/CartService.api";

export const getCart = createAsyncThunk(
	'cart/getCart',
	async (_, thunkAPI) => {
		try {
			return await new CartServiceApi().getCart();
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	},
);

export const addToCart = createAsyncThunk(
	'cart/addToCart',
	async (payload, thunkAPI) => {
		try {
			return await new CartServiceApi().addToCart(payload);
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	},
)

export const clearCart = createAsyncThunk(
	'cart/clearCart',
	async (cb, thunkAPI) => {
		try {
			const result = await new CartServiceApi().clearCart();
			cb();
			return result;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	},
);