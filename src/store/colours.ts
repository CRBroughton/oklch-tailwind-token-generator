import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const coloursSlice = createSlice({
    name: "colours-slice",
    initialState: {
        nextID: 2,
        colours: [
            {
                id: 1,
                name: "colour-1",
                lightness: 0.55,
                chroma: 0.2,
                hue: 250
            }
        ],
        defaultColour: {
            lightness: 0.55,
            chroma: 0.2,
            hue: 250,
        },
        syncSettings: {
            lightness: false,
            chroma: false,
            hue: false,
        }
    },

    reducers: {
        addColour: (state) => {
            const newColourName = `colour-${state.colours.length + 1}`
            const firstColour = state.colours[0]
            const newColour = {
                id: state.nextID,
                name: newColourName,
                lightness: state.syncSettings.lightness ? firstColour.lightness : state.defaultColour.lightness,
                chroma: state.syncSettings.chroma ? firstColour.chroma : state.defaultColour.chroma,
                hue: state.syncSettings.hue ? firstColour.hue : (state.defaultColour.hue + (state.colours.length * 60)) % 360
            }
            state.colours.push(newColour)
            state.nextID += 1
        },
        removeColour: (state, action: PayloadAction<number>) => {
            state.colours = state.colours.filter(colour => colour.id !== action.payload)
        }
    }
})

export const { addColour, removeColour } = coloursSlice.actions
export default coloursSlice.reducer