import { View } from '@tarojs/components';

import styles from './index.module.less';

export default function Index() {
  return (
    <View className={styles['page']}>
      <View>
        <View>你现在在一个荒岛上，一无所有...</View>
        <View>你现在在一个荒岛上，一无所有...</View>
        <View>你现在在一个荒岛上，一无所有...</View>
        <View>你现在在一个荒岛上，一无所有...</View>
      </View>
    </View>
  );
}
