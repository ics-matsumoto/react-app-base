import { css } from '@emotion/react';

type Props = {
  height?: number;
  text?: string;
};

export const Loading: React.VFC<Props> = ({ height = 100, text = 'Loading...' }) => {
  const style = css`
    width: 100%;
    height: ${height}px;
    color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  return <div css={style}>{text}</div>;
};
