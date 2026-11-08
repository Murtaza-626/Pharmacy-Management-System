import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    medicines: []
};

const medicineSlice = createSlice({
    name: "medicines",
    initialState,
    reducers: {
        addMedicine: (state, action) => {
            state.medicines.push(action.payload);
        },

        deleteMedicines: (state, action) => {
            state.medicines = state.medicines.filter((medicine) => medicine.id !== action.payload);
        }
    }
});

export const { addMedicine, deleteMedicines } = medicineSlice.actions;
export default medicineSlice.reducer;

