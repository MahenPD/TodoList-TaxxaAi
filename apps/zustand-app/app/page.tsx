'use client';
import { AnimatePresence } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';
import { useStore } from '../src/store/useStore';
import styles from './styles.module.css';
import { useQuote } from 'shared/hooks';
import { generateTodo } from 'shared/ai';
import {
  CustomTextInput,
  Button,
  ListItem,
  QuoteOfTheDay,
  CountRenders,
  AiTextInput,
} from 'shared/ui';

function TodoList() {
  const [loadingAI, setLoadingAI] = useState(false);
  const { quote, loading: quoteLoading } = useQuote();

  const { todos, add, toggle, remove } = useStore((state) => ({
    todos: state.todos,
    add: state.add,
    toggle: state.toggle,
    remove: state.remove,
  }));

  const remainingTodos = useMemo(() => todos.filter((t) => !t.done), [todos]);

  const handleAIPrompt = useCallback(
    async (aiPrompt: string) => {
      setLoadingAI(true);

      try {
        const response = await generateTodo(aiPrompt);
        response.forEach((text: string) => add(text));
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingAI(false);
      }
    },
    [add],
  );

  const handleToggle = useCallback((id: string) => toggle(id), [toggle]);
  const handleRemove = useCallback((id: string) => remove(id), [remove]);

  const handleClearAll = useCallback(() => {
    todos.forEach((t) => remove(t.id));
  }, [todos, remove]);

  return (
    <div className={styles.container}>
      <CountRenders label="Next / Zustand App" />
      <div className={styles.content}>
        <h1 className={styles.title}>Your To Do</h1>

        <CustomTextInput
          placeholder="Add new task"
          onClick={(text) => add(text)}
        />

        <div className={styles.aiSection}>
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
              onItemDone={handleToggle}
              onItemRemove={handleRemove}
            />
          ))}
        </AnimatePresence>

        <div className={styles.remaining}>
          {`Your remaining todos: ${remainingTodos.length}`}
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
