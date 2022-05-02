import React from 'react';
import { IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { filter, funnel } from 'ionicons/icons';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';

interface iProps {
	eventsBtn?: boolean;
	eventFunc?: () => void;
	eventSet?: boolean;

	groupsBtn?: boolean;
	groupsBtn2?: boolean;
	groupsFunc?: () => void;
	groupsSet?: boolean;

	filter_Sort_Btn?: boolean;
	sort_buttonBoolean?: () => void;
	filter_buttonBoolean?: () => void;
}

class SecondaryPageHeader extends React.Component<iProps> {
	render() {
		const btnFillColorEvent = this.props.eventSet ? 'solid' : 'clear';
		const btnFillColorOtherEvent = !this.props.eventSet ? 'solid' : 'clear';

		const btnFillColorGroup = this.props.groupsSet ? 'solid' : 'clear';
		const btnFillColorOtherGroup = !this.props.groupsSet ? 'solid' : 'clear';

		return (
			<IonToolbar>
				<IonButtons>
					{this.props.eventsBtn && (
						<IonButton
							slot='start'
							color='primary'
							fill={btnFillColorEvent}
							onClick={() => {
								this.props.eventFunc && this.props.eventFunc();
							}}>
							{Translate(lsInj.transDict.Other)}
						</IonButton>
					)}

					{this.props.eventsBtn && (
						<IonButton
							slot='end'
							color='primary'
							fill={btnFillColorOtherEvent}
							onClick={() => {
								this.props.eventFunc && this.props.eventFunc();
							}}>
							{Translate(lsInj.transDict.My)}
						</IonButton>
					)}

					{this.props.groupsBtn && (
						<IonButton
							slot='start'
							color='primary'
							fill={btnFillColorOtherGroup}
							onClick={() => {
								this.props.groupsFunc && this.props.groupsFunc();
							}}>
							{Translate(lsInj.transDict.Other)}
						</IonButton>
					)}

					{this.props.groupsBtn && (
						<IonButton
							slot='end'
							color='primary'
							fill={btnFillColorGroup}
							onClick={() => {
								this.props.groupsFunc && this.props.groupsFunc();
							}}>
							{Translate(lsInj.transDict.My)}
						</IonButton>
					)}

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
				</IonButtons>
			</IonToolbar>
		);
	}
}

export default SecondaryPageHeader;
