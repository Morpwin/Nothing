import { useUserStore } from '@/store';
import { Goods, Part, Quality } from '@/types/goods.type';
import { random } from 'lodash-es';

export const getHp = (n?: number) => {
  const level = n || useUserStore.getState().level.current;
  return Math.floor(10 * Math.E ** (0.1 * level) + 10 * level + 30);
};

export const genGoods = (quality: Quality) => {
  const level = useUserStore.getState().level.current;
  const normalGold = Math.round(random(1, 100));
  const normalGoldSpeed = Math.round(random(1, 75));
  const normalDps = Math.round(random(1, (getHp(Math.max(level, 20)) / 30 / 6) * 100));
  const normalDamage = Math.round(random(1, (getHp(Math.max(level, 20)) / 30 / 6) * 100));

  const normalGoods: Goods[] = [
    {
      name: 'weapon1',
      quality: Quality.normal,
      part: Part.weapon,
      weight: 10,
      property: {
        goldPercent: normalGold,
        goldSpeedPercent: normalGoldSpeed,
        dpsPercent: Math.round(random(1, (getHp(Math.max(level, 20)) / 20 / 6) * 100)),
        damagePercent: Math.round(random(1, (getHp(Math.max(level, 20)) / 20 / 6) * 100)),
      },
    },
    {
      name: 'weapon2',
      quality: Quality.normal,
      part: Part.weapon,
      weight: 10,
      property: {
        goldPercent: Math.round(random(1, 150)),
        goldSpeedPercent: Math.round(random(1, 125)),
        dpsPercent: normalDps,
        damagePercent: normalDamage,
      },
    },
    {
      name: 'head1',
      quality: Quality.normal,
      part: Part.head,
      weight: 50,
      property: {
        goldPercent: normalGold,
        goldSpeedPercent: normalGoldSpeed,
      },
    },
    {
      name: 'head2',
      quality: Quality.normal,
      part: Part.head,
      weight: 50,
      property: {
        dpsPercent: normalDps,
        damagePercent: normalDamage,
      },
    },
    {
      name: 'body1',
      quality: Quality.normal,
      part: Part.body,
      weight: 50,
      property: {
        goldPercent: normalGold,
        goldSpeedPercent: normalGoldSpeed,
        dpsPercent: Math.round(random(1, (getHp(Math.max(level, 20)) / 20 / 6) * 100)),
        damagePercent: Math.round(random(1, (getHp(Math.max(level, 20)) / 20 / 6) * 100)),
      },
    },
    {
      name: 'body2',
      quality: Quality.normal,
      part: Part.body,
      weight: 50,
      property: {
        goldPercent: Math.round(random(1, 150)),
        goldSpeedPercent: Math.round(random(1, 125)),
        dpsPercent: normalDps,
        damagePercent: normalDamage,
      },
    },
    {
      name: 'hand1',
      quality: Quality.normal,
      part: Part.hand,
      weight: 100,
      property: {
        dpsPercent: normalDps,
        damagePercent: normalDamage,
      },
    },
    {
      name: 'hand2',
      quality: Quality.normal,
      part: Part.hand,
      weight: 100,
      property: {
        goldPercent: normalGold,
        goldSpeedPercent: normalGoldSpeed,
      },
    },
    {
      name: 'leg1',
      quality: Quality.normal,
      part: Part.leg,
      weight: 100,
      property: {
        dpsPercent: normalDps,
        damagePercent: normalDamage,
      },
    },
    {
      name: 'leg1',
      quality: Quality.normal,
      part: Part.leg,
      weight: 100,
      property: {
        goldPercent: normalGold,
        goldSpeedPercent: normalGoldSpeed,
      },
    },
    {
      name: 'ring1',
      quality: Quality.normal,
      part: Part.ring,
      weight: 100,
      property: {
        goldPercent: normalGold,
        goldSpeedPercent: normalGoldSpeed,
      },
    },
    {
      name: 'ring2',
      quality: Quality.normal,
      part: Part.ring,
      weight: 100,
      property: {
        dpsPercent: normalDps,
        damagePercent: normalDamage,
      },
    },
  ];

  const bestGold = Math.round(random(1, 200));
  const bestGoldSpeed = Math.round(random(1, 150));
  const bestDps = Math.round(random(1, (getHp(Math.max(level, 40)) / 30 / 6) * 100));
  const bestDamage = Math.round(random(1, (getHp(Math.max(level, 40)) / 30 / 6) * 100));
  const bestGoods: Goods[] = [
    {
      name: 'weapon3',
      quality: Quality.best,
      part: Part.weapon,
      weight: 10,
      property: {
        goldPercent: bestGold,
        goldSpeedPercent: bestGoldSpeed,
        dpsPercent: bestDps,
        damagePercent: bestDamage,
      },
    },
    {
      name: 'head3',
      quality: Quality.best,
      part: Part.head,
      weight: 50,
      property: {
        goldPercent: bestGold,
        goldSpeedPercent: bestGoldSpeed,
      },
    },
    {
      name: 'head4',
      quality: Quality.best,
      part: Part.head,
      weight: 50,
      property: {
        dpsPercent: bestDps,
        damagePercent: bestDamage,
      },
    },
    {
      name: 'body3',
      quality: Quality.best,
      part: Part.body,
      weight: 50,
      property: {
        goldPercent: bestGold,
        goldSpeedPercent: bestGoldSpeed,
        dpsPercent: bestDps,
        damagePercent: bestDamage,
      },
    },
    {
      name: 'hand3',
      quality: Quality.best,
      part: Part.hand,
      weight: 100,
      property: {
        dpsPercent: bestDps,
        damagePercent: bestDamage,
      },
    },
    {
      name: 'hand4',
      quality: Quality.best,
      part: Part.hand,
      weight: 100,
      property: {
        goldPercent: bestGold,
        goldSpeedPercent: bestGoldSpeed,
      },
    },
    {
      name: 'leg3',
      quality: Quality.best,
      part: Part.leg,
      weight: 100,
      property: {
        dpsPercent: bestDps,
        damagePercent: bestDamage,
      },
    },
    {
      name: 'leg4',
      quality: Quality.best,
      part: Part.leg,
      weight: 100,
      property: {
        goldPercent: bestGold,
        goldSpeedPercent: bestGoldSpeed,
      },
    },
    {
      name: 'ring3',
      quality: Quality.best,
      part: Part.ring,
      weight: 100,
      property: {
        goldPercent: bestGold,
        goldSpeedPercent: bestGoldSpeed,
      },
    },
    {
      name: 'ring4',
      quality: Quality.best,
      part: Part.ring,
      weight: 100,
      property: {
        dpsPercent: bestDps,
        damagePercent: bestDamage,
      },
    },
  ];

  const epicGold = Math.round(random(1, 300));
  const epicGoldSpeed = Math.round(random(1, 225));
  const epicDps = Math.round(random(1, (getHp(Math.max(level, 60)) / 30 / 6) * 100));
  const epicDamage = Math.round(random(1, (getHp(Math.max(level, 60)) / 30 / 6) * 100));
  const epicGoods: Goods[] = [
    {
      name: 'weapon4',
      quality: Quality.epic,
      part: Part.weapon,
      weight: 10,
      property: {
        goldPercent: epicGold,
        goldSpeedPercent: epicGoldSpeed,
        dpsPercent: epicDps,
        damagePercent: epicDamage,
      },
    },
    {
      name: 'head5',
      quality: Quality.epic,
      part: Part.head,
      weight: 50,
      property: {
        goldPercent: epicGold,
        goldSpeedPercent: epicGoldSpeed,
      },
    },
    {
      name: 'head6',
      quality: Quality.epic,
      part: Part.head,
      weight: 50,
      property: {
        dpsPercent: epicDps,
        damagePercent: epicDamage,
      },
    },
    {
      name: 'body4',
      quality: Quality.epic,
      part: Part.body,
      weight: 50,
      property: {
        goldPercent: epicGold,
        goldSpeedPercent: epicGoldSpeed,
        dpsPercent: epicDps,
        damagePercent: epicDamage,
      },
    },
    {
      name: 'hand5',
      quality: Quality.epic,
      part: Part.hand,
      weight: 100,
      property: {
        dpsPercent: epicDps,
        damagePercent: epicDamage,
      },
    },
    {
      name: 'hand6',
      quality: Quality.epic,
      part: Part.hand,
      weight: 100,
      property: {
        goldPercent: epicGold,
        goldSpeedPercent: epicGoldSpeed,
      },
    },
    {
      name: 'leg5',
      quality: Quality.epic,
      part: Part.leg,
      weight: 100,
      property: {
        dpsPercent: epicDps,
        damagePercent: epicDamage,
      },
    },
    {
      name: 'leg6',
      quality: Quality.epic,
      part: Part.leg,
      weight: 100,
      property: {
        goldPercent: epicGold,
        goldSpeedPercent: epicGoldSpeed,
      },
    },
    {
      name: 'ring5',
      quality: Quality.epic,
      part: Part.ring,
      weight: 100,
      property: {
        goldPercent: epicGold,
        goldSpeedPercent: epicGoldSpeed,
      },
    },
    {
      name: 'ring6',
      quality: Quality.epic,
      part: Part.ring,
      weight: 100,
      property: {
        dpsPercent: epicDps,
        damagePercent: epicDamage,
      },
    },
  ];

  const legendGold = Math.round(random(1, 400));
  const legendGoldSpeed = Math.round(random(1, 300));
  const legendDps = Math.round(random(1, (getHp(Math.max(level, 80)) / 30 / 6) * 100));
  const legendDamage = Math.round(random(1, (getHp(Math.max(level, 80)) / 30 / 6) * 100));
  const legendGoods: Goods[] = [
    {
      name: 'weapon5',
      quality: Quality.legend,
      part: Part.weapon,
      weight: 10,
      property: {
        goldPercent: legendGold,
        goldSpeedPercent: legendGoldSpeed,
        dpsPercent: legendDps,
        damagePercent: legendDamage,
      },
    },
    {
      name: 'head7',
      quality: Quality.legend,
      part: Part.head,
      weight: 50,
      property: {
        goldPercent: legendGold,
        goldSpeedPercent: legendGoldSpeed,
      },
    },
    {
      name: 'head8',
      quality: Quality.legend,
      part: Part.head,
      weight: 50,
      property: {
        dpsPercent: legendDps,
        damagePercent: legendDamage,
      },
    },
    {
      name: 'body5',
      quality: Quality.legend,
      part: Part.body,
      weight: 50,
      property: {
        goldPercent: legendGold,
        goldSpeedPercent: legendGoldSpeed,
        dpsPercent: legendDps,
        damagePercent: legendDamage,
      },
    },
    {
      name: 'hand7',
      quality: Quality.legend,
      part: Part.hand,
      weight: 100,
      property: {
        dpsPercent: legendDps,
        damagePercent: legendDamage,
      },
    },
    {
      name: 'hand8',
      quality: Quality.legend,
      part: Part.hand,
      weight: 100,
      property: {
        goldPercent: legendGold,
        goldSpeedPercent: legendGoldSpeed,
      },
    },
    {
      name: 'leg7',
      quality: Quality.legend,
      part: Part.leg,
      weight: 100,
      property: {
        dpsPercent: legendDps,
        damagePercent: legendDamage,
      },
    },
    {
      name: 'leg8',
      quality: Quality.legend,
      part: Part.leg,
      weight: 100,
      property: {
        goldPercent: legendGold,
        goldSpeedPercent: legendGoldSpeed,
      },
    },
    {
      name: 'ring7',
      quality: Quality.legend,
      part: Part.ring,
      weight: 100,
      property: {
        goldPercent: legendGold,
        goldSpeedPercent: legendGoldSpeed,
      },
    },
    {
      name: 'ring8',
      quality: Quality.legend,
      part: Part.ring,
      weight: 100,
      property: {
        dpsPercent: legendDps,
        damagePercent: legendDamage,
      },
    },
  ];
  return [...normalGoods, ...bestGoods, ...epicGoods, ...legendGoods].filter((item) => item.quality === quality);
};
