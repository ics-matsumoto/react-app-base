import { css } from '@emotion/react';
import { createPortal } from 'react-dom';

/**
 * 画面全体を覆うモーダルのコンポーネントです。
 */
export const BlockingModal: React.FC = ({ children }) => {
  const style = css`
    position: absolute;
    display: flex;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: #00000099;
    color: white;
    user-select: none;
    pointer-events: none;
    backdrop-filter: blur(8px);
  `;

  return createPortal(<div css={style}>{children}</div>, document.body);
};
