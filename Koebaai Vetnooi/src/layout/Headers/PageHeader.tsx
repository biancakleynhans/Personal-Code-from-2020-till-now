import React from 'react';
import { IonToolbar, IonButtons, IonMenuButton, IonSearchbar, IonButton, IonIcon, IonBackButton, IonCardTitle } from '@ionic/react';
import { filter, funnel, helpOutline, bookOutline, heartHalfOutline, chatbubblesOutline, key, restaurantOutline, linkOutline, albumsOutline } from 'ionicons/icons';
import { CommonUIServicesComponent } from '../Loading_Redirecting/CommonUIServices';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { AllRoutesListed } from '../../routes/AllRoutesListed';

interface iProps {
	titleString?: any;
	searchBar?: boolean;
	chatBtn?: boolean;
	backBtn?: boolean;
	menuBtn?: boolean;
	recBtn?: boolean;
	bookBtn?: boolean;
	emoBtn?: boolean;
	chatGroupBtn?: boolean;
	filter_Sort_Btn?: boolean;
	adminBtn?: boolean;

	sort_buttonBoolean?: () => void;
}

class PageHeader extends React.Component<iProps> {
	searchText: string = '';

	setSearchText(e: any) {
		//console.log('setSearchText', e.detail.value);
	}
	render() {
		return (
			<>
				<IonToolbar color='light'>
					<IonButtons>
						{/* START */}
						{this.props.menuBtn && <IonMenuButton slot='start' color='medium' />}
						{this.props.backBtn && <IonBackButton color='medium' defaultHref='/' />}

						{/* Middel */}
						{this.props.titleString && <IonCardTitle style={{ color: 'var(--ion-color-medium)' }}>{this.props.titleString}</IonCardTitle>}

						{/* End */}

						{this.props.chatBtn && (
							<IonButton slot='end' color='medium' routerLink='/dashboard/support'>
								<IonIcon slot='start' icon={helpOutline} />
							</IonButton>
						)}

						{this.props.filter_Sort_Btn && (
							<IonButton slot='end'>
								<IonIcon color='medium' icon={filter} />
							</IonButton>
						)}

						{this.props.filter_Sort_Btn && (
							<IonButton
								slot='end'
								onClick={() => {
									this.props.sort_buttonBoolean && this.props.sort_buttonBoolean();
								}}>
								<IonIcon color='medium' icon={funnel} />
							</IonButton>
						)}

						{this.props.recBtn && (
							<IonButton slot='end' color='medium' routerLink={AllRoutesListed.otherRoutes.books}>
								<IonIcon size='large' slot='start' icon={bookOutline} />
							</IonButton>
						)}

						{this.props.bookBtn && (
							<IonButton slot='end' color='medium' routerLink={AllRoutesListed.otherRoutes.recipes}>
								<IonIcon size='large' slot='start' icon={restaurantOutline} />
							</IonButton>
						)}

						{this.props.emoBtn && (
							<IonButton slot='end' color='medium' routerLink={AllRoutesListed.otherRoutes.emo}>
								<IonIcon size='large' slot='start' icon={heartHalfOutline} />
							</IonButton>
						)}

						{this.props.chatGroupBtn && (
							<IonButton slot='end' color='medium' routerLink={AllRoutesListed.classroom.landing}>
								<IonIcon size='large' slot='start' icon={albumsOutline} />
							</IonButton>
						)}

						{this.props.adminBtn && (
							<IonButton slot='end' color='medium' routerLink={AllRoutesListed.adminRoutes.main}>
								<IonIcon size='large' slot='end' icon={key} />
							</IonButton>
						)}
					</IonButtons>
				</IonToolbar>
				<CommonUIServicesComponent />
			</>
		);
	}
}

export default PageHeader;
