import { devtools } from 'zustand/middleware';
import type { ITrack, ITrackMutation } from './track.types';
import { create } from 'zustand';
import { createTrackService, deleteTrackService, getTracks, togglePublishedTrackService } from '../service/track.service';
import type {
  IGlobalError,
  IValidationError,
} from '../../../shared/types/error.types';
import { parseApiError } from '../../../shared/api/error/normalizeResError';
import { toast } from 'react-toastify';

interface ITrackState {
  tracks: ITrack[];
  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  getTracks: (album_id: string) => Promise<ITrack[]>;
  createTrack: (data: ITrackMutation) => Promise<void>;
  togglePublishTrack: (id: string) => Promise<void>;
  deleteTrack: (id: string) => Promise<void>;

  clearTracks: () => void;

  createError: IValidationError | null;
  error: IGlobalError | null;
}

export const useTracksStore = create<ITrackState>()(
  devtools(
    (set) => ({
      tracks: [],
      fetchLoading: false,
      createLoading: false,

      createError: null,
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

      createTrack: async (data) => {
        set({ createLoading: true, createError: null });
        try {
          const createdTrack = await createTrackService(data);
          toast.success(createdTrack.message);
        } catch (error) {
          set({
            createLoading: false,
            createError: parseApiError(error as IValidationError),
          });

          throw error;
        }
      },

      togglePublishTrack: async (id) => {
        set({ updateLoading: true, error: null });
        try {
          await togglePublishedTrackService(id);
          set({ updateLoading: false });
        } catch (error) {
          set({
            updateLoading: false,
            error: parseApiError(error as IGlobalError),
          });

          throw error;
        }
      },

      deleteTrack: async (id) => {
        set({ deleteLoading: true, error: null });

        try {
          const deletedArtist = await deleteTrackService(id);
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
      name: 'trackStore',
      enabled: true,
    },
  ),
);
