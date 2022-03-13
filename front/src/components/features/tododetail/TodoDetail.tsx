import { Suspense } from 'react';
import { TodoDetailContent } from './parts/TodoDetailContent';
import { TodoDetailSummary } from './parts/TodoDetailSummary';
import { Loading } from '@/components/presentations/loading/Loading';

export const TodoDetail: React.VFC = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <TodoDetailSummary />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <TodoDetailContent />
      </Suspense>
    </>
  );
};
