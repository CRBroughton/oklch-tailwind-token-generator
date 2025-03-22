import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const coloursSlice = createSlice({
    name: "colours-slice",
    initialState: {
        nextID: 2,
        colourTypes: [
            { id: 1, name: "primary", l: 0.55, c: 0.2, h: 250 }
        ],
        defaultColour: {
            l: 0.55,
            c: 0.2,
            h: 250,
        },
        syncSettings: {
            l: false,
            c: false,
            h: false,
        }
    },
    
    reducers: {
        addColour: (state) => {
            const newColourName = `color-${state.colourTypes.length + 1}`
            const firstColour = state.colourTypes[0]
            const newColour = {
                id: state.nextID,
                name: newColourName,
                l: state.syncSettings.l ? firstColour.l : state.defaultColour.l,
                c: state.syncSettings.c ? firstColour.c : state.defaultColour.c,
                h: state.syncSettings.h ? firstColour.h : (state.defaultColour.h + (state.colourTypes.length * 60)) % 360
            }

            state.colourTypes.push(newColour)
            state.nextID += 1

        },
        removeColour: (state, action: PayloadAction<number>) => {
            state.colourTypes = state.colourTypes.filter(colour => colour.id !== action.payload)
        }
    }
})

export const { addColour, removeColour } = coloursSlice.actions
export default coloursSlice.reducer