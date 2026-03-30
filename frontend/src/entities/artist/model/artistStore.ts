import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IArtist } from './artist.types';
import { getArtists } from '../service/artist.service';

interface IArtistState {
  artists: IArtist[];
  fetchLoading: boolean;
  getArtists: () => Promise<IArtist[]>;
  error: string | null;
}

export const useArtistStore = create<IArtistState>()(
  devtools(
    (set) => ({
      artists: [],
      getLoading: false,
      error: null,

      getArtists: async () => {
        set({ fetchLoading: true, error: null });
        try {
          const artists = await getArtists();
          set({ fetchLoading: false, artists });
        } catch (error) {
          if (error instanceof Error) {
            set({ fetchLoading: false, error: error.message });
          }
        }
      },
    }),
    {
      name: 'artistStore',
      enabled: true,
    },
  ),
);
