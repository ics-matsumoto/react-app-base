import { useRecoilValue, useSetRecoilState } from 'recoil';
import { filterAtom } from '../states/filterAtom';
import { TodoListItem } from '@/types/TodoList';

// Recoil atomで保持されているフィルタ設定の参照・更新を行うhooks
// 以下のように取得と参照を分割することでレンダリングを削減できるケースがあるので、
// 必要な応じて分割する
// （不要であればuseStateのように[state, setState]をセットで返すhooksにしても良い）

/**
 * TodoListを絞り込むフィルタの状態を提供します。
 */
export const useFilterValue = () => {
  return useRecoilValue(filterAtom);
};

/**
 * TodoListを絞り込むフィルタ状態を変更する機能を提供します。
 * フィルタの状態の変更はtodolist feature全体で共有されます。
 */
export const useFilterToggle = () => {
  const setState = useSetRecoilState(filterAtom);
  const toggle = (progress: TodoListItem['progress']) => {
    setState((state) => ({ ...state, ...{ [progress]: !state[progress] } }));
  };
  return toggle;
};
