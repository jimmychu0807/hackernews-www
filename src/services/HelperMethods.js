import _ from 'lodash';
import TimeDiff from 'js-time-diff';
import CONFIG from '../config/Main';

export function getQueryVarsFromParam(param, after = null, first = CONFIG.LINKS_PER_PAGE) {
  let res = param.split("-");
  return { sortBy: res[0], desc: (res[1] === "desc"), after, first };
}

export function getDomainFromLink(link) {
  let matches = link.match(/^(http[s]?:\/\/)?([^/]+)/);
  if (!matches) return false;
  return (_.last(matches));
}

export function timeDiff(dateTime) {
  return TimeDiff(dateTime);
}
