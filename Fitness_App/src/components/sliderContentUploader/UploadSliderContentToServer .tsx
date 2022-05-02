/** @format */

import React, { Component } from 'react';
import { firebaseStorageBucket } from '../../services/firebase/firebase';
import { IonButton, IonCard, IonItem, IonLabel, IonSelect, IonSelectOption, IonCardHeader } from '@ionic/react';
import { LablesList } from '../titleLists/Titles';
import { TypesToServer } from '../../services/firebase/TypesToServer';
import { generator } from '../../helpers/Tools';
import FileUploadLoader from '../loader/FileUploadLoader';

interface iProps {}
interface iState {
	imgArray: any;
	isUploading: boolean;
	progress: number;
	cardType: string;
}

const Cardtypes = ['test', TypesToServer.Cards.Recipes, TypesToServer.Cards.Vloermoer, TypesToServer.Cards.Home];

export class sliderContentUploader extends Component<iProps, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			imgArray: [],
			isUploading: false,
			progress: 0,
			cardType: ''
		};
	}

	fileSelected(e: any) {
		// Single
		// console.log('e', e.target.files);
		// this.setState({ img: e.target.files[0] });
		// this.fileUpload(e.target.files[0]);

		// Multi
		// console.log('e', e.target.files);
		this.setState({ imgArray: e.target.files });
		// this.MultiFileUpload(e.target.files);
	}

	fileUpload(file: any) {
		console.log('file', file);
		const uploadTask = firebaseStorageBucket.ref(`test/${file.name}`).put(file);

		uploadTask.on(
			'state_changed',
			snapshot => {
				const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
				this.setState({ isUploading: true, progress });
			},
			error => {
				console.log('Error', error);
			},
			() => {
				firebaseStorageBucket
					.ref('test')
					.child(file.name)
					.getDownloadURL()
					.then(url => {
						const isUploading = false;
						this.setState({ isUploading });
						console.log('url', url);
					});
			}
		);
	}

	MultiFileUpload(files: any[]) {
		for (let i = 0; i < files.length; i++) {
			const uploadTask = firebaseStorageBucket.ref(`${this.state.cardType}/${files[i].name}`).put(files[i]);
			uploadTask.on(
				'state_changed',
				snapshot => {
					const isUploading = true;
					this.setState({ isUploading });
					const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
					this.setState({ progress });
				},
				error => {
					console.log('Error', error);
				},
				() => {
					firebaseStorageBucket
						.ref(this.state.cardType)
						.child(files[i].name)
						.getDownloadURL()
						.then(url => {
							console.log('done Upload');
							alert(LablesList.cardUpload.done.af);
						});
				}
			);
		}
	}

	getCatagory(e: any) {
		console.log('e', e);
		this.setState({ cardType: e.detail.value });
	}

	render() {
		return (
			<IonCard>
				<IonItem>
					<IonLabel>{LablesList.cardUpload.placeHolder.af}</IonLabel>
					<IonSelect
						placeholder={LablesList.OptionsBtn.placeHolder.af}
						onIonChange={e => {
							this.getCatagory(e);
						}}
						cancelText={LablesList.OptionsBtn.cancel.af}
						okText={LablesList.OptionsBtn.ok.af}>
						{Cardtypes.map((entry: any) => {
							// console.log(' entry', entry);
							return (
								<IonSelectOption key={generator()} value={entry}>
									{entry}
								</IonSelectOption>
							);
						})}
					</IonSelect>
				</IonItem>

				<IonItem>
					<input multiple type='file' onChange={e => this.fileSelected(e)} />
				</IonItem>

				<IonButton onClick={() => this.MultiFileUpload(this.state.imgArray)}>{LablesList.cardUpload.button.af}</IonButton>

				<IonCard>
					<IonCardHeader>
					Besag om Kaartjie(s) <br/> op te laai wag <br/> net i oomblik dankie
					</IonCardHeader>
					<FileUploadLoader timeRunning={this.state.progress} />
				</IonCard>
			</IonCard>
		);
	}
}

export default sliderContentUploader;
