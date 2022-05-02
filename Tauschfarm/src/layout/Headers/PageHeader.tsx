import React from 'react';
import { IonToolbar, IonTitle, IonButtons, IonMenuButton, IonButton, IonIcon, IonBackButton, IonBadge } from '@ionic/react';
import { filter, funnel, help, refresh, notifications, chatbubbleOutline } from 'ionicons/icons';
import { CommonUIServicesComponent } from '../Loading_Redirecting/CommonUIServices';
import { AllRoutesListed } from '../../routes/AllRoutesListed';

interface iProps {
	titleString?: any;
	chatBtn?: boolean;
	backBtn?: boolean;
	menuBtn?: boolean;
	filter_Sort_Btn?: boolean;
	sort_buttonBoolean?: () => void;
	filter_buttonBoolean?: () => void;
	mainTitle?: boolean;
	support?: boolean;
	refreshBtn?: boolean;
	refreshFunc?: any;
	tlBtn?: boolean;
	tlCount?: number;
	rl?: string;
	contactBtn?: boolean;
}

class PageHeader extends React.Component<iProps> {
	render() {
		return (
			<>
				<IonToolbar>
					<IonButtons>
						{/* START */}
						{this.props.menuBtn && <IonMenuButton slot='start' color='primary' />}
						{this.props.backBtn && <IonBackButton color='primary' defaultHref='/' />}

						{/* Middel */}
						{this.props.titleString && <IonTitle size='small'>{this.props.titleString}</IonTitle>}
						{this.props.mainTitle && (
							<IonTitle style={{ fontSize: '1.2em', fontWeight: 'bolder' }} size='large'>
								Tauschfarm
							</IonTitle>
						)}
						{/* End */}
						{this.props.filter_Sort_Btn && (
							<IonButton
								slot='end'
								onClick={() => {
									this.props.filter_buttonBoolean && this.props.filter_buttonBoolean();
								}}>
								<IonIcon color='primary' icon={filter} />
							</IonButton>
						)}

						{this.props.filter_Sort_Btn && (
							<IonButton
								slot='end'
								onClick={() => {
									this.props.sort_buttonBoolean && this.props.sort_buttonBoolean();
								}}>
								<IonIcon color='primary' icon={funnel} />
							</IonButton>
						)}

						{this.props.support && (
							<IonButton style={{ paddingTop: '11px' }} slot='end' routerLink={AllRoutesListed.userRoutes.dash_Acc_Support}>
								<IonIcon color='primary' icon={help} />
							</IonButton>
						)}

						{this.props.tlBtn && (
							<IonButton style={{ paddingTop: '11px' }} slot='end' routerLink={AllRoutesListed.otherRoutes.tl}>
								<IonIcon color='primary' icon={notifications} />
								{this.props.tlCount && this.props.tlCount > 0 && <IonBadge color='tertiary'>{this.props.tlCount}</IonBadge>}
							</IonButton>
						)}

						{this.props.refreshBtn && (
							<IonButton
								style={{ paddingTop: '11px' }}
								slot='end'
								onClick={() => {
									this.props.refreshFunc && this.props.refreshFunc();
								}}>
								<IonIcon color='primary' icon={refresh} />
							</IonButton>
						)}

						{this.props.contactBtn && (
							<IonButton slot='end' style={{ paddingTop: '11px', paddingLeft: '260px' }} routerLink={this.props.rl}>
								<IonIcon color='primary' icon={chatbubbleOutline} />
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
