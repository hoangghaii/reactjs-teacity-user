import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	sidebarLeftStatus: false,
	sidebarRightStatus: false,
};

const sidebarSlice = createSlice({
	name: "sidebar",
	initialState,
	reducers: {
		changeStateSidebarLeft(state, action) {
			return {
				...state,
				sidebarLeftStatus: action.payload,
			};
		},
		changeStateSidebarRight(state, action) {
			return {
				...state,
				sidebarRightStatus: action.payload,
			};
		},
	},
});

export const { changeStateSidebarLeft, changeStateSidebarRight } =
	sidebarSlice.actions;
export default sidebarSlice.reducer;
