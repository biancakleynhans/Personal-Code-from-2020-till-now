import { ImageArr } from '../models/Products';

export function stringToImgArr(arr: string[]): ImageArr[] {
  let arrNew: ImageArr[] = [];
  if (arr && arr.length > 0) {
    arr.forEach((a, i) => {
      arrNew.push({
        data: new File([], ''),
        url: a,
      });
    });
  }
  return arrNew;
}
