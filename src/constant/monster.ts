import { Monster } from '@/types/monster.type';

import { getHp } from './goods';

export const genMaster: () => Monster[] = () => {
  const arr = new Array(1000).fill(0).map((item, index) => {
    return {
      level: index + 1,
      hp: getHp(index + 1),
      gold: 10 + index * 10,
    };
  });
  return arr as Monster[];
};
