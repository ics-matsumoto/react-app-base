import { useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { urls } from '@/consts/urls';
import { wait } from '@/ultils/wait';

export const useLogin = () => {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const login = async () => {
    // ログイン処理
    setIsRunning(true);
    await wait(1000);
    navigate({ to: urls.top });
    setIsRunning(false);
  };

  return { login, isRunning };
};
