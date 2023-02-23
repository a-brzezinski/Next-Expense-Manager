import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	validPassword: true,
	validEmail: true,
};

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		isValid(state, action) {
			if (action.payload === 'password') {
				state.validPassword = false;
			}
			if (action.payload === 'valid') {
				state.validPassword = true;
			}
			if (action.payload === 'email') {
				state.validEmail = false;
			}
			if (action.payload === 'validEmail') {
				state.validEmail = true;
			}
		},
	},
});

export const uiActions = uiSlice.actions;
