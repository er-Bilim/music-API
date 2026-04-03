import { create } from 'zustand';
import type {
  IGlobalError,
  IValidationError,
} from '../../../shared/types/error.types';
import type { IUser } from './user.types';
import { devtools } from 'zustand/middleware';
import { register } from '../service/user.service';
import { parseApiError } from '../../../shared/api/error/normalizeResError';

interface IUserState {
  user: IUser | null;
  register: (data: IUser) => Promise<IUser>;
  login: (data: IUser) => Promise<IUser>;
  registerLoading: boolean;
  registerError: IValidationError | null;
  loginLoading: boolean;
  loginError: IGlobalError | null;
}

export const useUserStore = create<IUserState>()(
  devtools(
    (set) => ({
      user: null,
      registerLoading: false,
      registerError: null,
      loginLoading: false,
      loginError: null,

      register: async (data: IUser) => {
        set({ registerLoading: true, registerError: null });

        try {
          const user = await register(data);
          set({ user, registerLoading: false });
        } catch (error) {
          set({
            registerLoading: false,
            registerError: parseApiError(error as IValidationError),
          });
        }
      },

      login: async (data: IUser) => {
        set({ loginLoading: true, loginError: null });

        try {
          const user = await register(data);
          set({ user, loginLoading: false });
        } catch (error) {
          set({
            loginLoading: false,
            loginError: parseApiError(error as IGlobalError),
          });
        }
      },
    }),
    {
      name: 'userStore',
      enabled: true,
    },
  ),
);
