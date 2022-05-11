import { ImageArr } from "../firebase/FirebaseStorage";

export function chunkArray(myArray: any[], chunk_size: number) {
  let arrCpy = myArray.slice();
  let results = [];

  while (arrCpy.length) {
    results.push(arrCpy.splice(0, chunk_size));
  }

  return results;
}

export function stringToImgArr(arr: string[]): ImageArr[] {
  let arrNew: ImageArr[] = [];
  if (arr && arr.length > 0) {
    arr.forEach((a, i) => {
      arrNew.push({
        data: new File([], ""),
        url: a
      });
    });
  }
  return arrNew;
}
