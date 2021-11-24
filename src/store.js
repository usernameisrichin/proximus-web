import { configureStore } from "@reduxjs/toolkit";
import deviceReducer from "./features/devices/deviceSlice";

export default configureStore({
	reducer: {
		devices: deviceReducer,
	},
});
