import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IArtist, IArtistMutation } from './artist.types';
import {
  createArtistService,
  getArtist,
  getArtists,
} from '../service/artist.service';
import type {
  IGlobalError,
  IValidationError,
} from '../../../shared/types/error.types';
import { parseApiError } from '../../../shared/api/error/normalizeResError';
import { toast } from 'react-toastify';

interface IArtistState {
  artists: IArtist[];
  artist: IArtist | null;

  fetchLoading: boolean;
  createLoading: boolean;

  getArtists: () => Promise<void>;
  getArtist: (artist_id: string) => Promise<void>;
  createArtist: (data: IArtistMutation) => Promise<void>;

  clearArtists: () => void;
  clearArtist: () => void;

  createError: IValidationError | null;
  error: IGlobalError | null;
}

export const useArtistStore = create<IArtistState>()(
  devtools(
    (set) => ({
      artists: [],
      artist: null,
      fetchLoading: false,
      createLoading: false,
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

      createArtist: async (data) => {
        set({ createLoading: true, createError: null });
        try {
          const createdArtist = await createArtistService(data);
          toast.success(createdArtist.message);
          set({ createLoading: false });
        } catch (error) {
          set({
            createLoading: false,
            createError: parseApiError(error as IValidationError),
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
