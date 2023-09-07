import { View } from '@tarojs/components';
import clsx from 'clsx';
import { useState } from 'react';

import styles from './index.module.less';

export default function Index() {
  const [list, setList] = useState(['你现在在一个荒岛上，一无所有...']);

  return (
    <View className={styles['page']}>
      <View>
        <View className={styles['text-container']}>
          {list.map((item, index) => (
            <View key={index} className={clsx(styles['text-row'])}>
              {item}
            </View>
          ))}
        </View>

        <View
          className={styles.btn}
          onClick={() => {
            setList((preData) => {
              if (preData.length < 4) {
                return [...preData, Math.random().toString()];
              } else {
                return [...preData.slice(1), Math.random().toString()];
              }
            });
          }}
        >
          调查
        </View>
      </View>
    </View>
  );
}
