import React, { Component } from 'react';
import {
	IonPage,
	IonContent,
	IonHeader,
	IonFab,
	IonFabButton,
	IonIcon,
	IonPopover,
	IonCard,
	IonCardContent,
	IonButton,
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle
} from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/reduxModels';
import ProfileSettings from '../../../../layout/AppComponents/ProfileSettings';
import ProfileSettingsLoadingScreen from '../../../../layout/Loading_Redirecting/ProfileSettingsLoadingScreen';
import { informationOutline } from 'ionicons/icons';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';

interface iState {
	showmodal: boolean;
}
class UserProfileSettings extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			showmodal: false
		};
	}
	render() {
		const { user, isfirst } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={CombinedString.profileSettings} />
					</IonHeader>
					<br />
					<br />
					<br />
					{!this.props.loading && (
						<>
							<ProfileSettings userOrGroup={'user'} isFirst={this.props.isfirst} />
							<IonFab style={{ width: '50px', height: '50px', opacity: 0.6, marginTop: '60px', marginRight: '10px' }} color='light' vertical='center' horizontal='end' slot='fixed'>
								<IonFabButton
									style={{ width: '40px', height: '40px' }}
									onClick={() => {
										this.setState({ showmodal: true });
									}}
									color='primary'>
									<IonIcon size='small' icon={informationOutline}></IonIcon>
								</IonFabButton>
							</IonFab>

							{this.state.showmodal && (
								<IonPopover cssClass='my-custom-class3' isOpen={this.state.showmodal} backdropDismiss={true} onDidDismiss={(e) => this.setState({ showmodal: false })}>
									<IonCard style={{ padding: '0px' }}>
										{user.lang === 'de' && (
											<>
												{isfirst && (
													<IonCardHeader>
														<IonCardTitle>Vielen Dank für deine Registrierung.</IonCardTitle>
														<IonCardSubtitle>
															Bitte schließ die Registrierung ab, indem du ein Profilbild hochlädst, dich kurz beschreibst und die Kategorien anlegst. <br />
															Profile ohne Profilbild werden nach 3 Tagen gelöscht.{' '}
														</IonCardSubtitle>
													</IonCardHeader>
												)}
												<IonCardContent style={{ padding: '0px' }}>
													<b> Schritt 1 </b> Bild hochladen <br />
													<b> Schritt 2 </b> kurze Beschreibung angeben <br />
													<b> Schritt 3 </b> Kategorien anlegen <br />
													<b> Schritt 4 </b> auf speichern klicken <br />
												</IonCardContent>
											</>
										)}
										{user.lang === 'en' && (
											<>
												{isfirst && (
													<IonCardHeader>
														<IonCardTitle>Thank you for registering.</IonCardTitle>
														<IonCardSubtitle>
															Please complete the registration by uploading a profile picture, briefly writing down and placing the categories. Profiles without profile picture
															will be deleted after 3 days.
														</IonCardSubtitle>
													</IonCardHeader>
												)}
												<IonCardContent>
													<b> Step 1</b> Upload image <br />
													<b> Step 2</b> Provide brief description <br />
													<b> Step 3</b> Create categories <br />
													<b> Step 4</b> click Save <br />
												</IonCardContent>
											</>
										)}
										<IonButton onClick={() => this.setState({ showmodal: false })}>{Translate(lsInj.transDict.Close)}</IonButton>
									</IonCard>
								</IonPopover>
							)}
						</>
					)}
					{this.props.loading && <ProfileSettingsLoadingScreen />}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	console.log(' UserProfileSettings ownProps', ownProps);
	return {
		user: state.user,
		loading: state.user.isEmpty,
		isfirst: ownProps.match.params.isFirst === 'newUser' ? true : false
	};
};

export default connect(mapStateToProps)(UserProfileSettings);
