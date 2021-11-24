import { createSlice } from "@reduxjs/toolkit";

// export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
// 	const response = await fetch("https://jsonplaceholder.typicode.com/users");
// 	const users = await response.json();
// 	return users;
// });

const deviceSlice = createSlice({
	name: "devices",
	initialState: {
		entities: [],
		loading: false,
	},
	reducers: {
		deviceAdded(state, action) {
			state.entities.push(action.payload);
		},
		deviceUpdated(state, action) {
			const { id, model, os, owner, notes } = action.payload;
			const existingDevice = state.entities.find((device) => device.id === id);
			if (existingDevice) {
				existingDevice.model = model;
				existingDevice.os = os;
				existingDevice.owner = owner;
				existingDevice.notes = notes;
			}
		},
		deviceDeleted(state, action) {
			const { id } = action.payload;
			const existingDevice = state.entities.find((device) => device.id === id);
			if (existingDevice) {
				state.entities = state.entities.filter((device) => device.id !== id);
			}
		},
	},
	// extraReducers: {
	// 	[fetchUsers.pending]: (state, action) => {
	// 		state.loading = true;
	// 	},
	// 	[fetchUsers.fulfilled]: (state, action) => {
	// 		state.loading = false;
	// 		state.entities = [...state.entities, ...action.payload];
	// 	},
	// 	[fetchUsers.rejected]: (state, action) => {
	// 		state.loading = false;
	// 	},
	// },
});

export const { deviceAdded, deviceUpdated, deviceDeleted } =
	deviceSlice.actions;

export default deviceSlice.reducer;
