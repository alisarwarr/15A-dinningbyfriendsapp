import { createSlice } from '@reduxjs/toolkit';

export const holdIdOfUserUntilSignedInSlice = createSlice({
    name: "holdIdOfUserUntilSignedIn",

    initialState: {
        value: null
    } as {
        value: string | null
    },

    reducers: {
        changeHoldIdOfUserUntilSignedIn: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { changeHoldIdOfUserUntilSignedIn } = holdIdOfUserUntilSignedInSlice.actions;
export const selectHoldIdOfUserUntilSignedIn = (state) => state.holdIdOfUserUntilSignedInSliceReducer.value;
export default holdIdOfUserUntilSignedInSlice.reducer;