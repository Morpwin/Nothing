import FloatNum from '@/components/float_num';
import GoldImg from '@/static/image/gold.png';
import { useUserStore } from '@/store';

import { Image, View } from '@tarojs/components';

import styles from './index.module.less';

interface Props {
  addNumRef: React.Ref<any>;
  roll: number;
}

export default function Header({ addNumRef, roll }: Props) {
  const { gold, goldSpeed, dps, damage, goldSpeedPercent, dpsPercent, damagePercent } = useUserStore((state) => state);

  return (
    <View className={styles.header}>
      <View className={styles.gold}>
        <View className={styles['flex-center']}>
          <Image className={styles['gold--icon']} src={GoldImg} mode="widthFix" />
          <View>: {gold.toFixed(0)}</View>
          <View className={styles['gold--speed']}>+{(goldSpeed * (1 + goldSpeedPercent / 100)).toFixed(2)}/s</View>
        </View>
        <FloatNum ref={addNumRef} roll={roll} />
      </View>
      <View className={styles.damage}>
        <View className={styles['flex-center']}>
          <View>damage: {(damage * (1 + damagePercent / 100)).toFixed(2)}</View>
          <View className={styles['damage--speed']}>{(dps * (1 + dpsPercent / 100)).toFixed(2)}/s</View>
        </View>
      </View>
    </View>
  );
}
