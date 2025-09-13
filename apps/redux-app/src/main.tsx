import { AnimatePresence } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Button, CustomTextInput, ListItem, QuoteOfTheDay } from 'shared/ui';
import { useQuote } from 'shared//hooks';
import { generateTodo } from 'shared//ai';
import '../index.css';
import { add, remove, RootState, store, toggle } from './store';

function TodoList() {
  const todos = useSelector((s: RootState) => s.todos);
  const dispatch = useDispatch();
  const { quote, loading } = useQuote();
  const [aiPrompt, setAiPrompt] = useState('');

  const handleAIPrompt = useCallback(async () => {
    if (!aiPrompt.trim()) return;
    try {
      setAiPrompt('');
      const todosFromAI = await generateTodo(aiPrompt);
      todosFromAI.forEach((text) => dispatch(add({ text })));
    } catch (err) {
      console.error(err);
    }
  }, [aiPrompt, dispatch]);

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
      <div className="content">
        <h1 className="title">Your To Do</h1>

        <CustomTextInput
          placeholder="Add new task"
          onClick={(text) => dispatch(add({ text }))}
        />

        <div className="ai-section">
          OR
          <input
            className="ai-input"
            value={aiPrompt}
            placeholder="Enter Prompt"
            onChange={(e) => setAiPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAIPrompt()}
          />
          <Button onClick={handleAIPrompt} buttonTitle="GENERATE WITH AI" />
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
          {`Remaining: ${remainingTodos.length}`}
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
