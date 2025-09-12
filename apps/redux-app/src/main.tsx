import { Button, CustomTextInput, ListItem, QuoteOfTheDay } from '@my/ui';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { add, remove, RootState, store, toggle } from './store';
import '../index.css';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

type Quote = { content: string; author: string };

function TodoList() {
  const todos = useSelector((s: RootState) => s.todos);
  const dispatch = useDispatch();

  const [quote, setQuote] = useState<Quote>({ content: '', author: '' });
  const [loading, setLoading] = useState(false);

  async function fetchQuote() {
    setLoading(true);
    try {
      const res = await fetch('https://api.realinspire.live/v1/quotes/random');
      const data: Quote[] = await res.json();
      setQuote(data[0]);
    } catch (err) {
      console.error('Error fetching quote', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuote();
  }, []);

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
          <Button onClick={fetchQuote} buttonTitle="GENERATE USING AI" />
        </div>

        <AnimatePresence>
          {todos.map((t) => (
            <ListItem
              key={t.id}
              itemData={t}
              onItemRemove={(id) => dispatch(remove({ id }))}
              onItemDone={(id) => dispatch(toggle({ id }))}
            />
          ))}
        </AnimatePresence>

        <div className="todo-remaining">
          {`Your remaining todos : ${todos.filter((f) => !f.done).length}`}
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
