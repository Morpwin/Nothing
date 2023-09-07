export enum ROUTE {
  'index' = 'index',
}

export default interface RouterParams extends Record<ROUTE, any> {
  [ROUTE.index]: {};
}
