import { snapshot_UNSTABLE, useRecoilValue, useSetRecoilState } from 'recoil';
import { todoDetailCurrentIdAtom, todoDetailSelector } from './todoDetail';
import { todoListItemSelector, todoListSelector } from './todoList';

test('fetch todo detail with valid id', async () => {
  const snapshot = snapshot_UNSTABLE(({ set }) => set(todoDetailCurrentIdAtom, 1));
  const release = snapshot.retain();
  try {
    const loadable = snapshot.getLoadable(todoDetailSelector);
    const item = await (loadable.promiseMaybe() ?? loadable.valueOrThrow());
    expect(item?.memo ?? '').toBe(
      '郵便局に行く郵便局に行く郵便局に行く郵便局に行く郵便局に行く郵便局に行く郵便局に行く郵便局に行く郵便局に行く郵便局に行く'
    );
  } finally {
    release();
  }
});

/**
 * 失敗するテストの例（APIアクセスをfetch→axiosに変えたことでデグレした例）
 * 存在しないIDを指定してtodo詳細をロードした場合、undefinedが返って欲しいが、実際にはエラーがthrowされるために失敗する。
 * このテストはAPIアクセスをfetchで実装していた時には成功していたが、axiosに変えたタイミングでデグレしたため、失敗するようになった。
 */
test('return undefined for non existing id -- sample of failed test', async () => {
  const snapshot = snapshot_UNSTABLE(({ set }) => set(todoDetailCurrentIdAtom, 3));
  const release = snapshot.retain();
  try {
    const loadable = snapshot.getLoadable(todoDetailSelector);
    const item = await (loadable.promiseMaybe() ?? loadable.valueOrThrow());
    expect(item).toBe(undefined);
  } finally {
    release();
  }
});
