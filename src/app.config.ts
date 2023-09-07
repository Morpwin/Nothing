export default {
  /** PAGE_START */

  pages: ['pages/index/index'],
  subpackages: [],

  /** PAGE_END */

  tabBar: {
    custom: true,
    /** TABBAR_START */

    list: [{ pagePath: 'pages/index/index', text: '首页' }],

    /** TABBAR_END */
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
};
