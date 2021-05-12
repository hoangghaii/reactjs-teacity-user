import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		addCart(state, action) {
			state.push(action.payload);
		},

		updateCart(state, action) {
			const product = action.payload;
			const index = state.findIndex((p) => p.id === product.id);

			return [
				...state.slice(0, index),
				{
					...state[index],
					quantity: product.quantity,
				},
				...state.slice(index + 1),
			];
		},

		removeFromCart(state, action) {
			const product = action.payload;
			const index = state.findIndex((p) => p.id === product.id);

			return state.filter((item) => item !== state[index]);
		},
	},
});

export const { addCart, updateCart, removeFromCart } = productSlice.actions;
export default productSlice.reducer;
