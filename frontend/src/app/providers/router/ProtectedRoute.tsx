import { Navigate } from "react-router-dom";
import type { FC, PropsWithChildren } from "react";

interface ProtectedRouterProps extends PropsWithChildren {
  isAuth: boolean;
}

const ProtectedRouter: FC<ProtectedRouterProps> = ({ children, isAuth }) => {
  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRouter;