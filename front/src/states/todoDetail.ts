import { atom, selector } from 'recoil';
import { currentPageIndex } from './currentPage';
import { fetchTodoDetail } from '@/externals/apis/fetchTodoDetail';

export const todoDetailCurrentIdAtom = atom<number | undefined>({
  key: 'states/todoDetailCurrentIdAtom',
  default: undefined,
});

export const todoDetailSelector = selector({
  key: 'states/todoDetailSelector',
  get: async ({ get }) => {
    // 画面遷移ごとに再fetchするためにUse a Request IDパターンを使用する
    // @see https://recoiljs.org/docs/guides/asynchronous-data-queries/#use-a-request-id
    get(currentPageIndex);

    const id = get(todoDetailCurrentIdAtom);
    if (id === undefined) {
      return;
    }

    return await fetchTodoDetail(id);
  },
});
