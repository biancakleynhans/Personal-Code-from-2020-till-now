/** @format */

import React, { Component } from 'react';
import { IonInput, IonItem, IonLabel, IonButton, IonCard, IonSelect, IonSelectOption } from '@ionic/react';
import { AddBookToServer } from '../../services/firebase/ConectToServer';
import { LablesList } from '../titleLists/Titles';
import { TypesToServer } from '../../services/firebase/TypesToServer';
import { generator } from '../../helpers/Tools';

var mammoth = require('mammoth');

interface iProps {}
interface iState {
	display: string;
	warnings: any;
	bookType: string;
	bookTitle: string;
	loading: boolean;
}

var htmlConfigOptions = {
	styleMap: ['table => table > tbody'],
	includeDefaultStyleMap: false
};

const Booktypes = [TypesToServer.Books.KoebaaiVetnoi, TypesToServer.Books.CherioChubby, TypesToServer.Books.BybelStuddie, TypesToServer.Books.TydSkrif];

export class MamothDocReader extends Component<iProps, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			display: '',
			warnings: '',
			bookTitle: '',
			loading: false,
			bookType: ''
		};
	}

	onchange(e: any) {
		var displayText: '';
		// console.log('e', e.target.files);
		var file = e.target.files && e.target.files[0];

		if (file !== null) {
			// console.log('file not null and we can read it ');
			var fileReader = new FileReader();

			fileReader.onloadend = () => {
				// console.log(fileReader.result, 'fileReader', readerEvt);
				var arrayBuffer = fileReader.result;
				this.setState({ loading: true });
				mammoth
					.convertToHtml({ arrayBuffer: arrayBuffer }, htmlConfigOptions)
					.then((resultObject: any) => {
						// console.log('convertToHtml', resultObject.value);
						displayText = resultObject.value;
						return displayText;
					})
					.then(() => {
						console.log('setting state', displayText);
						this.setState({ display: displayText, loading: false });
					});
			};
			fileReader.readAsArrayBuffer(file);
		}
	}

	getCatagory(e: any) {
		console.log('e', e);
		this.setState({ bookType: e.detail.value });
	}

	getTitle(e: any) {
		console.log('e', e.detail.value);
		this.setState({ bookTitle: e.detail.value });
	}

	render() {
		return (
			<IonCard color='secondary'>
				<IonItem>
					<IonLabel position='floating'>{LablesList.DocReader.bookTitle.af}</IonLabel>
					<IonInput placeholder={LablesList.DocReader.placeHolder.af} inputmode='text' name='height' type='text' onIonChange={e => this.getTitle(e)} />
				</IonItem>

				<IonItem>
					<IonLabel>{LablesList.DocReader.bookCatagory.af}</IonLabel>
					<IonSelect
						placeholder={LablesList.OptionsBtn.placeHolder.af}
						onIonChange={e => {
							this.getCatagory(e);
						}}
						cancelText={LablesList.OptionsBtn.cancel.af}
						okText={LablesList.OptionsBtn.ok.af}>
						{Booktypes.map((entry: any) => {
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
					<input type='file' onChange={e => this.onchange(e)} />
				</IonItem>

				<IonButton
					disabled={this.state.loading}
					onClick={() => {
						if (this.state.display === '') {
							alert('voeg asb boek by');
						}
						if (this.state.bookTitle === '') {
							alert('voeg asb titel by');
						} else {
							console.log('Book add');
							AddBookToServer(this.state.bookType, this.state.bookTitle, this.state.display);
						}
					}}>
					{LablesList.DocReader.button.af}
				</IonButton>

				{/* How to use  */}
				{/* Display content to screen */}
				{/* <IonCard color='tertiary'>{ReactHtmlParser(this.state.display)}</IonCard> */}
			</IonCard>
		);
	}
}

export default MamothDocReader;
