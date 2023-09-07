export default {
  /** PAGE_START */

  pages: ['pages/index/index', 'pages/resource/index'],
  subpackages: [],

  /** PAGE_END */

  tabBar: {
    /** TABBAR_START */

    list: [
      { pagePath: 'pages/index/index', text: '岛屿' },
      { pagePath: 'pages/resource/index', text: '资源' },
    ],

    /** TABBAR_END */
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
};
