import Header from '@/components/header';
import { genMaster } from '@/constant/monster';
import { useUserStore } from '@/store';
import { Monster } from '@/types/monster.type';
import dayjs from 'dayjs';
import { padEnd } from 'lodash-es';
import { useEffect, useMemo, useRef, useState } from 'react';

import { View } from '@tarojs/components';
import { useDidHide, useDidShow } from '@tarojs/taro';

import styles from './index.module.less';

export default function Challenge() {
  const { setGold, dps, damage, level, dpsPercent, damagePercent, setLevel } = useUserStore((state) => state);
  const [time, setTime] = useState('');
  const [hp, setHp] = useState(50);
  const [monster, setMonster] = useState<Monster[]>([]);

  const countDownRef = useRef<any>(null);
  const dpsRef = useRef<any>(null);
  const addNumRef = useRef<any>(null);

  const currentMonster = useMemo(() => {
    return monster.find((item) => item.level === level.current) || monster[monster.length - 1];
  }, [monster, level]);

  const realDps = +(dps * (1 + dpsPercent / 100)).toFixed(2);
  const realDamage = +(damage * (1 + damagePercent / 100)).toFixed(2);

  useEffect(() => {
    setMonster(genMaster());
  }, []);

  useEffect(() => {
    if (parseInt(time) <= 0) {
      resetCountDown();
      resetAutoAttack();
    }
  }, [time]);

  useEffect(() => {
    if (hp <= 0) {
      if (level.current === level.max) {
        setLevel(level.current + 1);
      }
      setGold(addNumRef.current?.setNum());
      resetCountDown();
      resetAutoAttack();
    }
  }, [hp]);

  useDidShow(() => {
    countDown();
    autoAttack();
  });

  useDidHide(() => {
    cancelAnimationFrame(countDownRef.current);
    clearInterval(dpsRef.current);
  });

  const countDown = () => {
    const end = dayjs().add(29, 's');

    const step = () => {
      const diff = dayjs().diff(end, 'millisecond') * -1;
      if (diff < 0) {
        setTime('0:00');
      } else {
        setTime(`${(diff / 1000).toFixed()}:${padEnd((diff % 1000).toFixed().slice(0, 2), 2, '0')}`);
      }
      countDownRef.current = requestAnimationFrame(step);
    };

    countDownRef.current = requestAnimationFrame(step);
  };

  const resetCountDown = () => {
    cancelAnimationFrame(countDownRef.current);
    countDown();
  };

  const resetAutoAttack = () => {
    clearInterval(dpsRef.current);
    autoAttack();
  };

  const autoAttack = () => {
    setHp(currentMonster.hp || 0);
    dpsRef.current = setInterval(() => {
      setHp((preData) => {
        if (preData - realDps < 0) {
          return 0;
        } else {
          return Math.floor(preData - realDps);
        }
      });
    }, 1000);
  };

  const handleClickCenter = () => {
    setHp((preData) => {
      if (preData - realDamage < 0) {
        return 0;
      } else {
        return Math.floor(preData - realDamage);
      }
    });
  };

  const prev = () => {
    if (level.current === 1) return;
    setLevel(level.current - 1);
    resetCountDown();
    resetAutoAttack();
  };

  const next = () => {
    if (level.current >= level.max) return;
    setLevel(level.current + 1);
    resetCountDown();
    resetAutoAttack();
  };

  if (!currentMonster) return null;

  return (
    <View className={styles.page}>
      <Header addNumRef={addNumRef} roll={currentMonster.gold} />
      <View className={styles.main}>
        <View className={styles['main--time']}>{time}</View>
        <View className={styles['main--level']}>lv{level.current}</View>
        <View className={styles.wrapper}>
          <View className={styles['wrapper--left']} onClick={prev}>
            left
          </View>
          <View className={styles['wrapper--center']} onClick={handleClickCenter}>
            center
          </View>
          <View className={styles['wrapper--right']} onClick={next}>
            right
          </View>
        </View>
        <View className={styles['main--hp']}>
          <View className={styles['main--num']}>{hp}</View>
          <View className={styles['main--mask']} style={{ width: `${(hp / currentMonster.hp) * 100}%` }} />
        </View>
      </View>
    </View>
  );
}
