import { snapshot_UNSTABLE } from 'recoil';
import { todoListItemSelector, todoListSelector } from './todoList';

test('test fetch todo list', async () => {
  const initialSnapshot = snapshot_UNSTABLE();
  const release = initialSnapshot.retain();
  try {
    const loadable = initialSnapshot.getLoadable(todoListSelector);
    const items = await (loadable.promiseMaybe() ?? loadable.valueOrThrow());
    expect(items?.length).toBe(3);
  } finally {
    release();
  }
});

test('test todo list id is unique', async () => {
  const initialSnapshot = snapshot_UNSTABLE();
  const release = initialSnapshot.retain();
  try {
    const loadable = initialSnapshot.getLoadable(todoListSelector);
    const items = await (loadable.promiseMaybe() ?? loadable.valueOrThrow());
    const ids = items.map((item) => item.id);
    const uniqed = Array.from(new Set(ids));
    expect(ids.length).toBe(uniqed.length);
  } finally {
    release();
  }
});

test('test todo list get with id', async () => {
  const initialSnapshot = snapshot_UNSTABLE();
  const release = initialSnapshot.retain();
  try {
    const loadable = initialSnapshot.getLoadable(todoListItemSelector(2));
    const item = await (loadable.promiseMaybe() ?? loadable.valueOrThrow());
    expect(item?.id).toBe(2);
  } finally {
    release();
  }
});
