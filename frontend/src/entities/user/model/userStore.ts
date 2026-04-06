import { create } from 'zustand';
import type {
  IGlobalError,
  IValidationError,
} from '../../../shared/types/error.types';
import type { ILogin, IRegister, IUser } from './user.types';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { login, logout, register } from '../service/user.service';
import { parseApiError } from '../../../shared/api/error/normalizeResError';

interface IUserState {
  user: IUser | null;
  registerUser: (data: IRegister) => Promise<void>;
  loginUser: (data: ILogin) => Promise<void>;
  logoutUser: () => Promise<void>;
  registerLoading: boolean;
  registerError: IValidationError | null;
  loginLoading: boolean;
  loginError: IGlobalError | null;
}

export const useUserStore = create<IUserState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        registerLoading: false,
        registerError: null,
        loginLoading: false,
        loginError: null,

        registerUser: async (data) => {
          set({ registerLoading: true, registerError: null });

          try {
            const user = await register(data);
            set({ user, registerLoading: false });
          } catch (error) {
            set({
              registerLoading: false,
              registerError: parseApiError(error as IValidationError),
            });

            throw error;
          }
        },

        loginUser: async (data) => {
          set({ loginLoading: true, loginError: null });

          try {
            const user = await login(data);
            set({ user, loginLoading: false });
          } catch (error) {
            set({
              loginLoading: false,
              loginError: parseApiError(error as IGlobalError),
            });

            throw error;
          }
        },

        logoutUser: async () => {
          try {
            const user = get().user;
            if (user) {
              set({
                user: null,
              });
              await logout(user);
            }
          } catch (error) {
            console.error(error);

            throw error;
          }
        },
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
      },
    ),
    {
      name: 'userStore',
      enabled: true,
    },
  ),
);
