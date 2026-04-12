import { create } from 'zustand';
import type { IAlbum, IAlbumMutation } from './album.types';
import { devtools } from 'zustand/middleware';
import {
  createAlbumService,
  deleteAlbumService,
  getAlbum,
  getAlbums,
  togglePublishedAlbumService,
} from '../service/album.service';
import type {
  IGlobalError,
  IValidationError,
} from '../../../shared/types/error.types';
import { parseApiError } from '../../../shared/api/error/normalizeResError';
import { toast } from 'react-toastify';

interface IAlbumState {
  albums: IAlbum[];
  album: IAlbum | null;

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  getArtistAlbums: (artist_id: string) => Promise<void>;
  getArtistAlbum: (album_id: string) => Promise<void>;
  createAlbum: (data: IAlbumMutation) => Promise<void>;
  togglePublishAlbum: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;

  clearAlbums: () => void;
  clearAlbum: () => void;

  error: IGlobalError | null;
  createError: IValidationError | null;
}

export const useAlbumStore = create<IAlbumState>()(
  devtools(
    (set) => ({
      albums: [],
      album: null,
      fetchLoading: false,
      createLoading: false,
      error: null,
      createError: null,

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

          throw error;
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

          throw error;
        }
      },

      createAlbum: async (data: IAlbumMutation) => {
        set({ createLoading: true, createError: null });
        try {
          const createdAlbum = await createAlbumService(data);
          toast.success(createdAlbum.message);
          set({ createLoading: false });
        } catch (error) {
          set({
            createLoading: false,
            createError: parseApiError(error as IValidationError),
          });
          throw error;
        }
      },

      togglePublishAlbum: async (id) => {
        set({ updateLoading: true, error: null });
        try {
          await togglePublishedAlbumService(id);
          set({ updateLoading: false });
        } catch (error) {
          set({
            updateLoading: false,
            error: parseApiError(error as IGlobalError),
          });

          throw error;
        }
      },

      deleteAlbum: async (id) => {
        set({ deleteLoading: true, error: null });

        try {
          const deletedArtist = await deleteAlbumService(id);
          set({ deleteLoading: false });
          toast.success(deletedArtist.message);
        } catch (error) {
          set({
            deleteLoading: false,
            error: parseApiError(error as IGlobalError),
          });

          throw error;
        }
      },
    }),
    {
      name: 'albumStore',
      enabled: true,
    },
  ),
);
