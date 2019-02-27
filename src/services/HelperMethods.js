import _ from 'lodash';

export function getQueryVarsFromParam(param) {
  let res = param.split("-");
  return { sortBy: res[0], desc: (res[1] === "desc") };
}

export function getDomainFromLink(link) {
  let matches = link.match(/^(http[s]?:\/\/)?([^/]+)/);
  if (!matches) return false;
  return (_.last(matches));
}
