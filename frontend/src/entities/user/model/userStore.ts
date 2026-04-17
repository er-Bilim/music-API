import { create } from 'zustand';
import type {
  IGlobalError,
  IValidationError,
} from '../../../shared/types/error.types';
import type { ILogin, IRegister, IUser } from './user.types';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import {
  login,
  loginGoogleService,
  logout,
  register,
} from '../service/user.service';
import { parseApiError } from '../../../shared/api/error/normalizeResError';

interface IUserState {
  user: IUser | null;
  registerUser: (data: IRegister) => Promise<void>;
  loginUser: (data: ILogin) => Promise<void>;
  loginGoogle: (credential: string) => Promise<void>;

  logoutUser: () => Promise<void>;
  registerLoading: boolean;
  registerError: IValidationError | null;
  loginLoading: boolean;
  loginError: IGlobalError | null;
  logoutLoading: boolean;
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
        logoutLoading: false,

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

        loginGoogle: async (credential) => {
          set({ loginLoading: true, loginError: null });

          try {
            const user = await loginGoogleService(credential);
            set({ loginLoading: false, user: user });
          } catch (error) {
            set({
              loginLoading: false,
              loginError: parseApiError(error as IGlobalError),
            });

            throw error;
          }
        },

        logoutUser: async () => {
          set({ logoutLoading: true });
          try {
            const user = get().user;
            if (user) {
              set({
                user: null,
                logoutLoading: false,
              });
              await logout();
            }
          } catch (error) {
            set({
              logoutLoading: false,
            });

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
