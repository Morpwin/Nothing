import { Goods, Part, Quality } from '@/types/goods.type';
import { random } from 'lodash-es';

export const genGoods = (quality: Quality) => {
  const goods: Goods[] = [
    {
      name: 'weapon1',
      quality: Quality.normal,
      part: Part.weapon,
      weight: 10,
      property: {
        goldPercent: random(1, 50),
        goldSpeedPercent: random(1, 50),
        dpsPercent: random(1, 50),
        damagePercent: random(1, 50),
      },
    },
    {
      name: 'head1',
      quality: Quality.normal,
      part: Part.head,
      weight: 50,
      property: {
        goldPercent: random(1, 50),
        goldSpeedPercent: random(1, 50),
      },
    },
    {
      name: 'body1',
      quality: Quality.normal,
      part: Part.body,
      weight: 50,
      property: {
        goldPercent: random(1, 30),
        goldSpeedPercent: random(1, 30),
        dpsPercent: random(1, 30),
        damagePercent: random(1, 30),
      },
    },
    {
      name: 'hand1',
      quality: Quality.normal,
      part: Part.hand,
      weight: 100,
      property: {
        dpsPercent: random(1, 10),
        damagePercent: random(1, 30),
      },
    },
    {
      name: 'leg1',
      quality: Quality.normal,
      part: Part.leg,
      weight: 100,
      property: {
        dpsPercent: random(1, 30),
        damagePercent: random(1, 10),
      },
    },
    {
      name: 'ring1',
      quality: Quality.normal,
      part: Part.ring,
      weight: 100,
      property: {
        goldPercent: random(1, 10),
        goldSpeedPercent: random(1, 30),
      },
    },
    {
      name: 'ring2',
      quality: Quality.normal,
      part: Part.ring,
      weight: 100,
      property: {
        goldPercent: random(1, 30),
        goldSpeedPercent: random(1, 10),
      },
    },
  ];
  return goods.filter((item) => item.quality === quality);
};
