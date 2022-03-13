import { css } from '@emotion/react';
import { VFC } from 'react';

export const AppHeader: VFC = () => {
  const rootStyle = css`
    height: 80px;
    border-bottom: 1px solid gray;
  `;
  return (
    <header css={rootStyle}>
      <h1>TODO LIST</h1>
    </header>
  );
};
