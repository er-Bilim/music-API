import { create } from 'zustand';
import type { IAlbum } from './album.types';
import { devtools } from 'zustand/middleware';
import { getAlbum, getAlbums } from '../service/album.service';
import type { IGlobalError } from '../../../shared/types/error.types';
import { parseApiError } from '../../../shared/api/error/normalizeResError';

interface IAlbumState {
  albums: IAlbum[];
  album: IAlbum | null;
  fetchLoading: boolean;
  getArtistAlbums: (artist_id: string) => Promise<IAlbum[]>;
  getArtistAlbum: (album_id: string) => Promise<IAlbum>;
  clearAlbums: () => void;
  clearAlbum: () => void;
  error: IGlobalError | null;
}

export const useAlbumStore = create<IAlbumState>()(
  devtools(
    (set) => ({
      albums: [],
      album: null,
      fetchLoading: false,
      error: null,

      clearAlbums: () => {
        set({ albums: [] });
      },

      clearAlbum: () => {
        set({ album: null });
      },

      getArtistAlbums: async (artist_id: string) => {
        set({ fetchLoading: true, error: null });
        try {
          const albums = await getAlbums(artist_id);
          set({ fetchLoading: false, albums });
        } catch (error) {
          set({
            fetchLoading: false,
            error: parseApiError(error as IGlobalError),
          });
        }
      },

      getArtistAlbum: async (album_id: string) => {
        set({ fetchLoading: true, error: null });
        try {
          const album = await getAlbum(album_id);
          set({ fetchLoading: false, album });
        } catch (error) {
          set({
            fetchLoading: false,
            error: parseApiError(error as IGlobalError),
          });
        }
      },
    }),
    {
      name: 'albumStore',
      enabled: true,
    },
  ),
);
