import { useRecoilValue } from 'recoil';
import { todoDetailCurrentIdAtom } from '@/states/todoDetail';
import { todoListItemSelector } from '@/states/todoList';

export const useTodoSummary = () => {
  const id = useRecoilValue(todoDetailCurrentIdAtom);
  const summary = useRecoilValue(todoListItemSelector(id));
  return summary;
};
