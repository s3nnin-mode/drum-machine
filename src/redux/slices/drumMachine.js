import { createSlice } from "@reduxjs/toolkit";

export const drumMachineSlice = createSlice({
    name: 'drum machine',
    initialState: { currentKey: '', boton: true },
    reducers: {
        showCurrentKey: (state, action) => {
            state.currentKey = action.payload
        },
        updateBtn: (state, action) => {
            state.boton = !state.boton
        }
    }
})

export const { showCurrentKey, updateBtn } = drumMachineSlice.actions;