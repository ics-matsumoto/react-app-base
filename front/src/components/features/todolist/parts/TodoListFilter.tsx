import { progressDispName } from '../../../../consts/progressDispName';
import { useFilterToggle, useFilterValue } from '../hooks/useFilter';
import { TodoProgress } from '@/types/TodoList';

type ItemProps = { progress: TodoProgress };

/**
 * 指定の進捗状態のフィルタを設定/解除するチェックボックスのコンポーネントです
 */
const TodoListFilterItem: React.VFC<ItemProps> = ({ progress }) => {
  const filter = useFilterValue();
  const toggle = useFilterToggle();
  return (
    <label>
      <input type="checkbox" checked={filter[progress]} onChange={() => toggle(progress)} />
      <span>{progressDispName[progress]}</span>
    </label>
  );
};

/**
 * 未着手/作業中/完了の各状態のON/OFFを切り替えるコンポーネントです。
 */
export const TodoListFilter: React.VFC = () => {
  return (
    <div>
      <TodoListFilterItem progress="none" />
      <TodoListFilterItem progress="doing" />
      <TodoListFilterItem progress="done" />
    </div>
  );
};
