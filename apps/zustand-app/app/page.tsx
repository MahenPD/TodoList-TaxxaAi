'use client';
import { CustomTextInput, ListItem, QuoteOfTheDay } from '@my/ui';
import { useStore } from '../src/store/useStore';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

type Quote = { content: string; author: string };

function TodoList() {
  const [quote, setQuote] = useState<Quote>({ content: '', author: '' });
  const [loading, setLoading] = useState(false);

  const todos = useStore((s) => s.todos);
  const add = useStore((s) => s.add);
  const toggle = useStore((s) => s.toggle);
  const remove = useStore((s) => s.remove);

  async function fetchQuote() {
    setLoading(true);
    try {
      const res = await fetch('https://api.realinspire.live/v1/quotes/random', {
        cache: 'no-store',
      });
      const data: Quote[] = await res.json();
      setQuote(data[0]);
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
          onClick={(text) => add(text)}
        />

        <AnimatePresence>
          {todos.map((t) => (
            <ListItem
              key={t.id}
              itemData={t}
              onItemDone={(id) => toggle(id)}
              onItemRemove={(id) => remove(id)}
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

export default function Page() {
  return (
    <div>
      <TodoList />
    </div>
  );
}
