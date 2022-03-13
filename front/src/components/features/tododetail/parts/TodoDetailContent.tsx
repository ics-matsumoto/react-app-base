import { useTodoDetail } from '../hooks/useTodoDetail';

export const TodoDetailContent: React.VFC = () => {
  const detail = useTodoDetail();
  if (detail?.id === undefined) {
    return null;
  }
  return (
    <div>
      <dd>Memo</dd>
      <dl>{detail.memo}</dl>
    </div>
  );
};
