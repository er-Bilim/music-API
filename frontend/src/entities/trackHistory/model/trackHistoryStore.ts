import { devtools } from 'zustand/middleware';
import type { ITrackHistory } from './trackHistory.types';
import { create } from 'zustand';
import type { IGlobalError } from '../../../shared/types/error.types';
import { isAxiosError } from 'axios';
import { serviceGetTrackHistory } from '../service/trackHistory.service';
import { useUserStore } from '../../user/model/userStore';

interface ITrackHistoryState {
  trackHistory: ITrackHistory[];
  fetchLoading: boolean;
  fetchError: IGlobalError | null;
  getTrackHistory: () => Promise<void>;
}

export const useTrackHistoryStore = create<ITrackHistoryState>()(
  devtools(
    (set) => ({
      trackHistory: [],
      loading: {
        fetchLoading: false,
      },
      errors: {
        fetchError: null,
      },

      getTrackHistory: async () => {
        set({
          fetchLoading: true,
          fetchError: null,
        });
        try {
          const token = useUserStore.getState().user?.user.token;

          if (token) {
            const history = await serviceGetTrackHistory(token);
            set({
              trackHistory: history,
              fetchLoading: false,
            });
          }
        } catch (error) {
          if (isAxiosError(error)) {
            if (error.response) {
              set({
                fetchLoading: false,
                fetchError: null,
              });
            }
          }

          throw error;
        }
      },
    }),
    {
      name: 'trackHistoryStore',
      enabled: true,
    },
  ),
);
