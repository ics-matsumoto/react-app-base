import { VFC } from 'react';
import { RecoilRoot } from 'recoil';
import { AppRouter } from './AppRouter';
import 'modern-css-reset';
import './app.css';

export const App: VFC = () => {
  return (
    <RecoilRoot>
      <AppRouter />
    </RecoilRoot>
  );
};
