import { useLogin } from './hooks/useLogin';
import { BasicButton } from '@/components/presentations/basicButton/BasicButton';
import { BlockingModal } from '@/components/presentations/blockingModal/BlockingModal';

export const LoginPanel = () => {
  const { login, isRunning } = useLogin();
  return (
    <>
      {isRunning && <BlockingModal>ログイン中...</BlockingModal>}
      <BasicButton onClick={login}>LOGIN</BasicButton>
    </>
  );
};
