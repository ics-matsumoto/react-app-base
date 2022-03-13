import { useRecoilValue } from 'recoil';
import { todoDetailSelector } from '@/states/todoDetail';

export const useTodoDetail = () => {
  const detail = useRecoilValue(todoDetailSelector);

  return detail;
};
