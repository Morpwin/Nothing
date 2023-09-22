import { useUserStore } from '@/store';
import { Part } from '@/types/goods.type';

import { View } from '@tarojs/components';

import styles from './index.module.less';

import MineWear from './module/wear';

export default function Mine() {
  const { wear } = useUserStore((state) => state);

  return (
    <View className={styles['page']}>
      <View>
        <MineWear part={Part.weapon} />
        <MineWear part={Part.head} />
        <MineWear part={Part.body} />
        <MineWear part={Part.hand} />
        <MineWear part={Part.leg} />
        <MineWear part={Part.ring} />
      </View>
    </View>
  );
}
