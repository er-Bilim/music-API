import { devtools } from 'zustand/middleware';
import type { ITrackHistory } from './trackHistory.types';
import { create } from 'zustand';
import type { IGlobalError } from '../../../shared/types/error.types';
import { serviceGetTrackHistory } from '../service/trackHistory.service';
import { parseApiError } from '../../../shared/api/error/normalizeResError';

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
          const history = await serviceGetTrackHistory();
          set({
            trackHistory: history,
            fetchLoading: false,
          });
        } catch (error) {
          set({
            fetchLoading: false,
            fetchError: parseApiError(error as IGlobalError),
          });

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
