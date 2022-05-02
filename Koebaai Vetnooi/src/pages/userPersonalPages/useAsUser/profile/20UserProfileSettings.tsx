import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonItem, IonInput, IonButton, IonList, IonHeader, IonTextarea } from '@ionic/react';
import { AllRoutesListed } from '../../../../routes/AllRoutesListed';
import { User_Update } from '../../../../services/redux/actions/001UserActions';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/ReduxModels';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { i_BaseInterface_User } from '../../../../models/001UserModels';
import ProfileSettingsLoadingScreen from '../../../../layout/Loading_Redirecting/ProfileSettingsLoadingScreen';
import { RedirectTo } from '../../../../layout/Loading_Redirecting/CommonUIServices';
import ProfileImagepicker from '../../../../components/profileImage/chooseImg/ProfileImagepicker';

interface iState {
	name: string;
	bio: string;
	allowPres: boolean;
	showModal: boolean;
}

class UserProfileSettings extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		const { user } = this.props;
		this.state = {
			name: user.name,
			bio: user.bio,
			allowPres: false,
			showModal: false
		};

		this.changeUsername = this.changeUsername.bind(this);
		this.Submit = this.Submit.bind(this);
	}

	changeUsername(e: any) {
		e.preventDefault();
		// console.log('e', e.detail.value);
		this.setState({ name: e.detail.value });
	}

	changeBio(e: any) {
		this.setState({ bio: e.detail.value });
	}

	Submit() {
		console.log('final State', this.state);
		this.props.UpdateUserSettings(this.state);
		RedirectTo(AllRoutesListed.userRoutes.dash_Landing);
	}

	render() {
		const { user } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={CombinedString.profileSettings} />
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					{!this.props.loading && (
						<>
							<IonList>
								<IonItem lines='none' className='eventInput'>
									<IonInput
										placeholder={CombinedString.profileName + ' ' + user.name}
										inputmode='text'
										type='text'
										name='username'
										value={this.state.name}
										onIonChange={(e) => this.changeUsername(e)}
									/>
								</IonItem>

								<IonItem lines='none' className='eventInput'>
									<IonTextarea
										autoGrow
										placeholder={Translate(lsInj.transDict.placeholderProfile) + user.bio}
										name='bio'
										value={this.state.bio}
										onIonChange={(e) => this.changeBio(e)}
									/>
								</IonItem>
								<ProfileImagepicker user={user} />
							</IonList>

							<IonButton onClick={() => this.Submit()}>{Translate(lsInj.transDict.Publish)}</IonButton>
						</>
					)}
					{this.props.loading && <ProfileSettingsLoadingScreen />}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		user: state.user,
		loading: state.user.isEmpty
	};
};

const matchDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		UpdateUserSettings: (user: i_BaseInterface_User) => {
			dispatch(User_Update(user));
		}
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(UserProfileSettings);
