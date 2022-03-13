import { VFC } from 'react';
import { AppHeader } from '@/components/features/header/AppHeader';
import { TodoList } from '@/components/features/todolist/TodoList';

export const TopPage: VFC = () => {
  return (
    <>
      <AppHeader />
      <div>
        <TodoList />
      </div>
    </>
  );
};
