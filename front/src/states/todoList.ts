import { selector, selectorFamily } from 'recoil';
import { fetchTodoList } from '@/externals/apis/fetchTodoList';

export const todoListSelector = selector({
  key: 'states/todolist/todolist',
  get: async () => {
    return await fetchTodoList();
  },
});

export const todoListItemSelector = selectorFamily({
  key: 'states/todolist/todolistItem',
  get:
    (id: number | undefined) =>
    ({ get }) => {
      const list = get(todoListSelector);
      return list.find((item) => item.id === id);
    },
});
