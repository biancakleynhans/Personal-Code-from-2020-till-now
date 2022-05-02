import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader, IonList, IonListHeader, IonItem, IonLabel, IonIcon, IonAvatar, IonButton } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { IAppState } from '../../../services/redux/ReduxModels';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import { eyeOutline } from 'ionicons/icons';
import { AllRoutesListed } from '../../../routes/AllRoutesListed';

export class AdminLandingPage extends Component<any> {
	render() {
		const { allData } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.adminTitle)} />
					</IonHeader>
					<br />
					<br />
					<br />
					<IonList>
						<IonListHeader>{Translate(lsInj.transDict.Members)}</IonListHeader>

						{convertObjectToArray(allData).map((user) => {
							return (
								<IonItem key={user.id}>
									<IonAvatar slot='start'>
										<img src={user.avatar} alt='broken' />
									</IonAvatar>
									<IonLabel>{user.name}</IonLabel>
									<IonButton fill='clear' routerLink={`${AllRoutesListed.adminRoutes.main}/${user.id}`} slot='end'>
										<IonIcon size='large' icon={eyeOutline} />
									</IonButton>
								</IonItem>
							);
						})}
					</IonList>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		allData: state.adminUser.AllUsers
	};
};

export default connect(mapStateToProps)(AdminLandingPage);
