import { atom } from 'recoil';

/**
 * 現在のページ通番を保持するatomです。
 * 「ページが変わったら再fetchしたいAPI」はこの値を購読することでページ遷移のタイミングでキャッシュを破棄して
 * 再取得が可能になります。
 *
 * この値はルーターによって画面遷移ごとにインクリメントされます。
 * また、必要に応じて同一ページ内でインクリメントすることで、ページ遷移せずに再fetchを強制することができます。
 */
export const currentPageIndex = atom<number | undefined>({
  key: 'states/currentPageIndexAtom',
  default: 0,
});
