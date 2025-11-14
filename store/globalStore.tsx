import { create } from "zustand";

type GlobalStoreType = {
  isAddEmployeeOpen: boolean;
  setIsAddEmployeeOpen: (v: boolean) => void;

  isDeleteEmployeeOpen: boolean;
  setIsDeleteEmployeeOpen: (v: boolean) => void;
  employeeToDelId: { id: string; name: string };
  setEmployeeToDelId: (v: { id: string; name: string }) => void;

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
  employeeToDelId: { id: "", name: "" },
  setEmployeeToDelId: (v) => set(() => ({ employeeToDelId: v })),

  isUpdatePayrollOpen: false,
  setIsUpdatePayrollOpen: (v) => set(() => ({ isUpdatePayrollOpen: v })),

  isNotificationsOpen: false,
  setIsNotificationsOpen: (v) => set(() => ({ isNotificationsOpen: v })),
}));
