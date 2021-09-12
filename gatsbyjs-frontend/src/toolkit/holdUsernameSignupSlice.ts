import { createSlice } from '@reduxjs/toolkit';

export const holdUsernameSignupSlice = createSlice({
    name: "holdUsernameSignup",

    initialState: {
        value: null
    } as {
        value: string | null
    },

    reducers: {
        changeHoldUsernameSignup: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { changeHoldUsernameSignup } = holdUsernameSignupSlice.actions;
export const selectHoldUsernameSignup = (state) => state.holdUsernameSignupSliceReducer.value;
export default holdUsernameSignupSlice.reducer;