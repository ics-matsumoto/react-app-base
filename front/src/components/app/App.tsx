import { VFC } from 'react';
import { RecoilRoot } from 'recoil';
import { AppRouter } from './AppRouter';
import 'modern-css-reset';

export const App: VFC = () => {
  return (
    <RecoilRoot>
      <AppRouter />
    </RecoilRoot>
  );
};
