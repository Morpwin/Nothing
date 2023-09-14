import Header from '@/components/header';
import { clickRoll } from '@/constant/roll';
import useRoll from '@/hook/useRoll';
import { useUserStore } from '@/store';
import dayjs from 'dayjs';
import { padEnd } from 'lodash-es';
import { useRef, useState } from 'react';

import { View } from '@tarojs/components';
import { useDidHide, useDidShow } from '@tarojs/taro';

import styles from './index.module.less';

export default function Challenge() {
  const { setGold, dps, damage } = useUserStore((state) => state);
  const [time, setTime] = useState('');
  const [hp, setHp] = useState(50);

  const { roll } = useRoll();

  const countDownRef = useRef<any>(null);
  const dpsRef = useRef<any>(null);
  const addNumRef = useRef<any>(null);

  const countDown = () => {
    const end = dayjs().add(29, 's');

    const step = () => {
      const diff = dayjs().diff(end, 'millisecond');
      if (diff < 0) {
        countDownRef.current = requestAnimationFrame(step);
        setTime(
          `${Math.abs(diff / 1000).toFixed()}:${padEnd(
            Math.abs(diff % 1000)
              .toFixed()
              .slice(0, 2),
            2,
            '0',
          )}`,
        );
      } else {
        /** 清除计时器 */
        clearInterval(dpsRef.current);
        /** 重新计算 */
        ttk();
        countDown();
      }
    };

    countDownRef.current = requestAnimationFrame(step);
  };

  const ttk = () => {
    setHp(50);
    dpsRef.current = setInterval(() => {
      setHp((preData) => {
        if (preData - dps < 0) {
          cancelAnimationFrame(countDownRef.current);
          countDown();
          return 50;
        } else {
          return preData - dps;
        }
      });
    }, 1000);
  };

  useDidShow(() => {
    countDown();
    ttk();
  });

  useDidHide(() => {
    cancelAnimationFrame(countDownRef.current);
    clearInterval(dpsRef.current);
  });

  const handleClickCenter = () => {
    setHp((preData) => {
      if (preData - damage < 0) {
        cancelAnimationFrame(countDownRef.current);
        countDown();
        return 50;
      } else {
        return preData - damage;
      }
    });
  };

  return (
    <View className={styles.page}>
      <Header addNumRef={addNumRef} roll={roll(clickRoll)} />
      <View className={styles.main}>
        <View className={styles['main--time']}>{time}</View>
        <View className={styles['main--level']}>lv1</View>
        <View className={styles.wrapper}>
          <View className={styles['wrapper--left']}>left</View>
          <View className={styles['wrapper--center']} onClick={handleClickCenter}>
            center
          </View>
          <View className={styles['wrapper--right']}>right</View>
        </View>
        <View className={styles['main--hp']}>
          <View className={styles['main--num']}>{hp}</View>
          <View className={styles['main--mask']} style={{ width: `${(hp / 50) * 100}%` }} />
        </View>
      </View>
    </View>
  );
}
