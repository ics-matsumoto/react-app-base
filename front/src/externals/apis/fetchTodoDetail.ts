import { TodoDetail } from '@/types/TodoList';
import axios from 'axios';

const APIROOT = '//localhost:4001';
export const fetchTodoDetail = async (id: number) => {
  const resp = await axios.get(`${APIROOT}/detail/` + id, { responseType: 'json' });
  // TODO: APIの戻り値はio-ts等で検査すること
  return (resp.data ?? []) as TodoDetail;
};
