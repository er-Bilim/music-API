import { create } from 'zustand';
import type { IAlbum } from './album.types';
import { devtools } from 'zustand/middleware';
import { getAlbums } from '../service/album.service';

interface IAlbumState {
  albums: IAlbum[];
  fetchLoading: boolean;
  getArtistAlbums: (artist_id: string) => Promise<IAlbum[]>;
  clearAlbums: () => void;
  error: string | null;
}

export const useAlbumStore = create<IAlbumState>()(
  devtools(
    (set) => ({
      albums: [],
      fetchLoading: false,
      error: null,

      clearAlbums: () => {
        set({ albums: [] });
      },

      getArtistAlbums: async (artist_id: string) => {
        set({ fetchLoading: true, error: null });
        try {
          const albums = await getAlbums(artist_id);
          set({ fetchLoading: false, albums });
        } catch (error) {
          if (error instanceof Error) {
            set({ fetchLoading: false, error: error.message });
          }
        }
      },
    }),
    {
      name: 'albumStore',
      enabled: true,
    },
  ),
);
