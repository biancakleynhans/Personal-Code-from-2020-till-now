import React, { Component, Dispatch } from 'react';
import {
	IonPage,
	IonContent,
	IonHeader,
	IonToolbar,
	IonButton,
	IonIcon,
	IonItem,
	IonLabel,
	IonSelect,
	IonSelectOption,
	IonTitle,
	IonAvatar,
	IonInput,
	IonList,
	IonListHeader,
} from '@ionic/react';
import { Translate, SetLanguage, GetLanguage } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { exitOutline, checkmark, addCircle } from 'ionicons/icons';
import { IAppState } from '../../../services/redux/ReduxModels';
import { connect } from 'react-redux';
import { signOutUser } from '../../../services/redux/actions/000AuthActions';
import { OwnerUpdateProfile_Update, Owner_ChangeLang, Owner_Profile_AddImg } from '../../../services/redux/actions/OwnerActions';
import { i_BaseInterface_User } from '../../../models/001UserModels';
import { CombinedString } from '../../../services/translate/CombinedStrings';
import { AllRoutesListed } from '../../../routes/AllRoutesListed';
import { i_Redux_ActionFunc_Interface_ImgUpload } from '../../../models/007ImageModels';

interface iState {
	name: string;
	lang: string;
	profileImg: string;
	workdays: string[];
	workTimeStart: string;
	workTimeEnd: string;
	nonWorkTimeStart: string;
	nonWorkTimeEnd: string;
	indexWs: number;
	indexNWs: number;
}

