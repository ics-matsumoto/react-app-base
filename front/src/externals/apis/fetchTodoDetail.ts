import { TodoDetail } from '@/types/TodoList';
import axios from 'axios';
import { axiosShared } from './axois';

const APIROOT = '//localhost:4001';
export const fetchTodoDetail = async (id: number) => {
  const resp = await axiosShared.get(`${APIROOT}/detail/` + id);
  // TODO: APIの戻り値はio-ts等で検査すること
  return resp.data as TodoDetail;
};
