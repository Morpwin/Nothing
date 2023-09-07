import { create } from 'zustand';
import { configInit } from './constant';
import { Building, Resource, Science } from './types';

export interface Config {
  level: number;
  foodRate: number;
  user: {
    id: string;
    dps: number;
    hp: number;
    equipment: {
      body?: any;
      weapon?: any;
    };
  }[];
  building: Record<
    Building,
    {
      value: number;
    }
  >;
  resource: Record<
    Resource,
    {
      value: number;
      rate: number;
      lock: boolean;
    }
  >;
  science: Record<
    Science,
    {
      need: {
        key: any;
        value: any;
      }[];
      result?: {
        key: any;
        value: any;
      }[];
      lock: boolean;
    }
  >;
}

export const useConfigStore = create<Config>((set, get) => ({
  ...configInit,
}));
