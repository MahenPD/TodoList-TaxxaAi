import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type Todo = { id: string; text: string; done: boolean };
type State = {
  todos: Todo[];
  add: (text: string) => void;
  toggle: (id: string) => void;
  remove: (id: string) => void;
};

export const useStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        todos: [],
        add: (text: string) =>
          set((state) => ({
            todos: [
              ...state.todos,
              { id: Date.now().toString(), text, done: false },
            ],
          })),
        toggle: (id: string) =>
          set((state) => ({
            todos: state.todos.map((t) =>
              t.id === id ? { ...t, done: !t.done } : t,
            ),
          })),
        remove: (id: string) =>
          set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),
      }),
      {
        name: 'todos-store',
      },
    ),
  ),
);
