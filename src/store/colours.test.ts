import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import coloursReducer, { addColour, removeColour } from '../store/colours';
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

  describe("addColour tests", () => {
    it("should add a new colour with the default settings", () => {
        store.dispatch(addColour())

        const state = store.getState().colours;
        expect(state.colourTypes).toHaveLength(2);
        expect(state.colourTypes[1]).toEqual({
          id: 2,
          name: "color-2",
          l: 0.55,
          c: 0.2,
          h: 310
        });
        expect(state.nextID).toBe(3);
    })
  })

  describe("removeColour tests", () => {
    it("should remove a colour by its ID", () => {
        store.dispatch(addColour())

        const stateCountAfterColourAddition = store.getState().colours.colourTypes
        expect(stateCountAfterColourAddition).toHaveLength(2)

        store.dispatch(removeColour(2))

        const stateAfterRemoval = store.getState().colours
        expect(stateAfterRemoval.colourTypes).toHaveLength(1)
        expect(stateAfterRemoval.colourTypes[0].id).toBe(1)
    })
  })

  it("can handle the removal of the initial colour", () => {
    store.dispatch(removeColour(1))

    const state = store.getState().colours
    expect(state.colourTypes).toHaveLength(0)
  })
});