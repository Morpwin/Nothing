import { Goods, Part } from '@/types/goods.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getStorageSync, removeStorageSync, setStorageSync } from '@tarojs/taro';

const initialValue: UserData = {
  level: {
    max: 1,
    current: 1,
  },
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
  level: {
    max: number;
    current: number;
  };
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
  setWear: (data: Goods) => void;
  setLevel: (data: number) => void;
  reset: () => void;
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
        const _data = get().goldPercent + data;
        set((state) => ({ goldPercent: _data }));
      },
      setGoldSpeedPercent: (data) => {
        const _data = get().goldSpeedPercent + data;
        set((state) => ({
          goldSpeedPercent: _data,
        }));
      },
      setDpsPercent: (data) => {
        const _data = get().dpsPercent + data;
        set((state) => ({ dpsPercent: _data }));
      },
      setDamagePercent: (data) => {
        const _data = get().damagePercent + data;
        set((state) => ({ damagePercent: _data }));
      },
      setWear: (data) => {
        const part = data.part;
        if (!part) return;
        set((state) => ({ wear: { ...state.wear, [part]: data } }));
      },
      setLevel: (data) => {
        const level = get().level;
        if (data > level.max) {
          set({ level: { max: data, current: data } });
        } else {
          set({ level: { max: level.max, current: data } });
        }
      },
      reset: () => {
        set({
          goldPercent: initialValue.goldPercent,
          goldSpeedPercent: initialValue.goldSpeedPercent,
          dpsPercent: initialValue.dpsPercent,
          damagePercent: initialValue.damagePercent,
        });
      },
    }),
    {
      name: '__USER_INFO__',
      partialize: (state) => state,
      storage: asyncLocalStorage,
    },
  ),
);
