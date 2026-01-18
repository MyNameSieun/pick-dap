import { create } from 'zustand';
import { combine } from 'zustand/middleware';

const initialState = {
  isEditMode: false,
  selectedIds: [] as number[],
};

export const useEditStore = create(
  combine(initialState, (set) => ({
    setEditMode: (mode: boolean) => {
      set({ isEditMode: mode, selectedIds: [] });
    },

    toggleSelectedId: (id: number) => {
      set((state) => ({
        selectedIds: state.selectedIds.includes(id)
          ? state.selectedIds.filter((itemId) => itemId !== id)
          : [...state.selectedIds, id],
      }));
    },

    resetSelectedIds: () => {
      set({ selectedIds: [] });
    },
  })),
);

export const useIsEditMode = () => useEditStore((store) => store.isEditMode);

export const useSelectedIds = () => useEditStore((store) => store.selectedIds);

export const useEditActions = () => {
  const setEditMode = useEditStore((store) => store.setEditMode);
  const toggleSelectedId = useEditStore((store) => store.toggleSelectedId);
  const resetSelectedIds = useEditStore((store) => store.resetSelectedIds);

  return {
    setEditMode,
    toggleSelectedId,
    resetSelectedIds,
  };
};
