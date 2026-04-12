import type { FC, PropsWithChildren } from 'react';
import { useUserStore } from '../../../entities/user/model/userStore';

const AdminActions: FC<PropsWithChildren> = ({ children }) => {
  const isAdmin = useUserStore((state) => state.user?.user.role === 'admin');

  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
};

export default AdminActions;
