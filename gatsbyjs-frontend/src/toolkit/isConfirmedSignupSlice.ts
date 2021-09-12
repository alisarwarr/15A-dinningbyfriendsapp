import { createSlice } from '@reduxjs/toolkit';

export const isConfirmedSignupSlice = createSlice({
    name: "isConfirmedSignup",

    initialState: {
        value: false
    } as {
        value: boolean
    },

    reducers: {
        changeIsConfirmedSignup: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { changeIsConfirmedSignup } = isConfirmedSignupSlice.actions;
export const selectIsConfirmedSignup = (state) => state.isConfirmedSignupSliceReducer.value;
export default isConfirmedSignupSlice.reducer;