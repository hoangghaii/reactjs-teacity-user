import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";

const rootReducer = {
	product: productReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
