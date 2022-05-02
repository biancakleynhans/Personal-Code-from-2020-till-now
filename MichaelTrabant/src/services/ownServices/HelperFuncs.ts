/** @format */

export function updateImgPreviewAndFileN(
	fileNameFull: string,
	userId: string,
	folder: string
) {
	var startS = `https://firebasestorage.googleapis.com/v0/b/boshofserver.appspot.com/o/${userId}%2F${folder}%2`;
	var endS = '?alt=media&token=6a292f71-3d85-4aa7-9fce-9d54a15e4257';
	var res1 = fileNameFull.slice(startS.length + 1);
	var finalRes = res1.slice(0, res1.length - endS.length);

	// console.log('st leng', startS.length);
	// console.log('st leng', endS.length);
	// console.log('????', res1, res1.length);
	// console.log('????', finalRes);
	return finalRes;
}
