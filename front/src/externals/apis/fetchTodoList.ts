import { TodoListItem } from '@/types/TodoList';

const APIROOT = '//localhost:4001';
export const fetchTodoList = async () => {
  const resp = await fetch(`${APIROOT}/todolist`);
  // TODO: APIの戻り値はio-ts等で検査すること
  return ((await resp.json()) ?? []) as TodoListItem[];
};
