export enum ROUTE {
  'challenge' = 'challenge',
  'index' = 'index',
  'mine' = 'mine',
}

export default interface RouterParams extends Record<ROUTE, any> {
  [ROUTE.challenge]: {};
  [ROUTE.index]: {};
  [ROUTE.mine]: {};
}
