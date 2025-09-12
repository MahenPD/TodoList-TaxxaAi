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
      console.log(res);

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
    <div
      style={{
        marginTop: 16,
        display: 'flex',
        flex: 1,
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: '50%',
          maxWidth: 800,
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>Your To Do</h1>

        <CustomTextInput
          placeholder="Add new task"
          onClick={(text) => dispatch(add({ text }))}
        />

        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginTop: 8,
            gap: 18,
            marginBottom: 80,
          }}
        >
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

        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            marginTop: 14,
            fontStyle: 'italic',
          }}
        >
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
