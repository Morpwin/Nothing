import Header from '@/components/header';
import { genGoods } from '@/constant/goods';
import { clickRoll } from '@/constant/roll';
import useRoll from '@/hook/useRoll';
import { useUserStore } from '@/store';
import { Goods, Quality } from '@/types/goods.type';
import clsx from 'clsx';
import { useRef, useState } from 'react';

import { View } from '@tarojs/components';

import styles from './index.module.less';

const shop: {
  level: Quality;
  gold: number;
}[] = [
  {
    level: Quality.normal,
    gold: 500,
  },
  {
    level: Quality.best,
    gold: 5000,
  },
  {
    level: Quality.epic,
    gold: 50000,
  },
  {
    level: Quality.legend,
    gold: 500000,
  },
];

const power = ['1x', '10x', '100x'];

export default function Index() {
  const { setGold, goldPercent, wear } = useUserStore((state) => state);
  const [entryShop, setEntryShop] = useState<boolean>(false);
  const [goods, setGoods] = useState<Goods[]>([]);
  const [selectGoods, setSelectGoods] = useState<Goods>();

  const _clickRoll = clickRoll.map((item) => ({
    ...item,
    value: Number(item.value) * (1 + goldPercent / 100),
  }));

  const { roll } = useRoll();

  const addNumRef = useRef<any>(null);
  const shopInfo = useRef<{
    level: Quality;
    gold: number;
  }>();

  const add = () => {
    setGold(addNumRef.current?.setNum());
  };

  const entry = (item) => {
    setEntryShop(true);
    shopInfo.current = item;
  };

  const buy = (item) => {
    if (!shopInfo.current?.level) return;
    const count = parseInt(item);
    const goods = genGoods(shopInfo.current?.level);

    const result: Goods[] = [];

    for (let i = 0; i < count; i++) {
      const value = roll(goods.map((item) => ({ value: item.name, weight: item.weight })));
      const item = goods.find((item) => item.name === value);
      if (item) {
        result.push(item);
      }
    }

    setGoods(result);
  };

  const back = () => {
    setEntryShop(false);
    shopInfo.current = undefined;
  };

  return (
    <View className={styles.page}>
      <Header addNumRef={addNumRef} roll={roll(_clickRoll)} />

      <View className={styles.actions}>
        <View className={styles['actions--title']}>title</View>
        <View>
          {!entryShop ? (
            shop.map((item) => (
              <View key={item.level} className={styles.btn} onClick={() => entry(item)}>
                {item.level}
              </View>
            ))
          ) : (
            <View>
              {power.map((item) => (
                <View key={item} className={styles.btn} onClick={() => buy(item)}>
                  {item}
                </View>
              ))}
              <View className={styles.btn} onClick={back}>
                back
              </View>
            </View>
          )}
        </View>
      </View>

      <View>
        {!entryShop && (
          <View className={`${styles.btn} ${styles['btn--add']}`} onClick={add}>
            add
          </View>
        )}
      </View>

      {!!goods.length && (
        <View className={styles.mask}>
          <View className={styles.goods}>
            {goods.map((item, index) => (
              <View key={index} className={clsx(styles['goods--item'], styles[`${item.quality}-border`])}>
                <View className={clsx(styles['goods--name'], styles[`${item.quality}`])}>{item.name}</View>
                <View className={styles['goods--part']}>{item.part}</View>
                {/* <View>
                  {Object.keys(item.property).map((key) => (
                    <View>
                      {key}:{item.property[key]}
                    </View>
                  ))}
                </View> */}
                <View className={styles['goods--action']}>
                  <View
                    onClick={() => {
                      setSelectGoods(item);
                    }}
                  >
                    duibi
                  </View>
                  <View>get</View>
                </View>
              </View>
            ))}
          </View>
          {selectGoods && (
            <View className={styles.compare}>
              <View
                className={clsx(
                  styles['compare--item'],
                  wear[selectGoods.part] && styles[`${wear[selectGoods.part]?.quality}-border`],
                )}
              >
                <View className={styles['compare--title']}>current</View>
                {wear[selectGoods.part] ? (
                  <>
                    <View className={clsx(styles['compare--name'], styles[`${wear[selectGoods.part]?.quality}`])}>
                      {wear[selectGoods.part]?.name}
                    </View>
                    <View className={styles['compare--content']}>
                      {Object.keys(wear[selectGoods.part]?.property || {}).map((key) => (
                        <View key={key}>
                          {key}:{wear[selectGoods?.part || '']?.property?.[key]}
                        </View>
                      ))}
                    </View>
                  </>
                ) : (
                  <View className={clsx(styles['compare--content'], styles['compare--content__nothing'])}>nothing</View>
                )}
              </View>
              <View className={clsx(styles['compare--item'], styles[`${selectGoods.quality}-border`])}>
                <View className={styles['compare--title']}>duibi</View>
                <View className={clsx(styles['compare--name'], styles[`${selectGoods.quality}`])}>
                  {selectGoods?.name}
                </View>
                <View className={styles['compare--content']}>
                  {Object.keys(selectGoods?.property || {}).map((key) => (
                    <View key={key}>
                      {key}:{selectGoods?.property[key]}
                    </View>
                  ))}
                </View>
              </View>
              <View className={styles['compare--footer']}>back</View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
