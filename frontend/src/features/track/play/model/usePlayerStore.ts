import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ITrackHistoryMutation } from '../../../../entities/trackHistory/model/trackHistory.types';
import { servicePlayTrack } from '../service/player.service';

interface IPlayerState {
  isPlay: boolean;
  playTrack: (data: ITrackHistoryMutation) => void;
}

export const usePlayerState = create<IPlayerState>()(
  devtools(
    (set) => ({
      isPlay: false,
      playTrackError: null,

      playTrack: async (data) => {
        set({ isPlay: false });
        try {
          await servicePlayTrack(data);
          set({ isPlay: true });
        } catch (error) {
          console.log(error);
        }
      },
    }),
    {
      name: 'playerStore',
      enabled: true,
    },
  ),
);
