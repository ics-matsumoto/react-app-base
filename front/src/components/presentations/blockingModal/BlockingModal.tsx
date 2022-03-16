import { css } from '@emotion/react';
import { createPortal } from 'react-dom';

/**
 * 画面全体を覆うモーダルのコンポーネントです。
 */
export const BlockingModal: React.FC = ({ children }) => {
  const style = css`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    color: white;
    pointer-events: none;
    user-select: none;
    background-color: #00000099;
    backdrop-filter: blur(8px);
  `;

  return createPortal(<div css={style}>{children}</div>, document.body);
};
