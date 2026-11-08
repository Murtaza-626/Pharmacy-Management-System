import { createSlice } from "@reduxjs/toolkit";
import reducer from "./medicineSlice";
const initialState = {
    items: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
        },

        cleaCart: (state, action) => {
            state.items = [];
        }
    }
});

export const {addToCart, cleaCart} = cartSlice.actions;
export default cartSlice.reducer;