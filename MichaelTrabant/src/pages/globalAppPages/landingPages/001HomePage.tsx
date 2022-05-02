import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol } from '@ionic/react';
import { connect } from 'react-redux';
import { IAppState } from '../../../services/redux/ReduxModels';
import HomeSkeletonScreen from '../../../layout/Loading_Redirecting/SkeletonScreen';
import PageHeader from '../../../layout/Headers/PageHeader';
import { ExportAllStaticImages } from '../../../components/images/ExportAllStaticImages';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';

class HomePage extends Component<any, any> {
	render() {
		var w = window.innerWidth < 400 ? '6' : '3';
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader menuBtn={true} />
					</IonHeader>
					<br />
					<br />
					<br />

					{!this.props.loading && (
						<>
							{window.innerWidth < 400 ? (
								<div style={{ position: 'relative', left: 0, top: 0 }}>
									<img src={ExportAllStaticImages.homeBackground} alt='broken' className='fishes' />
									<img src={ExportAllStaticImages.homeMain} alt='broken' className='fish' />
								</div>
							) : (
								<img src={ExportAllStaticImages.homeMain} alt='broken' />
							)}

							<br />
							<IonCard>
								<IonCardHeader>
									<IonCardTitle color='light'>Michael Trabant</IonCardTitle>
								</IonCardHeader>
								<IonCardContent>
									Turpis in quisque at morbi consectetur sollicitudin diam. Lectus vitae id et tellus. Senectus amet arcu scelerisque turpis interdum. Eget sed iaculis ac pretium
									enim, pretium. Elit, lectus magna et aliquam. Facilisi nisl, libero donec lacus vulputate consectetur. Mauris accumsan, netus tincidunt leo volutpat, amet, dolor
									mattis faucibus. Et, posuere massa sagittis ut cursus habitant. Diam lectus scelerisque habitant cras elit, id iaculis. Elementum euismod pellentesque habitant
									risus et. Elementum feugiat viverra ipsum lorem semper. Nulla molestie arcu mollis ipsum id urna. Arcu enim sit euismod purus.
								</IonCardContent>
							</IonCard>
							<br />
							<br />
							<IonGrid>
								<IonRow>
									<IonCardTitle color='light'>{Translate(lsInj.transDict.Gallery)}</IonCardTitle>
								</IonRow>
								<IonRow>
									{ExportAllStaticImages.homeGaleryBlocks.map((image: string, index: number) => {
										return (
											<IonCol size={w} key={index}>
												<img style={{ width: '200px', height: '200px' }} src={image} alt='broken' />
											</IonCol>
										);
									})}
								</IonRow>
							</IonGrid>
						</>
					)}

					{this.props.loading && <HomeSkeletonScreen />}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('home state:', state);

	return {
		user: state.user,
		loading: state.user.isEmpty,
	};
};

export default connect(mapStateToProps)(HomePage);
