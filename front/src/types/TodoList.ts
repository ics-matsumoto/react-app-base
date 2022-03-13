export type TodoProgress = 'none' | 'doing' | 'done';
export type TodoListItem = {
  id: number;
  title: string;
  progress: TodoProgress;
};
export type TodoDetail = {
  id: number;
  memo: string;
};
