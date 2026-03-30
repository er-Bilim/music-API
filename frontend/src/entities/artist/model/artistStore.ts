import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IArtist } from './artist.types';
import { getArtists } from '../service/artist.service';

interface IArtistState {
  artists: IArtist[];
  getLoading: boolean;
  getArtists: () => Promise<IArtist[]>;
}

export const useArtistStore = create<IArtistState>()(
  devtools((set) => ({
    artists: [],
    getLoading: false,

    getArtists: async () => {
      const artists = await getArtists();
      set({ artists });
    },
  })),
);
