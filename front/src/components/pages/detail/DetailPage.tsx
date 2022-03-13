import { RouteMatch, useMatch } from '@tanstack/react-location';
import { VFC } from 'react';
import { useSetRecoilState } from 'recoil';
import { AppHeader } from '@/components/features/header/AppHeader';
import { TodoDetail } from '@/components/features/tododetail/TodoDetail';
import { LinkButton } from '@/components/presentations/basicButton/LinkButton';
import { urls } from '@/consts/urls';
import { todoDetailCurrentIdAtom } from '@/states/todoDetail';

export const DetailPage: VFC = () => {
  const { data: loaded } = useMatch(); // 初期化処理の結果を受け取る。ここでは単に初期化が完了したいるかどうかのフラグとして用いる
  return (
    <>
      <AppHeader />
      {loaded && (
        <div>
          <TodoDetail />
          <LinkButton to={urls.top}>戻る</LinkButton>
        </div>
      )}
    </>
  );
};

/**
 * ページの初期化処理です。
 * この処理はルーターによって画面遷移前に呼び出されます。
 *   @see AppRouter.tsx
 * 画面全体がサスペンドすることを防ぐため、この処理の中ではストアの不要なキャッシュクリアや、
 * クエリパラメータのストアへのセットといった、最低限の処理のみを実装してください。
 * （※基本的にここでデータのフェッチを行う必要はありません）
 */
export const useDetailPageLoader = () => {
  const setId = useSetRecoilState(todoDetailCurrentIdAtom);
  const loader = async (match: RouteMatch) => {
    setId(Number(match.params.id));
  };
  return loader;
};
