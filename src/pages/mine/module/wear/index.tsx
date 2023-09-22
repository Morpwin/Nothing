import { useUserStore } from '@/store';
import { Part } from '@/types/goods.type';

import { View } from '@tarojs/components';

import styles from './index.module.less';

interface Props {
  part: Part;
}

export default function MineWear({ part }: Props) {
  const { wear } = useUserStore((state) => state);

  return (
    <View className={styles.wrapper}>
      <View className={styles.box}>
        <View>{part}:</View>
        <View className={styles['box--value']}>
          <View>{wear[part]?.name || 'null'}</View>
          {/* <View className={styles['box--icon']} /> */}
        </View>
      </View>
      <View>
        {Object.keys(wear[part]?.property || {}).map((key) => (
          <View className={styles['expand--box']}>
            <View className={styles['expand--label']}>{key}:</View>
            <View>{wear[part]?.property?.[key]}</View>
          </View>
        ))}
      </View>
    </View>
  );
}
