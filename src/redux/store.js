import { configureStore } from "@reduxjs/toolkit";
import { drumMachineSlice } from "./slices/drumMachine";

export const store = configureStore({
    reducer: {
        drumMachine: drumMachineSlice.reducer
    }
})