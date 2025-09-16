import { AnimatePresence } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {
  AiTextInput,
  Button,
  CountRenders,
  CustomTextInput,
  ListItem,
  QuoteOfTheDay,
} from 'shared/ui';
import { useQuote } from 'shared//hooks';
import { generateTodo } from 'shared//ai';
import '../index.css';
import { add, remove, RootState, store, toggle } from './store';

function TodoList() {
  const todos = useSelector((s: RootState) => s.todos);
  const dispatch = useDispatch();
  const [loadingAI, setLoadingAI] = useState(false);
  const { quote, loading } = useQuote();
  const OPEN_API_KEY = import.meta.env.VITE_OPEN_API_KEY || '';

  const handleAIPrompt = useCallback(
    async (aiPrompt: string) => {
      setLoadingAI(true);

      try {
        const todosFromAI = await generateTodo(aiPrompt, OPEN_API_KEY);
        todosFromAI.forEach((text) => dispatch(add({ text })));
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingAI(false);
      }
    },
    [dispatch],
  );

  const handleRemove = useCallback(
    (id: string) => dispatch(remove({ id })),
    [dispatch],
  );
  const handleToggle = useCallback(
    (id: string) => dispatch(toggle({ id })),
    [dispatch],
  );
  const remainingTodos = useMemo(() => todos.filter((t) => !t.done), [todos]);

  return (
    <div className="container">
      <CountRenders label="React / Redux App" />
      <div className="content">
        <h1 className="title">Your To Do</h1>

        <CustomTextInput
          placeholder="Add new task"
          onClick={(text) => dispatch(add({ text }))}
        />

        <div className="ai-section">
          OR
          <AiTextInput
            placeholder="Enter your prompt"
            onClick={handleAIPrompt}
            buttonText={loadingAI ? 'Generating...' : 'GENERATE WITH AI'}
            disabled={loadingAI}
          />
        </div>

        <AnimatePresence>
          {todos.map((t) => (
            <ListItem
              key={t.id}
              itemData={t}
              onItemRemove={handleRemove}
              onItemDone={handleToggle}
            />
          ))}
        </AnimatePresence>

        <div className="todo-remaining">
          {`Your remaining todos: ${remainingTodos.length}`}
          <Button
            buttonTitle="Clear All"
            onClick={() => todos.forEach((t) => dispatch(remove({ id: t.id })))}
          />
        </div>

        <QuoteOfTheDay loading={loading} quote={quote} />
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
