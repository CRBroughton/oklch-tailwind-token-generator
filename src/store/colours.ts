import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type OKLCHProperties = 'lightness' | 'chroma' | 'hue' | 'alpha';
export interface Colour {
  id: number;
  name: string;
  lightness: number;
  chroma: number;
  hue: number;
  alpha: number;
}
export interface SyncSettings {
  lightness: boolean;
  chroma: boolean;
  hue: boolean;
  alpha: boolean;
}
export interface ColourState {
  nextID: number;
  colours: Colour[];
  defaultColour: Omit<Colour, 'id' | 'name'>;
  syncSettings: SyncSettings;
}

export const initialColourState: ColourState = {
  nextID: 2,
  colours: [
    {
      id: 1,
      name: "primary",
      lightness: 0.55,
      chroma: 0.2,
      hue: 250,
      alpha: 100,
    }
  ],
  defaultColour: {
    lightness: 0.55,
    chroma: 0.2,
    hue: 250,
    alpha: 100
  },
  syncSettings: {
    lightness: false,
    chroma: false,
    hue: false,
    alpha: false,
  }
};

const coloursSlice = createSlice({
  name: "colours-slice",
  initialState: initialColourState,
  reducers: {
    addColour: (state) => {
      const newColourName = `colour-${state.colours.length + 1}`
      const firstColour = state.colours[0]
      const newColour = {
        id: state.nextID,
        name: newColourName,
        lightness: state.syncSettings.lightness ? firstColour.lightness : state.defaultColour.lightness,
        chroma: state.syncSettings.chroma ? firstColour.chroma : state.defaultColour.chroma,
        hue: state.syncSettings.hue ? firstColour.hue : (state.defaultColour.hue + (state.colours.length * 60)) % 360,
        alpha: state.syncSettings.alpha ? firstColour.alpha : state.defaultColour.alpha,
      }
      state.colours.push(newColour)
      state.nextID += 1
    },
    removeColour: (state, action: PayloadAction<number>) => {
      state.colours = state.colours.filter(colour => colour.id !== action.payload)
    },
    updateColour: (state, action: PayloadAction<{
            id: number;
            property: OKLCHProperties;
            value: number;
        }>) => {
      const { id, property, value } = action.payload

      if (state.syncSettings[property]) {
        state.colours.forEach(colour => {
          colour[property] = value;
        });
      } else {
        const colourIndex = state.colours.findIndex(colour => colour.id === id);
        if (colourIndex !== -1) {
          state.colours[colourIndex][property] = value;
        }
      }
    },
    updateColourName: (state, action: PayloadAction<{ id: number; name: string }>) => {
      const { id, name } = action.payload;
      const formattedName = name.replace(/\s+/g, '-');
      const colourIndex = state.colours.findIndex(colour => colour.id === id);
      if (colourIndex !== -1) {
        state.colours[colourIndex].name = formattedName;
      }
    },
    toggleSync: (state, action: PayloadAction<OKLCHProperties>) => {
      const property = action.payload;
            
      state.syncSettings[property] = !state.syncSettings[property];
            
      // If sync is on, update all the colours to match the primary colour
      if (state.syncSettings[property] && state.colours.length > 1) {
        const primaryValue = state.colours[0][property];
        state.colours.forEach(colour => {
          colour[property] = primaryValue;
        });
      }
    },
  }
})

export const { addColour, removeColour, updateColour, updateColourName, toggleSync } = coloursSlice.actions
export default coloursSlice.reducer