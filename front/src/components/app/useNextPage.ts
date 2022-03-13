import { RouteMatch } from '@tanstack/react-location';
import { useSetRecoilState } from 'recoil';
import { currentPageIndex } from '@/states/currentPage';

type Loader = (match: RouteMatch) => Promise<unknown>;

/** 次のページに遷移する際の共通処理と、次のページで指定されているページローダーを呼び出すhooksです */
export const useNextPage = (pageLoaderFactory?: () => Loader) => {
  const setIndex = useSetRecoilState(currentPageIndex);
  const pageLoader = pageLoaderFactory?.();
  const loader = async (match: RouteMatch) => {
    // ページの通番をインクリメントする
    setIndex(index => (index ?? 0) + 1);
    // 次のページで指定されたローダーがあれば呼び出す
    pageLoader?.(match);
    // データの授受はRecoilを通したいので、ローダーからは何も返さない
    return {};
  };
  return loader;
};
