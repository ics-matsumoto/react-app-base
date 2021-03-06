import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { progressColor } from '../../../../consts/progressColor';
import { progressDispName } from '../../../../consts/progressDispName';
import { LinkButton } from '@/components/presentations/basicButton/LinkButton';
import { urls } from '@/consts/urls';
import { todoListItemSelector } from '@/states/todoList';

type Props = {
  id: number;
};

export const TodoListItem: React.VFC<Props> = ({ id }) => {
  const item = useRecoilValue(todoListItemSelector(id));
  if (!item) {
    return <div>item not found</div>;
  }

  const itemStyle = css`
    display: grid;
    grid-template-columns: 80px 1fr 150px;
    width: 100%;
    padding: 12px 24px;
    background-color: ${progressColor[item?.progress]};
    border: 1px solid white;
  `;

  const progressStyle = css`
    font-weight: bold;
  `;

  return (
    <div css={itemStyle}>
      <span css={progressStyle}>{progressDispName[item.progress]}</span>
      <span>{item.title}</span>
      <LinkButton to={`${urls.detail}/${id}`}>詳細</LinkButton>
    </div>
  );
};
