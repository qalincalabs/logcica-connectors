export const uniqWith = (arr, fn) => arr.filter((element, index) => arr.findIndex((step) => fn(element, step)) === index);

export function camelToSnakeCase(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
} 

export function sluggify(str) {
  return str
    .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, " ") //replace all special characters | symbols with a space
    .toLowerCase()
    .replace(/^\s+|\s+$/gm, "") // trim spaces at start and end of string
    .replace(/\s+/g, "-"); // replace space with dash/hyphen
}

export function normalizeDate(str){
  if(str == null)
    return null
  return (new Date(str + " GMT")).toISOString().substring(0,10)
}

export function populateAreaWithins(areas) {
  areas.forEach((a) => (a.relId = a.ids[0]));

  for (let i = 0; i < areas.length; i++) {
    const previousAreas = areas.slice(0, i);

    if (previousAreas.length == 0) continue;

    const currentArea = areas[i];
    currentArea.within = previousAreas.map((a) => ({
      relId: a.relId,
    }));

    console.log(currentArea);
    if (currentArea.types?.includes("postal_code"))
      currentArea.within = [{ relId: areas[0].relId }];
  }
}

const LogcicaCore = () => {};
export default LogcicaCore;
