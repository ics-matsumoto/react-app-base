import { TodoDetail } from '@/types/TodoList';

const APIROOT = '//localhost:4001';
export const fetchTodoDetail = async (id: number) => {
  const resp = await fetch(`${APIROOT}/detail/` + id);
  // TODO: APIの戻り値はio-ts等で検査すること
  return ((await resp.json()) ?? []) as TodoDetail;
};
