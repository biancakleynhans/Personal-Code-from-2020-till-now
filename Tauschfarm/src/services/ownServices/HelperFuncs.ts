export function updateImgPreviewAndFileN(fileNameFull: string, userId: string, folder: string) {
	var startS = `https://firebasestorage.googleapis.com/v0/b/boshofserver.appspot.com/o/${userId}%2F${folder}%2`;
	var endS = '?alt=media&token=6a292f71-3d85-4aa7-9fce-9d54a15e4257';
	var res1 = fileNameFull.slice(startS.length + 1);
	var finalRes = res1.slice(0, res1.length - endS.length);
	return finalRes;
}

export function CheckNameMakeNew(oldname: string) {
	const addStringResize = '_600x600';
	var returnString = '';

	if (oldname.includes('.jpeg')) {
		// console.log('is jpeg', oldname);
		const checkname = oldname.split('.jpeg');
		// console.log('checkname', checkname);

		returnString = checkname[0] + addStringResize + '.jpeg' + checkname[1];
		// console.log('newString', returnString);
		return returnString;
	} else if (oldname.includes('.jpg')) {
		// console.log('is jpg', oldname);
		const checkname = oldname.split('.jpg');
		// console.log('checkname', checkname);

		returnString = checkname[0] + addStringResize + '.jpg' + checkname[1];
		// console.log('newString', returnString);
		return returnString;
	} else if (oldname.includes('.png')) {
		// console.log('is png', oldname);
		const checkname = oldname.split('.png');
		// console.log('checkname', checkname);

		returnString = checkname[0] + addStringResize + '.png' + checkname[1];
		// console.log('newString', returnString);
		return returnString;
	} else {
		console.log('oldName', oldname);
		const checkname = oldname.split('.webp');
		console.log('checkname', checkname);

		returnString = checkname[0] + addStringResize + '.webp' + checkname[1];
		console.log('newString', returnString);
		return returnString;
	}
}
