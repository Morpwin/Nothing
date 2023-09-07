export enum ROUTE {
  'index' = 'index',
  'resource' = 'resource',
}

export default interface RouterParams extends Record<ROUTE, any> {
  [ROUTE.index]: {};
  [ROUTE.resource]: {};
}
