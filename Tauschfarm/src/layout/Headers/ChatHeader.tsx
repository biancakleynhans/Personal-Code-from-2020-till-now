import React, { Component } from 'react';
import { IonButton, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';

export class ChatHeader extends Component<any, any> {
	render() {
		const btnFillColor = this.props.selectedOne ? 'solid' : 'clear';
		const btnFillColorOther = !this.props.selectedOne ? 'solid' : 'clear';
		return (
			<>
				<IonToolbar>
					<IonButtons>
						<IonBackButton color='primary' defaultHref='/' />
						<IonButton
							color='primary'
							size='large'
							fill={btnFillColorOther}
							onClick={() => {
								this.props.ChatsFunc && this.props.ChatsFunc();
							}}>
							{Translate(lsInj.transDict.Chats)}
						</IonButton>

						<IonButton
							color='primary'
							size='large'
							slot='end'
							fill={btnFillColor}
							onClick={() => {
								this.props.ContactsFunc && this.props.ContactsFunc();
							}}>
							{Translate(lsInj.transDict.Contacts)}
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</>
		);
	}
}

export default ChatHeader;
