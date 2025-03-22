import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import coloursReducer from '../store/colours';
import type {  Store } from '../store'; 

describe('Colours Reducer', () => {
  let store: Store

  beforeEach(() => {
    store = configureStore({
      reducer: {
        colours: coloursReducer,
      },
    });
  });

  describe('initial state', () => {
    it('should have the correct initial state', () => {
      const state = store.getState().colours;
      
      expect(state.nextID).toBe(2);
      expect(state.colourTypes).toHaveLength(1);
      expect(state.colourTypes[0]).toEqual({ id: 1, name: "primary", l: 0.55, c: 0.2, h: 250 });
      expect(state.defaultColour).toEqual({ l: 0.55, c: 0.2, h: 250 });
      expect(state.syncSettings).toEqual({ l: false, c: false, h: false });
    });
  });
});