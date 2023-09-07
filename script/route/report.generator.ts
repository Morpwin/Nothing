import * as fs from 'fs';
import { removeSlashes } from 'slashes';

import { OPTIONS, RouteConfigItem } from '.';
import { formatFile } from './utils';

export default function generateRouteReporter(routeConfigItem: RouteConfigItem[]) {
  const mapper: Record<string, any> = {};
  routeConfigItem.map((config) => {
    if (!config.report) return;

    const reporter = config.report;
    if (typeof config.aliases === 'string') {
      mapper[config.aliases] = {
        ...normalizeReporter(reporter),
        __raw_name: config.name,
      };
    } else {
      config.aliases.forEach(
        (alias) =>
          (mapper[alias] = {
            ...normalizeReporter(reporter),
            __raw_name: config.name,
          }),
      );
    }
  });

  let code = `
    const aliasToReporterMap = ${JSON.stringify(mapper)};
    export default aliasToReporterMap;
  `;

  const regex = /"__nameTranslator"\:[\s|\n]*(")(.+?)(("),)/g;
  let matches = regex.exec(code);

  while (matches) {
    // 移除多余的//
    let newCode = removeSlashes(matches[2]);
    // unicode转字符串
    newCode = unicodeToChar(newCode);
    code = code.replace(matches[0], `"__nameTranslator": ${newCode},`);
    matches = regex.exec(code);
  }

  fs.writeFileSync(OPTIONS.files.reporter, code);
  formatFile(OPTIONS.files.reporter);
}

function normalizeReporter(reporter) {
  return Object.keys(reporter).reduce((prev, curr) => {
    const value = reporter[curr];
    if (typeof value === 'string' || typeof value === 'number') {
      prev[curr] = value;
    }

    if (typeof value === 'function') {
      prev[curr] = value.toString().replace(/\n|\r/g, '');
    }

    return prev;
  }, {});
}

function unicodeToChar(text) {
  return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
}
