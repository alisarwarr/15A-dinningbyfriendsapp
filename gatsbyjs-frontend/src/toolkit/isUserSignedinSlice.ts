import { createSlice } from '@reduxjs/toolkit';

export const isUserSignedinSlice = createSlice({
    name: "isUserSignedin",

    initialState: {
        value: false
    } as {
        value: boolean
    },

    reducers: {
        changeIsUserSignedin: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { changeIsUserSignedin } = isUserSignedinSlice.actions;
export const selectIsUserSignedin = (state) => state.isUserSignedinSliceReducer.value;
export default isUserSignedinSlice.reducer;