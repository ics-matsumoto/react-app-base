import { useRecoilValue } from 'recoil';
import { useFilterValue } from './useFilter';
import { todoListSelector } from '@/states/todoList';

/**
 * フィルタ設定に基づき、絞り込まれたTodoListを提供します。
 * フィルタの設定はuseFilterフックで参照/変更できます。
 */
export const useFilteredTodo = () => {
  const allItems = useRecoilValue(todoListSelector);
  const filter = useFilterValue();
  const items = allItems.filter(item => filter[item.progress]);
  const ids = items.map(item => item.id);
  return {
    ids,
    items,
  };
};