export class MichealProfile extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		const { user } = this.props;

		this.state = {
			lang: GetLanguage() === 'en' ? Translate(lsInj.transDict.English) : Translate(lsInj.transDict.Dutch),
			name: user.name,
			workdays: [],
			workTimeStart: this.props.workStart,
			workTimeEnd: this.props.workEnd,
			nonWorkTimeStart: this.props.NonWorkStart,
			nonWorkTimeEnd: this.props.NonWorkEnd,
			profileImg: '',
			indexNWs: 0,
			indexWs: 0,
		};
	}

	componentDidUpdate(prevProps: any) {
		if (prevProps !== this.props) {
			this.setState({
				workdays: [],
				workTimeStart: this.props.workStart,
				workTimeEnd: this.props.workEnd,
				nonWorkTimeStart: this.props.NonWorkStart,
				nonWorkTimeEnd: this.props.NonWorkEnd,
			});
		}
	}

	setLang(e: any) {
		const { user } = this.props;
		// console.log('e', e);
		this.setState({ lang: e });

		var sending = {
			id: user.id,
			lang: e,
		};
		this.props.changeLang(sending);
		SetLanguage(e);
		window.location.replace('/');
	}

	changeUsername(e: any) {
		// console.log('e', e.detail.value);
		this.setState({ name: e.detail.value });
	}

	saveNameChange() {
		console.log('clicked name save');
		const { user } = this.props;
		var sendData = {
			name: this.state.name,
			connectp: user.connectp,
		};
		console.log('submit', sendData);
		this.props.updateUser(sendData);
	}

	render() {
		const { user } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<IonToolbar>
							<IonTitle>
								{Translate(lsInj.transDict.My)} {Translate(lsInj.transDict.Profile)}
							</IonTitle>
							<IonButton fill='clear' slot='end' onClick={() => this.props.signOutUser()}>
								<IonIcon icon={exitOutline} />
								{Translate(lsInj.transDict.Signout)}
							</IonButton>
						</IonToolbar>
					</IonHeader>
					<br />
					<br />
					<br />
					<IonList>
						<IonItem>
							<IonAvatar style={{ width: '100px', height: '100px' }}>
								<img src={user.avatar} alt='broken' />
							</IonAvatar>
							<IonButton routerLink={AllRoutesListed.ownerRoutes.addProfileImg} fill='clear' color='light' style={{ textAlign: 'left' }}>
								{CombinedString.profileSettingsEditPhotos}
							</IonButton>
						</IonItem>

						<IonItem>
							<IonInput placeholder={user.name} inputmode='text' type='text' name='username' value={this.state.name} onIonChange={(e) => this.changeUsername(e)} />
							<IonIcon color='primary' icon={checkmark} onClick={() => this.saveNameChange()} />
						</IonItem>

						<IonItem>
							<IonLabel>{Translate(lsInj.transDict.Language)}</IonLabel>
							<IonSelect value={this.state.lang} placeholder={this.state.lang} onIonChange={(e) => this.setLang(e.detail.value)}>
								<IonSelectOption value='en'>{Translate(lsInj.transDict.English)}</IonSelectOption>
								<IonSelectOption value='de'>{Translate(lsInj.transDict.Dutch)}</IonSelectOption>
							</IonSelect>
						</IonItem>

						<IonListHeader style={{ fontSize: '1.4em', fontweight: 'bolder' }}>{Translate(lsInj.transDict.workHours)}</IonListHeader>

						{/* work Days */}
						<IonItem button routerLink={AllRoutesListed.ownerRoutes.changeDay}>
							<IonLabel className='toAndFrom' position='fixed' slot='start'>
								{Translate(lsInj.transDict.Days)}
							</IonLabel>

							<IonLabel className='toAndFrom' position='fixed' slot='end'>
								{user.workData.daysOfwork[0]} - {user.workData.daysOfwork[user.workData.daysOfwork.length - 1]}
							</IonLabel>
						</IonItem>

						{/* work hours */}
						<IonItem button routerLink={AllRoutesListed.ownerRoutes.changeWorkTime}>
							<IonLabel className='toAndFrom' position='fixed' slot='start'>
								{Translate(lsInj.transDict.Hours)}
							</IonLabel>

							<IonLabel className='toAndFrom' position='fixed' slot='end'>
								{this.state.workTimeStart} - {this.state.workTimeEnd}
							</IonLabel>
						</IonItem>

						{/* non work hours */}
						<IonItem button routerLink={AllRoutesListed.ownerRoutes.changeNonWorkTime}>
							<IonLabel className='toAndFrom' position='fixed' slot='start'>
								{Translate(lsInj.transDict.NonHours)}
							</IonLabel>

							<IonLabel className='toAndFrom' position='fixed' slot='end'>
								{this.state.nonWorkTimeStart} - {this.state.nonWorkTimeEnd}
							</IonLabel>
						</IonItem>

						{/* non work times */}
						<IonItem>
							<IonLabel className='toAndFrom' position='fixed' slot='start' style={{ fontSize: '1.4em', fontweight: 'bolder' }}>
								{Translate(lsInj.transDict.NonWorkHours)}
							</IonLabel>
							<IonButton routerLink={AllRoutesListed.ownerRoutes.changeExeption} style={{ fontSize: '0.8em' }} slot='end' color='light' fill='clear'>
								<IonIcon color='primary' icon={addCircle} />
								{Translate(lsInj.transDict.Add)}
							</IonButton>
						</IonItem>
					</IonList>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('dash props:', state.user.categories);

	return {
		user: state.owner.owner,
		workStart: state.owner.owner.workData.hoursOfwork !== undefined ? state.owner.owner.workData.hoursOfwork[0] : '06:00',
		workEnd: state.owner.owner.workData.hoursOfwork !== undefined ? state.owner.owner.workData.hoursOfwork[state.owner.owner.workData.hoursOfwork.length - 1] : '18:00',
		NonWorkStart: state.owner.owner.workData.hoursOfNonWork !== undefined ? state.owner.owner.workData.hoursOfNonWork[0] : '06:00',
		NonWorkEnd: state.owner.owner.workData.hoursOfNonWork !== undefined ? state.owner.owner.workData.hoursOfNonWork[state.owner.owner.workData.hoursOfNonWork.length - 1] : '18:00',
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		changeLang: (user: i_BaseInterface_User) => dispatch(Owner_ChangeLang(user)),
		signOutUser: () => dispatch(signOutUser()),
		updateUser: (user: i_BaseInterface_User) => dispatch(OwnerUpdateProfile_Update(user)),
		changeUserImage: (imgData: i_Redux_ActionFunc_Interface_ImgUpload) => dispatch(Owner_Profile_AddImg(imgData)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MichealProfile);
