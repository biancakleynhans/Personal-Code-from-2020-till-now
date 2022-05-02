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
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonCardContent,
	IonButton
} from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import { IAppState } from '../../../../services/redux/reduxModels';
import { connect } from 'react-redux';
import ProfileSettings from '../../../../layout/AppComponents/ProfileSettings';
import ProfileSettingsLoadingScreen from '../../../../layout/Loading_Redirecting/ProfileSettingsLoadingScreen';
import { informationOutline } from 'ionicons/icons';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';

interface iState {
	showmodal: boolean;
}

class UserGroupEdit extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			showmodal: false
		};
	}

	render() {
		const { user, isf } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={CombinedString.groupSetting} />
					</IonHeader>
					<br />
					<br />
					<br />

					{!this.props.loading && (
						<>
							<ProfileSettings userOrGroup={'group'} groupId={this.props.match.params.groupname} isFirst={isf} />
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
												{isf && (
													<IonCardHeader>
														<IonCardTitle>Um deine Tauschfarm-Gruppe vollständig anzulegen:</IonCardTitle>
														<IonCardSubtitle></IonCardSubtitle>
													</IonCardHeader>
												)}
												<IonCardContent style={{ padding: '0px' }}>
													<b> Schritt 1 </b>Geb deiner Gruppe einen Namen <br />
													<b> Schritt 2 </b> Lade ein passendes Bild hoch <br />
													<b> Schritt 3 </b> Beschreibe deine Gruppe <br />
													<b> Schritt 4 </b> Wähle passende Kategorien aus <br />
													<b> Schritt 5 </b> Klick auf Speichern <br />
												</IonCardContent>
											</>
										)}
										{user.lang === 'en' && (
											<>
												{isf && (
													<IonCardHeader>
														<IonCardTitle>To create your Tauschfarm group in full:</IonCardTitle>
														<IonCardSubtitle></IonCardSubtitle>
													</IonCardHeader>
												)}
												<IonCardContent>
													<b> Step 1 </b> Give your group a name <br />
													<b> Step 2 </b> Upload a matching image
													<br />
													<b> Step 3 </b> Describe your group <br />
													<b> Step 4 </b> Choose matching categories <br />
													<b> Step 4 </b> Click on Save <br />
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
	console.log('ownprops', ownProps);
	return {
		user: state.user,
		loading: state.user.isEmpty,
		groupId: ownProps.match.params.groupname,
		isf: ownProps.match.params.isfirst === 'newUser' ? true : false
	};
};

export default connect(mapStateToProps)(UserGroupEdit);
