import React, { Component } from 'react';
import { IonImg, IonButton, IonCard, IonCardHeader } from '@ionic/react';
import { ImagePickerList_Vetnooi } from './imagePickerPerTypeApp';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { i_BaseInterface_User } from '../../../models/001UserModels';

interface iProps {
	user: i_BaseInterface_User;
}

interface iState {
	editing: boolean;
	profileImage: any;
}

export class ProfileImagepicker extends Component<iProps, iState> {
	constructor(props: any) {
		super(props);
		const { user } = this.props;
		console.log('???? avatar', user.avatar);
		this.state = {
			profileImage: user.avatar ? user.avatar : ImagePickerList_Vetnooi.noImg.image,
			editing: false
		};
	}

	handleClickedCard(imageChoice: any) {
		console.log('imageChoice', imageChoice);
		this.setState({ editing: false, profileImage: imageChoice.image });
		window.localStorage.setItem('profile', imageChoice.image);
	}

	changeProfielImage() {
		this.setState({ editing: true });
	}

	ShowOrHideProfileButtons() {
		if (this.state.editing === true) {
			return (
				<IonCard style={{ color: 'var(--ion-text-color)' }}>
					<IonCardHeader style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.ProfilePic)}</IonCardHeader>
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
			return <IonButton onClick={() => this.changeProfielImage()}>{Translate(lsInj.transDict.ProfilePic)}</IonButton>;
		}
	}

	render() {
		return (
			<>
				<IonImg
					style={{
						marginLeft: '100px',
						marginRight: '100px',
						width: '150px',
						height: '150px'
					}}
					src={this.state.profileImage}
					alt='Kies asb een'></IonImg>
				{this.ShowOrHideProfileButtons()}
			</>
		);
	}
}

export default ProfileImagepicker;
