export function createArrFromObj(obj: { [k: string]: string[] }) {
  let arr: string[] = [];
  Object.values(obj).map((ob) => {
    // console.log("OB???", ob);
    arr = [...arr, ...ob];
    return arr;
  });
  // console.log("ARR", arr);
  return arr;
}
