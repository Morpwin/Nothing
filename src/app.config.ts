export default {
  /** PAGE_START */

  pages: ['pages/index/index', 'pages/challenge/index', 'pages/mine/index'],
  subpackages: [],

  /** PAGE_END */

  tabBar: {
    /** TABBAR_START */

    list: [
      { pagePath: 'pages/index/index', text: 'index' },
      { pagePath: 'pages/challenge/index', text: 'challenge' },
      { pagePath: 'pages/mine/index', text: 'mine' },
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
