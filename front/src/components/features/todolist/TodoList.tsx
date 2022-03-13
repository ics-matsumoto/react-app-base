import { Suspense } from 'react';
import { useFilteredTodo } from './hooks/useFilteredTodo';
import { TodoListFilter } from './parts/TodoListFilter';
import { TodoListItem } from './parts/TodoListItem';
import { Loading } from '@/components/presentations/loading/Loading';

const List: React.VFC = () => {
  const { ids } = useFilteredTodo();
  return (
    <div>
      {ids.map(id => (
        <TodoListItem id={id} key={id} />
      ))}
    </div>
  );
};

/**
 * TodoListを表示するコンポーネントです。
 * 進捗状態で一覧をフィルタする機能も提供します。
 * Suspenseに対応しています。
 */
export const TodoList: React.VFC = () => {
  return (
    <div>
      <TodoListFilter />
      <Suspense fallback={<Loading />}>
        <List />
      </Suspense>
    </div>
  );
};
