import { devtools } from 'zustand/middleware';
import type { ITrack } from './track.types';
import { create } from 'zustand';
import { getTracks } from '../service/track.service';

interface ITrackState {
  tracks: ITrack[];
  fetchLoading: boolean;
  getTracks: (album_id: string) => Promise<ITrack[]>;
  clearTracks: () => void;
  error: string | null;
}

export const useTracksStore = create<ITrackState>()(
  devtools((set) => ({
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
        if (error instanceof Error) {
          set({ fetchLoading: false, error: error.message });
        }
      }
    },
  })),
);
