import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IArtist } from './artist.types';
import { getArtist, getArtists } from '../service/artist.service';
import type { IGlobalError } from '../../../shared/types/error.types';
import { parseApiError } from '../../../shared/api/error/normalizeResError';

interface IArtistState {
  artists: IArtist[];
  artist: IArtist | null;
  fetchLoading: boolean;
  getArtists: () => Promise<IArtist[]>;
  getArtist: (artist_id: string) => Promise<IArtist>;
  clearArtists: () => void;
  clearArtist: () => void;
  error: IGlobalError | null;
}

export const useArtistStore = create<IArtistState>()(
  devtools(
    (set) => ({
      artists: [],
      artist: null,
      getLoading: false,
      error: null,

      clearArtists: () => {
        set({ artists: [] });
      },

      clearArtist: () => {
        set({ artist: null });
      },

      getArtists: async () => {
        set({ fetchLoading: true, error: null });
        try {
          const artists = await getArtists();
          set({ fetchLoading: false, artists });
        } catch (error) {
          set({
            fetchLoading: false,
            error: parseApiError(error as IGlobalError),
          });

          throw error;
        }
      },

      getArtist: async (artist_id: string) => {
        set({ fetchLoading: true, error: null });
        try {
          const artist = await getArtist(artist_id);
          set({ fetchLoading: false, artist });
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
      name: 'artistStore',
      enabled: true,
    },
  ),
);
