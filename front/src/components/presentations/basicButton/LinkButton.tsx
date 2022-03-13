import { useNavigate } from '@tanstack/react-location';
import { BasicButton } from './BasicButton';

type Props = Omit<typeof BasicButton.propTypes, 'onClick'> & {
  to: string;
};

export const LinkButton: React.FC<Props> = props => {
  const navigate = useNavigate();
  const go = () => {
    navigate({ to: props.to });
  };
  return (
    <BasicButton {...props} onClick={go}>
      {props.children}
    </BasicButton>
  );
};
