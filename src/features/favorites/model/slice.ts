import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = { ids: string[] };
const initial: State = { ids: JSON.parse(localStorage.getItem('favorites') || '[]') };

const slice = createSlice({
  name: 'favorites',
  initialState: initial,
  reducers: {
    toggle(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.ids = state.ids.includes(id) ? state.ids.filter(x => x !== id) : [...state.ids, id];
      localStorage.setItem('favorites', JSON.stringify(state.ids));
    }
  }
});
export const { toggle } = slice.actions;
export default slice.reducer;
