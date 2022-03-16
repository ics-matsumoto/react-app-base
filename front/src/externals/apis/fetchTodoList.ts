import { TodoListItem } from '@/types/TodoList';
import axios from 'axios';
import { axiosShared } from './axois';

const APIROOT = '//localhost:4001';
export const fetchTodoList = async () => {
  const resp = await axiosShared.get(`${APIROOT}/todolist`);
  // TODO: APIの戻り値はio-ts等で検査すること
  return (resp.data ?? []) as TodoListItem[];
};
