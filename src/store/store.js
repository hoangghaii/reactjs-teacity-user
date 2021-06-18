import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import sidebarReducer from "./slices/sidebarSlice";

const rootReducer = {
	product: productReducer,
	sidebar: sidebarReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
