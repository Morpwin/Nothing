import { PropsWithChildren, useEffect, useRef } from 'react';

import { useLaunch } from '@tarojs/taro';

import './app.less';
import { useUserStore } from './store';

function App({ children }: PropsWithChildren<any>) {
  const { setGold, goldSpeed, goldSpeedPercent } = useUserStore((state) => state);

  const timerRef = useRef<any>(null);

  const _goldSpeed = goldSpeed * (1 + goldSpeedPercent / 100);

  useLaunch(() => {
    console.log('App launched.');
  });

  useEffect(() => {
    if (!timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setGold(_goldSpeed);
    }, 1000);
  }, [_goldSpeed]);

  // children 是将要会渲染的页面
  return children;
}

export default App;
