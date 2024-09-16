import { createSlice } from "@reduxjs/toolkit";
import { addToCart, clearCart, getCart } from "../actions-creators/cart.actions";

export const initialState = {
	isLoading: false,
	error: '',
	items: [],
};

const name = 'cart';

const slice = createSlice({
	name, initialState,
	reducers: {
		clearError(state) {
			state.error = '';
		},
	},
	extraReducers: {
		[addToCart.pending.type]: (state) => {
			state.isLoading = true;
			state.error = '';
		},
		[addToCart.fulfilled.type]: (state, action) => {
			state.isLoading = false;
			state.items = action.payload;
		},
		[addToCart.rejected.type]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		[clearCart.pending.type]: (state) => {
			state.isLoading = true;
			state.error = '';
		},
		[clearCart.fulfilled.type]: (state) => {
			state.isLoading = false;
			state.items = [];
		},
		[getCart.pending.type]: (state) => {
			state.isLoading = true;
			state.error = '';
		},
		[getCart.fulfilled.type]: (state, action) => {
			state.isLoading = false;
			state.items = action.payload;
		},
		[getCart.rejected.type]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export default slice;