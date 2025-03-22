import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import coloursReducer, { addColour, removeColour } from '../store/colours';
import type { Store } from '.';

describe('Colours Reducer', () => {
  let store: Store

  beforeEach(() => {
    store = configureStore({
      reducer: {
        coloursReducer,
      },
    });
  });

  describe('initial state', () => {
    it('should have the correct initial state', () => {
      const state = store.getState().coloursReducer;

      expect(state.nextID).toBe(2);
      expect(state.colours).toHaveLength(1);
      expect(state.colours[0]).toEqual({ id: 1, name: "colour-1", lightness: 0.55, chroma: 0.2, hue: 250 });
      expect(state.defaultColour).toEqual({ lightness: 0.55, chroma: 0.2, hue: 250 });
      expect(state.syncSettings).toEqual({ lightness: false, chroma: false, hue: false });
    });
  });

  describe("addColour tests", () => {
    it("should add a new colour with the default settings", () => {
      store.dispatch(addColour())

      const state = store.getState().coloursReducer;
      expect(state.colours).toHaveLength(2);
      expect(state.colours[1]).toEqual({
        id: 2,
        name: "colour-2",
        lightness: 0.55,
        chroma: 0.2,
        hue: 310
      });
      expect(state.nextID).toBe(3);
    })
  })

  describe("removeColour tests", () => {
    it("should remove a colour by its ID", () => {
      store.dispatch(addColour())

      const stateCountAfterColourAddition = store.getState().coloursReducer.colours
      expect(stateCountAfterColourAddition).toHaveLength(2)

      store.dispatch(removeColour(2))

      const stateAfterRemoval = store.getState().coloursReducer
      expect(stateAfterRemoval.colours).toHaveLength(1)
      expect(stateAfterRemoval.colours[0].id).toBe(1)
    })
  })

  it("can handle the removal of the initial colour", () => {
    store.dispatch(removeColour(1))

    const state = store.getState().coloursReducer
    expect(state.colours).toHaveLength(0)
  })
});