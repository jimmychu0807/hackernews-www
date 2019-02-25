export function getQueryVarsFromParam(param) {
  let res = param.split("-");
  return { sortBy: res[0], desc: (res[1] === "desc") };
}
