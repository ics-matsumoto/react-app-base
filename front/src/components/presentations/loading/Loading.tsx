import { css } from '@emotion/react';

type Props = {
  height?: number;
  text?: string;
};

export const Loading: React.VFC<Props> = ({ height = 100, text = 'Loading...' }) => {
  const style = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${height}px;
    color: gray;
  `;
  return <div css={style}>{text}</div>;
};
