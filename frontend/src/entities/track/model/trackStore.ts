import { devtools } from 'zustand/middleware';
import type { ITrack } from './track.types';
import { create } from 'zustand';
import { getTracks } from '../service/track.service';
import type { IGlobalError } from '../../../shared/types/error.types';
import { parseApiError } from '../../../shared/api/error/normalizeResError';

interface ITrackState {
  tracks: ITrack[];
  fetchLoading: boolean;
  getTracks: (album_id: string) => Promise<ITrack[]>;
  clearTracks: () => void;
  error: IGlobalError | null;
}

export const useTracksStore = create<ITrackState>()(
  devtools(
    (set) => ({
      tracks: [],
      fetchLoading: false,
      error: null,

      clearTracks: () => {
        set({ tracks: [] });
      },

      getTracks: async (album_id: string) => {
        set({ fetchLoading: true, error: null });
        try {
          const tracks = await getTracks(album_id);
          set({ fetchLoading: false, tracks });
        } catch (error) {
          set({
            fetchLoading: false,
            error: parseApiError(error as IGlobalError),
          });

          throw error;
        }
      },
    }),
    {
      name: 'trackStore',
      enabled: true,
    },
  ),
);
