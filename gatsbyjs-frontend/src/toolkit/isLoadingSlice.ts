import { createSlice } from '@reduxjs/toolkit';

export const isLoadingSlice = createSlice({
    name: "isLoading",

    initialState: {
        value: false
    } as {
        value: boolean
    },

    reducers: {
        changeIsLoading: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { changeIsLoading } = isLoadingSlice.actions;
export const selectIsLoading = (state) => state.isLoadingSliceReducer.value;
export default isLoadingSlice.reducer;