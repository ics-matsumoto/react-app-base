import { useTodoSummary } from '../hooks/useTodoSummary';
import { progressDispName } from '@/consts/progressDispName';

export const TodoDetailSummary: React.VFC = () => {
  const summary = useTodoSummary();
  if (!summary) {
    return <div>Item not found</div>;
  }
  return (
    <div>
      <div>
        <dd>Title</dd>
        <dl>{summary.title}</dl>
      </div>
      <div>
        <dd>Progress</dd>
        <dl>{progressDispName[summary.progress]}</dl>
      </div>
    </div>
  );
};
