import { create } from "zustand";
import { createJSONStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";

interface PhotoState {
  photoData: {
    id: number;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
  } | null;
  setPhotoData: (data: PhotoState["photoData"]) => void;
}

export const usePhotoStore = create<PhotoState>()(
  persist(
    (set) => ({
      photoData: null,
      setPhotoData: (data) => set({ photoData: data }),
    }),
    {
      name: "photo-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
