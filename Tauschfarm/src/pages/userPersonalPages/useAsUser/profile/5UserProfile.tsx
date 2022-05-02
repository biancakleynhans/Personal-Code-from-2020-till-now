import React, { Component } from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonHeader } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import FabButtonSelection from '../../../../layout/Buttons/Fab';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/reduxModels';
import { convertObjectToArray } from '../../../../services/ownServices/ConverterFuncs';
import ProfileSkeletonScreen from '../../../../layout/Loading_Redirecting/ProfileSkeletonScreen';
import ProfilePage from '../../../../layout/AppComponents/ProfilePage';

class Dashboard extends Component<any, any> {
	render() {
		// console.log('props', this.props);
		const { user, arr } = this.props;
		var windowSize = window.innerWidth;
		// console.log('user', user);
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.Profile)} />
					</IonHeader>
					<br />
					<br />
					<br />
					{!this.props.loading && windowSize < 400 && (
						<>
							<ProfilePage user={user} arr={arr} type='current' currentUser={user} />
							<FabButtonSelection userOrGroup={'user'} idOfUserOrGroup={user.id} reqNum={0} />
						</>
					)}

					{!this.props.loading && windowSize > 800 && (
						<>
							<IonGrid>
								<IonRow>
									<IonCol size='4'></IonCol>
									<IonCol size='4'>
										<ProfilePage user={user} arr={arr} type='current' currentUser={user} />
									</IonCol>
									<IonCol size='4'></IonCol>
								</IonRow>
							</IonGrid>
							<FabButtonSelection userOrGroup={'user'} idOfUserOrGroup={user.id} reqNum={0} />
						</>
					)}

					{this.props.loading && <ProfileSkeletonScreen />}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('dash props:', state.user.imgArray);
	var arr = state.user.categories ? convertObjectToArray(state.user.categories) : [];
	// console.log(state.user.categories, state.user.categories);
	return {
		user: state.user,
		arr: convertObjectToArray(arr).slice(0, 4),
		loading: state.user.isEmpty
	};
};

export default connect(mapStateToProps)(Dashboard);
