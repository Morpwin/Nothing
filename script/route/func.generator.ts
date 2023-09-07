/**
 * 生成路由函数，供B端使用
 */
import { RouteConfigItem } from '.';

export default function generateRouteFunc(routeConfigItem: RouteConfigItem[]) {
  const funcs: Record<string, string> = {};

  routeConfigItem.forEach((item) => {
    if (item.name === '网关') return;
    const params: Record<string, any> = {};
    let paramsLiteral = '&';
    item.params?.forEach((param) => {
      params[param] = 'any';

      // 移除参数中的?
      const paramWithoutType = param.replace('?', '');
      paramsLiteral += paramWithoutType + '=${' + paramWithoutType + '}&';
    });

    if (Array.isArray(item.aliases)) {
      item.aliases.forEach((alias) => {
        funcs[alias] =
          `(${genParamsDef(params)})=>/pages/main/hub/index?to=${item.aliases}${paramsLiteral}`
            .replaceAll('"', '')
            .replace('=>', '=>`') + '`';
      });
    } else {
      funcs[item.aliases] =
        `(${genParamsDef(params)})=>/pages/main/hub/index?to=${item.aliases}${paramsLiteral}`
          .replaceAll('"', '')
          .replace('=>', '=>`') + '`';
    }
  });

  // !! 暂时不生成文件了，有bug，忽略不掉
  // fs.writeFileSync(
  //   path.join(__dirname, './functest.ts'),
  //   `
  //   const routeFactory = ${JSON.stringify(funcs).replaceAll('"', '')}
  //   export default routeFactory
  // `,
  // );
  // formatFile(path.join(__dirname, './functest.ts'));
}

/**
 * 生成参数类型定义
 * @param params
 */
const genParamsDef = (params: Record<string, any>) => {
  if (Object.keys(params).length === 0) return '';
  // 生成参数参数.... {to}:{to:any}的前半部分
  let p = '{';
  Object.keys(params).forEach((key) => {
    p += key.replace('?', '') + ',';
  });
  p += '}';

  return `${p}:${JSON.stringify(params)}`;
};
