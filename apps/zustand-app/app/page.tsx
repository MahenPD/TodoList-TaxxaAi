'use client';
import { CustomTextInput, ListItem, QuoteOfTheDay } from '@my/ui';
import { useStore } from '../src/store/useStore';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import styles from './styles.module.css';

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
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Your To Do</h1>

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

        <div className={styles.remaining}>
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
