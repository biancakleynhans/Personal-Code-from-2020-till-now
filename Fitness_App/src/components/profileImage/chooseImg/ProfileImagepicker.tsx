/** @format */

import React, { Component } from 'react';
import { IonImg, IonButton, IonCard, IonCardHeader } from '@ionic/react';
import { ImagePickerList_Vetnooi } from './imagePickerPerTypeApp';
import { LablesList } from '../../titleLists/Titles';

interface iProps {}

interface iState {
	editing: boolean;
	profileImage: any;
}

export class ProfileImagepicker extends Component<iProps, iState> {
	constructor(props: any) {
		super(props);

		this.state = {
			profileImage: null,
			editing: false
		};
	}

	componentDidMount() {
		this.setState({ profileImage: this.getImgFromLs() });
	}

	getImgFromLs() {
		var ls = window.localStorage.getItem('profile');
		console.log('ls', ls);

		if (ls) {
			if (ls === ImagePickerList_Vetnooi.batmitton.name) {
				this.setState({ editing: false });
				return ImagePickerList_Vetnooi.batmitton.image;
			}
			if (ls === ImagePickerList_Vetnooi.coutch.name) {
				this.setState({ editing: false });
				return ImagePickerList_Vetnooi.coutch.image;
			}
			if (ls === ImagePickerList_Vetnooi.dance.name) {
				this.setState({ editing: false });
				return ImagePickerList_Vetnooi.dance.image;
			}
			if (ls === ImagePickerList_Vetnooi.gym.name) {
				this.setState({ editing: false });
				return ImagePickerList_Vetnooi.gym.image;
			}
			if (ls === ImagePickerList_Vetnooi.hula.name) {
				this.setState({ editing: false });
				return ImagePickerList_Vetnooi.hula.image;
			}
			if (ls === ImagePickerList_Vetnooi.jump.name) {
				this.setState({ editing: false });
				return ImagePickerList_Vetnooi.jump.image;
			}
			if (ls === ImagePickerList_Vetnooi.running.name) {
				this.setState({ editing: false });
				return ImagePickerList_Vetnooi.running.image;
			}
			if (ls === ImagePickerList_Vetnooi.sitStreach.name) {
				this.setState({ editing: false });
				return ImagePickerList_Vetnooi.sitStreach.image;
			}
			if (ls === ImagePickerList_Vetnooi.standStretch.name) {
				this.setState({ editing: false });
				return ImagePickerList_Vetnooi.standStretch.image;
			}
			if (ls === ImagePickerList_Vetnooi.yoga.name) {
				this.setState({ editing: false });
				return ImagePickerList_Vetnooi.yoga.image;
			} else {
				this.setState({ editing: true });
				return ImagePickerList_Vetnooi.noImg.image;
			}
		} else {
			this.setState({ editing: true });
			return ImagePickerList_Vetnooi.noImg.image;
		}
	}

	handleClickedCard(imageChoice: any) {
		console.log('imageChoice', imageChoice);
		this.setState({ editing: false, profileImage: imageChoice.image });
		window.localStorage.setItem('profile', imageChoice.name);
	}

	changeProfielImage() {
		this.setState({ editing: true });
	}

	ShowOrHideProfileButtons() {
		if (this.state.editing === true) {
			return (
				<IonCard>
					<IonCardHeader>{LablesList.ProfilePic.af}</IonCardHeader>
					<IonButton size='large' shape='round' onClick={() => this.handleClickedCard(ImagePickerList_Vetnooi.yoga)}>
						<IonImg style={{ width: '100px', height: '60px' }} src={ImagePickerList_Vetnooi.yoga.image} alt='broken' />
					</IonButton>

					<IonButton size='large' shape='round' onClick={(e: any) => this.handleClickedCard(ImagePickerList_Vetnooi.coutch)}>
						<IonImg style={{ width: '100px', height: '60px' }} src={ImagePickerList_Vetnooi.coutch.image} alt='broken' />
					</IonButton>

					<IonButton size='large' shape='round' onClick={(e: any) => this.handleClickedCard(ImagePickerList_Vetnooi.jump)}>
						<IonImg style={{ width: '100px', height: '60px' }} src={ImagePickerList_Vetnooi.jump.image} alt='broken' />
					</IonButton>

					<IonButton size='large' shape='round' onClick={(e: any) => this.handleClickedCard(ImagePickerList_Vetnooi.standStretch)}>
						<IonImg style={{ width: '100px', height: '60px' }} src={ImagePickerList_Vetnooi.standStretch.image} alt='broken' />
					</IonButton>

					<IonButton size='large' shape='round' onClick={(e: any) => this.handleClickedCard(ImagePickerList_Vetnooi.gym)}>
						<IonImg style={{ width: '100px', height: '60px' }} src={ImagePickerList_Vetnooi.gym.image} alt='broken' />
					</IonButton>

					<IonButton size='large' shape='round' onClick={(e: any) => this.handleClickedCard(ImagePickerList_Vetnooi.running)}>
						<IonImg style={{ width: '100px', height: '60px' }} src={ImagePickerList_Vetnooi.running.image} alt='broken' />
					</IonButton>

					<IonButton size='large' shape='round' onClick={(e: any) => this.handleClickedCard(ImagePickerList_Vetnooi.batmitton)}>
						<IonImg style={{ width: '100px', height: '60px' }} src={ImagePickerList_Vetnooi.batmitton.image} alt='broken' />
					</IonButton>
					<IonButton size='large' shape='round' onClick={(e: any) => this.handleClickedCard(ImagePickerList_Vetnooi.hula)}>
						<IonImg style={{ width: '100px', height: '60px' }} src={ImagePickerList_Vetnooi.hula.image} alt='broken' />
					</IonButton>
					<IonButton size='large' shape='round' onClick={(e: any) => this.handleClickedCard(ImagePickerList_Vetnooi.sitStreach)}>
						<IonImg style={{ width: '100px', height: '60px' }} src={ImagePickerList_Vetnooi.sitStreach.image} alt='broken' />
					</IonButton>
					<IonButton size='large' shape='round' onClick={(e: any) => this.handleClickedCard(ImagePickerList_Vetnooi.dance)}>
						<IonImg style={{ width: '100px', height: '60px' }} src={ImagePickerList_Vetnooi.dance.image} alt='broken' />
					</IonButton>
				</IonCard>
			);
		} else {
			return <IonButton onClick={() => this.changeProfielImage()}>{LablesList.ProfilePic.af}</IonButton>;
		}
	}

	render() {
		return (
			<>
				<IonImg style={{ marginLeft: '100px', marginRight: '100px', width: '150px', height: '150px' }} src={this.state.profileImage} alt='Kies asb een'></IonImg>
				{this.ShowOrHideProfileButtons()}
			</>
		);
	}
}

export default ProfileImagepicker;
