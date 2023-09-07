import ROUTE_ALIASES_MAP from '@/service/route/aliases_to_path.type';
import { queryString } from '@/utils/qs';

import Taro, { getCurrentPages, navigateBack, reLaunch } from '@tarojs/taro';

import RouterParams, { ROUTE } from './params.type';

type RouteMethod = 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab';

type NaviType = <T extends ROUTE>(path: T, params?: RouterParams[T], force?: boolean) => Promise<boolean>;

/**
 * @description: 基础路由跳转方法
 * @param {string} method 跳转的方法
 * @return {NaviType} 该路由跳转方法的函数
 */
const baseRouterHandle =
  (method: RouteMethod): NaviType =>
  <T extends ROUTE>(path: T, params?: RouterParams[T], force = false): Promise<boolean> => {
    // 未传入route跳转到首页
    if (!path) {
      relaunchToIndex();
      return Promise.resolve(false);
    }

    // 判断路由是否正确
    const page = ROUTE_ALIASES_MAP[path];
    if (!page) {
      console.error('获取路由配置失败 ', page);
      return Promise.resolve(false);
    }

    // 判断page是否为当前路由
    if (!force && checkCurrentRoute(page)) {
      return Promise.resolve(false);
    }

    // 将参数拼接到路由上，switchTab路径后不能带参数
    const url = method === 'switchTab' ? page : `${page}${queryString(params)}`;

    console.log('跳转路由', page);
    params && console.table(params);

    return new Promise((resolve) => {
      Taro[method]({
        url: url,
        fail: () => resolve(false),
        success: () => resolve(true),
      });
    });
  };

export const navi = baseRouterHandle('navigateTo');

export const naviRedirect = baseRouterHandle('redirectTo');

export const naviRelaunch = baseRouterHandle('reLaunch');

export const naviSwitchTab = baseRouterHandle('switchTab');

/**
 *  返回上一页
 */
export const naviBack = () => {
  const length = getCurrentPages()?.length;

  if (length === 1) {
    return relaunchToIndex();
  }

  return navigateBack();
};

/**
 * 重启到首页
 */
export const relaunchToIndex = (force = false) => {
  const route = getCurrentRoute();
  if (!force && `/${route}` === ROUTE_ALIASES_MAP.index) return;

  reLaunch({
    url: ROUTE_ALIASES_MAP.index,
  });
};

/**
 * 获取当前页面路由路径
 */
export const getCurrentRoute = (): string => {
  const pages = getCurrentPages();
  return pages?.[pages.length - 1]?.route ?? '';
};

/**
 * 校验当前页面路由路径
 */
export const checkCurrentRoute = (path: ROUTE_ALIASES_MAP) => {
  const route = getCurrentRoute();
  return `/${route}` === path;
};
