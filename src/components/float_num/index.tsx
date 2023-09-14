import { View } from '@tarojs/components';
import clsx from 'clsx';
import { uniqueId } from 'lodash';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from './index.module.less';

export interface Num {
  id: string;
  value: number;
  show: boolean;
}

interface Props {
  roll: number;
}

const FloatNum = forwardRef(({ roll }: Props, ref) => {
  const [num, setNum] = useState<Num[]>([]);

  useImperativeHandle(ref, () => ({
    setNum: () => {
      setNum((preData) => {
        return [
          {
            id: uniqueId(),
            value: roll,
            show: true,
          },
          ...preData.slice(0, 10),
        ];
      });

      return roll;
    },
  }));

  return (
    <View>
      {num.map((item) => (
        <View
          key={item.id}
          className={clsx(styles.float, item.show && styles['float__animation'])}
          onAnimationEnd={() => {
            setNum((preData) => {
              return preData.map((_item) => {
                if (_item.id === item.id) {
                  return {
                    ..._item,
                    show: false,
                  };
                }

                return _item;
              });
            });
          }}
        >
          +{item.value}
        </View>
      ))}
    </View>
  );
});

export default FloatNum;
