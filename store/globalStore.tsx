import { create } from "zustand";

type GlobalStoreType = {
  isAddEmployeeOpen: boolean;
  setIsAddEmployeeOpen: (v: boolean) => void;

  isDeleteEmployeeOpen: boolean;
  setIsDeleteEmployeeOpen: (v: boolean) => void;

  isUpdatePayrollOpen: boolean;
  setIsUpdatePayrollOpen: (v: boolean) => void;

  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (v: boolean) => void;
};

export const useGlobalStore = create<GlobalStoreType>((set) => ({
  isAddEmployeeOpen: false,
  setIsAddEmployeeOpen: (v) => set(() => ({ isAddEmployeeOpen: v })),

  isDeleteEmployeeOpen: false,
  setIsDeleteEmployeeOpen: (v) => set(() => ({ isDeleteEmployeeOpen: v })),

  isUpdatePayrollOpen: false,
  setIsUpdatePayrollOpen: (v) => set(() => ({ isUpdatePayrollOpen: v })),

  isNotificationsOpen: false,
  setIsNotificationsOpen: (v) => set(() => ({ isNotificationsOpen: v })),
}));
