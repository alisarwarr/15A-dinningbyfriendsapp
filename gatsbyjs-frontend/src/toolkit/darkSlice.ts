import { createSlice } from '@reduxjs/toolkit';

export const darkSlice = createSlice({
    name: "dark",

    initialState: {
        value: true
    } as {
        value: boolean
    },

    reducers: {
        changeDark: (state) => {
            state.value = !state.value;
        }
    }
})

export const { changeDark } = darkSlice.actions;
export const selectDark = (state) => state.darkSliceReducer.value;
export default darkSlice.reducer;