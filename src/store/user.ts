import { Goods, Part } from '@/types/goods.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getStorageSync, removeStorageSync, setStorageSync } from '@tarojs/taro';

const initialValue: UserData = {
  gold: 0,
  goldPercent: 0,
  goldSpeed: 1,
  goldSpeedPercent: 0,
  dps: 1,
  dpsPercent: 0,
  damage: 1,
  damagePercent: 0,
  wear: {
    head: undefined,
    body: undefined,
    weapon: undefined,
    hand: undefined,
    leg: undefined,
    ring: undefined,
  },
};

export interface UserData {
  gold: number;
  goldPercent: number;
  goldSpeed: number;
  goldSpeedPercent: number;
  dps: number;
  dpsPercent: number;
  damage: number;
  damagePercent: number;
  wear: Record<Part, Goods | undefined>;
}

interface UserFun {
  setGold: (data: number) => void;
  setGoldPercent: (data: number) => void;
  setGoldSpeed: (data: number) => void;
  setGoldSpeedPercent: (data: number) => void;
  setDps: (data: number) => void;
  setDpsPercent: (data: number) => void;
  setDamage: (data: number) => void;
  setDamagePercent: (data: number) => void;
}

export const asyncLocalStorage = {
  getItem: getStorageSync,
  setItem: setStorageSync,
  removeItem: removeStorageSync,
};

export const useUserStore = create<UserData & UserFun>()(
  persist(
    (set, get) => ({
      ...initialValue,
      setGold: (data) => {
        set((state) => ({ gold: state.gold + data }));
      },
      setGoldSpeed: (data) => {
        set((state) => ({ goldSpeed: data }));
      },
      setDps: (data) => {
        set((state) => ({ dps: data }));
      },
      setDamage: (data) => {
        set((state) => ({ damage: data }));
      },
      setGoldPercent: (data) => {
        set((state) => ({ goldPercent: state.goldPercent + data }));
      },
      setGoldSpeedPercent: (data) => {
        set((state) => ({ goldSpeedPercent: state.goldSpeedPercent + data }));
      },
      setDpsPercent: (data) => {
        set((state) => ({ dpsPercent: state.dpsPercent + data }));
      },
      setDamagePercent: (data) => {
        set((state) => ({ damagePercent: state.damagePercent + data }));
      },
    }),
    {
      name: '__USER_INFO__',
      partialize: (state) => state,
      storage: asyncLocalStorage,
    },
  ),
);
