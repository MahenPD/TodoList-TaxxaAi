'use client';
import { AnimatePresence } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';
import { useStore } from '../src/store/useStore';
import styles from './styles.module.css';
import { useQuote } from 'shared/hooks';
import { generateTodo } from 'shared/ai';
import { CustomTextInput, Button, ListItem, QuoteOfTheDay } from 'shared/ui';

function TodoList() {
  const [aiPrompt, setAiPrompt] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  const { quote, loading: quoteLoading } = useQuote();

  const { todos, add, toggle, remove } = useStore((state) => ({
    todos: state.todos,
    add: state.add,
    toggle: state.toggle,
    remove: state.remove,
  }));

  const remainingCount = useMemo(
    () => todos.filter((t) => !t.done).length,
    [todos],
  );

  const handleAIPrompt = useCallback(async () => {
    if (!aiPrompt.trim()) return;
    setLoadingAI(true);
    try {
      setAiPrompt('');
      const response = await generateTodo(aiPrompt);
      response.forEach((text: string) => add(text));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAI(false);
    }
  }, [aiPrompt, add]);

  const handleToggle = useCallback((id: string) => toggle(id), [toggle]);
  const handleRemove = useCallback((id: string) => remove(id), [remove]);

  const handleClearAll = useCallback(() => {
    todos.forEach((t) => remove(t.id));
  }, [todos, remove]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Your To Do</h1>

        <CustomTextInput
          placeholder="Add new task"
          onClick={(text) => add(text)}
        />

        <div className={styles.aiSection}>
          OR
          <input
            className={styles.aiInput}
            value={aiPrompt}
            type="text"
            placeholder="Enter your prompt"
            onChange={(e) => setAiPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAIPrompt();
            }}
          />
          <Button
            onClick={handleAIPrompt}
            buttonTitle={loadingAI ? 'Generating...' : 'GENERATE WITH AI'}
            disabled={loadingAI}
          />
        </div>

        <AnimatePresence>
          {todos.map((t) => (
            <ListItem
              key={t.id}
              itemData={t}
              onItemDone={handleToggle}
              onItemRemove={handleRemove}
            />
          ))}
        </AnimatePresence>

        <div className={styles.remaining}>
          {`Your remaining todos: ${remainingCount}`}
          <Button buttonTitle="Clear All" onClick={handleClearAll} />
        </div>

        <QuoteOfTheDay loading={quoteLoading} quote={quote} />
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
