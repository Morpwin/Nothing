import { Config } from './config';
import { Building, Resource, Science } from './types';

export const configInit: Config = {
  level: 1,
  foodRate: 0.5,
  user: [
    {
      id: 'admin',
      dps: 5,
      hp: 100,
      equipment: {},
    },
  ],
  building: {
    [Building.house]: {
      value: 0,
    },
    [Building.loggingCamp]: {
      value: 0,
    },
    [Building.quarry]: {
      value: 0,
    },
    [Building.weaponShop]: {
      value: 0,
    },
  },
  resource: {
    [Resource.wood]: {
      value: 0,
      rate: 0,
      lock: true,
    },
    [Resource.stone]: {
      value: 0,
      rate: 0,
      lock: false,
    },
    [Resource.food]: {
      value: 0,
      rate: 0,
      lock: false,
    },
    [Resource.bone]: {
      value: 0,
      rate: 0,
      lock: false,
    },
    [Resource.fur]: {
      value: 0,
      rate: 0,
      lock: false,
    },
  },
  science: {
    // [Science.zax]: {
    //   need: [
    //     {
    //       key: Resource.stone,
    //       value: 500,
    //     },
    //   ],
    //   result: [
    //     {
    //       key: Resource.stone,
    //       value: 0.5,
    //     },
    //   ],
    //   lock: false,
    // },
    [Science.loggingCamp]: {
      need: [
        {
          key: Resource.wood,
          value: 50,
        },
      ],
      lock: false,
    },
    [Science.quarry]: {
      need: [
        {
          key: Resource.wood,
          value: 1000,
        },
      ],
      lock: false,
    },
    [Science.house]: {
      need: [
        {
          key: Resource.wood,
          value: 100,
        },
      ],
      lock: false,
    },
    [Science.weaponShop]: {
      need: [
        {
          key: Resource.wood,
          value: 2000,
        },
        {
          key: Resource.stone,
          value: 500,
        },
      ],
      lock: false,
    },
  },
};
