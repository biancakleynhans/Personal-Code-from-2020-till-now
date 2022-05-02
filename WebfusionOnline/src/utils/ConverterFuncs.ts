export function convertObjectToArray(obj: any, keepKeyId?: boolean) {
  var arrToReturn: any[] = [];

  if (obj === null || obj === undefined) {
    // console.log('undefided ', obj);
    return arrToReturn;
  } else {
    // console.log('not undefided ', obj);
    Object.entries(obj).forEach((key) => {
      var obj: any,
        // eslint-disable-next-line
        {} = {};
      obj = key[1];
      if (keepKeyId) {
        obj.id = key[0];
      }
      // console.log("obj", obj)
      arrToReturn.push(obj);
      return arrToReturn;
    });
    return arrToReturn;
  }
}
