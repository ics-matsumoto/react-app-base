import { TodoListItem } from '@/types/TodoList';
import axios from 'axios';

const APIROOT = '//localhost:4001';
export const fetchTodoList = async () => {
  const resp = await axios.get(`${APIROOT}/todolist`, { responseType: 'json' });
  // TODO: APIの戻り値はio-ts等で検査すること
  return (resp.data ?? []) as TodoListItem[];
};
