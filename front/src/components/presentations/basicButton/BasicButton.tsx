import { css } from '@emotion/react';
import { BG_COLOR, TEXT_COLOR, THEME_COLOR } from '@/consts/colors';

interface Props {
  outline?: boolean;
  size?: 'default' | 'small' | 'xsmall';
  textAlign?: 'left' | 'center' | 'right';
  disabled?: boolean;
  inline?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const style = (props: Pick<Props, 'outline' | 'size' | 'textAlign' | 'inline'>) =>
  css`
    position: relative;
    display: ${props.inline ? 'inline' : 'block'};
    width: ${props.inline ? '' : 'block'};
    min-width: 142px;
    overflow: hidden;
    font-size: ${{ default: 16, small: 12, xsmall: 10 }[props.size ?? 'default']}px;
    font-weight: bold;
    color: ${props.outline ? TEXT_COLOR : BG_COLOR};
    text-align: ${props.textAlign ?? 'center'};
    cursor: pointer;
    user-select: none;
    background-color: ${props.outline ? BG_COLOR : THEME_COLOR};
    border: 1px solid ${THEME_COLOR};
    border-radius: 25px;
    transition: background-color 0.15s, color 0.15s, box-shadow 0.15s, border-color 0.15s;
  `;

export const BasicButton: React.FC<Props> = ({
  children,
  disabled = false,
  onClick,
  outline = false,
  size = 'default',
  textAlign = 'center',
  inline = false,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      css={style({ outline, size, textAlign, inline })}
    >
      {children}
    </button>
  );
};
