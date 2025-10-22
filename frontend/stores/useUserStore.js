import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export const hasPermission = (perm) => {
  const user = useUserStore.getState().user;
  const permissions = user?.permissions || [];

  if (Array.isArray(perm)) {
    return perm.some(item => permissions.includes(item));
  }

  return permissions.includes(perm);
};

