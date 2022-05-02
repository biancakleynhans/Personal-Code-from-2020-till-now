import React, { PureComponent } from 'react';
import { IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

class ImageCropperComponent extends PureComponent {
	state = {
		src: this.props.img,
		imgName: '',
		crop: {
			aspect: 1 / 1.25,
			unit: '%',
			width: 50
		}
	};

	onSelectFile = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			reader.addEventListener('load', () => this.setState({ src: reader.result }));

			var fileN = e.target.files[0].name;
			console.log('??? e', fileN);
			var len = fileN.length;
			var s = len - 5;

			var cleaned = fileN.slice(0, s);
			console.log('cleaned', cleaned);

			this.setState({ imgName: cleaned });
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	// If you setState the crop in here you should return false.
	onImageLoaded = (image) => {
		this.imageRef = image;
	};

	onCropComplete = (crop) => {
		this.makeClientCrop(crop);
	};

	onCropChange = (crop, percentCrop) => {
		// You could also use percentCrop:
		// this.setState({ crop: percentCrop });
		this.setState({ crop });
	};

	async makeClientCrop(crop) {
		if (this.imageRef && crop.width && crop.height) {
			const croppedImageUrl = await this.getCroppedImg(this.imageRef, crop, `${this.state.imgName}##${new Date().getTime()}.webp`);
			this.setState({ croppedImageUrl: croppedImageUrl.url, croppedImage: croppedImageUrl.file });
		}
	}

	getCroppedImg(image, crop, fileName) {
		const canvas = document.createElement('canvas');
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		var originWidth = crop.width * scaleX;
		var originHeight = crop.height * scaleY;

		// maximum width/height
		var maxWidth = 1200,
			maxHeight = 1200 / (16 / 9);
		var targetWidth = originWidth,
			targetHeight = originHeight;
		if (originWidth > maxWidth || originHeight > maxHeight) {
			if (originWidth / originHeight > maxWidth / maxHeight) {
				targetWidth = maxWidth;
				targetHeight = Math.round(maxWidth * (originHeight / originWidth));
			} else {
				targetHeight = maxHeight;
				targetWidth = Math.round(maxHeight * (originWidth / originHeight));
			}
		}

		canvas.width = targetWidth;
		canvas.height = targetHeight;
		const ctx = canvas.getContext('2d');

		ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, targetWidth, targetHeight);

		return new Promise((resolve, reject) => {
			canvas.toBlob(
				(blob) => {
					if (!blob) {
						//reject(new Error('Canvas is empty'));
						console.error('Canvas is empty');
						return;
					}
					blob.name = fileName;
					console.log('blob', blob);
					window.URL.revokeObjectURL(this.fileUrl);
					this.fileUrl = window.URL.createObjectURL(blob);
					resolve({ url: this.fileUrl, file: blob });
				},
				'image/webp',
				1
			); //, 'image/jpeg'
		});
	}

	done() {
		this.props.imgDone && this.props.imgDone(this.state.croppedImage, this.state.croppedImageUrl);
	}

	render() {
		const { crop, croppedImageUrl, src } = this.state;
		const { editView } = this.props;
		return (
			<React.Fragment>
				<IonCol style={{ backgroundColor: 'var(--ion-color-primary)', width: '100px', height: '70px', margin: '10px', borderRadius: '5px' }}>
					<label htmlFor='myfile1' className={editView ? 'uploadBtn2' : 'uploadBtn'}>
						{!editView && Translate(lsInj.transDict.Upload3)} <br />
						{!editView && Translate(lsInj.transDict.Upload)} <br />
						{editView && Translate(lsInj.transDict.Change)} <br />
					</label>
					<input id='myfile1' style={{ display: 'none' }} type='file' onChange={this.onSelectFile} />
				</IonCol>

				<IonGrid>
					<IonRow style={{ width: '340px' }}>
						{src && <ReactCrop src={src} crop={crop} ruleOfThirds keepSelection onImageLoaded={this.onImageLoaded} onComplete={this.onCropComplete} onChange={this.onCropChange} />}
					</IonRow>

					<IonRow style={{ width: '340px' }}>{croppedImageUrl && <img alt='Crop' style={{ maxWidth: '100%' }} src={croppedImageUrl} />}</IonRow>
					<IonRow>
						<IonCol></IonCol>
						<IonCol>{croppedImageUrl && <IonButton onClick={() => this.done()}>DONE</IonButton>}</IonCol>
						<IonCol></IonCol>
					</IonRow>
				</IonGrid>
			</React.Fragment>
		);
	}
}

export default ImageCropperComponent;
