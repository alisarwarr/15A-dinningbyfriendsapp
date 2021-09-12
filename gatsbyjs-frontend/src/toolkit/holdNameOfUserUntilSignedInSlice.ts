import { createSlice } from '@reduxjs/toolkit';

export const holdNameOfUserUntilSignedInSlice = createSlice({
    name: "holdNameOfUserUntilSignedIn",

    initialState: {
        value: null
    } as {
        value: string | null
    },

    reducers: {
        changeHoldNameOfUserUntilSignedIn: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { changeHoldNameOfUserUntilSignedIn } = holdNameOfUserUntilSignedInSlice.actions;
export const selectHoldNameOfUserUntilSignedIn = (state) => state.holdNameOfUserUntilSignedInSliceReducer.value;
export default holdNameOfUserUntilSignedInSlice.reducer;