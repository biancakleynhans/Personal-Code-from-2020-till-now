/** @format */

import React from 'react';
import {
	IonToolbar,
	IonTitle,
	IonButtons,
	IonMenuButton,
	IonSearchbar,
	IonButton,
	IonIcon,
	IonBackButton
} from '@ionic/react';
import { filter, funnel, helpOutline } from 'ionicons/icons';
import { CommonUIServicesComponent } from '../Loading_Redirecting/CommonUIServices';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';

interface iProps {
	titleString?: any;
	searchBar?: boolean;
	chatBtn?: boolean;
	backBtn?: boolean;
	menuBtn?: boolean;
	filter_Sort_Btn?: boolean;
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
				<IonToolbar>
					<IonButtons>
						{/* START */}
						{this.props.menuBtn && (
							<IonMenuButton slot='start' color='primary' />
						)}
						{this.props.backBtn && (
							<IonBackButton color='primary' defaultHref='/' />
						)}

						{/* Middel */}
						{this.props.titleString && (
							<IonTitle>{this.props.titleString}</IonTitle>
						)}
						{this.props.searchBar && (
							<IonSearchbar
								color='primary'
								placeholder={Translate(lsInj.transDict.Search)}
								value={this.searchText}
								onIonChange={(e) => this.setSearchText(e)}
								debounce={1000}
								animated
							/>
						)}
						{/* End */}

						{this.props.chatBtn && (
							<IonButton
								slot='end'
								color='primary'
								routerLink='/dashboard/support'>
								<IonIcon slot='start' icon={helpOutline} />
							</IonButton>
						)}

						{this.props.filter_Sort_Btn && (
							<IonButton slot='end'>
								<IonIcon color='primary' icon={filter} />
							</IonButton>
						)}

						{this.props.filter_Sort_Btn && (
							<IonButton
								slot='end'
								onClick={() => {
									this.props.sort_buttonBoolean &&
										this.props.sort_buttonBoolean();
								}}>
								<IonIcon color='primary' icon={funnel} />
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
