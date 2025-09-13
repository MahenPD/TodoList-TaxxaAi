import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

type Todo = { id: string; text: string; done: boolean };

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    add: (state, action: PayloadAction<{ text: string }>) => {
      state.push({
        id: Math.random().toString(24),
        text: action.payload.text,
        done: false,
      });
    },
    toggle: (state, action: PayloadAction<{ id: string }>) => {
      const t = state.find((x) => x.id === action.payload.id);
      if (t) t.done = !t.done;
    },
    remove: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((x) => x.id !== action.payload.id);
    },
  },
});

export const { add, toggle, remove } = todosSlice.actions;

function loadState() {
  try {
    const serializedState = localStorage.getItem('todosState');
    if (!serializedState) return undefined;
    return { todos: JSON.parse(serializedState) };
  } catch {
    return undefined;
  }
}

function saveState(state: any) {
  try {
    const serializedState = JSON.stringify(state.todos);
    localStorage.setItem('todosState', serializedState);
  } catch {}
}

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
  preloadedState: loadState(),
  devTools: true,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
