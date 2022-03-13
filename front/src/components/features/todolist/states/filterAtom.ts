import { atom } from 'recoil';

/**
 * TodoList機能の共有ステートです。
 * リストを絞り込むためのフィルターの状態を保持します。
 */
export const filterAtom = atom({
  key: 'features/todolist/filterAtom',
  default: {
    none: true,
    doing: true,
    done: false,
  },
});
