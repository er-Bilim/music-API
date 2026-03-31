import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IArtist } from './artist.types';
import { getArtist, getArtists } from '../service/artist.service';

interface IArtistState {
  artists: IArtist[];
  artist: IArtist | null;
  fetchLoading: boolean;
  getArtists: () => Promise<IArtist[]>;
  getArtist: (artist_id: string) => Promise<IArtist>;
  error: string | null;
}

export const useArtistStore = create<IArtistState>()(
  devtools(
    (set) => ({
      artists: [],
      artist: null,
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

      getArtist: async (artist_id: string) => {
        set({ fetchLoading: true, error: null });
        try {
          const artist = await getArtist(artist_id);
          set({ fetchLoading: false, artist });
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
