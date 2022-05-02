/** @format */

import React, { Component } from 'react';
import { IonButton, IonLabel, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';

export class ChatHeader extends Component<any, any> {
	render() {
		const btnFillColor = this.props.selectedOne ? 'solid' : 'clear';
		const btnFillColorOther = !this.props.selectedOne ? 'solid' : 'clear';
		return (
			<>
				<IonToolbar>
					<IonButtons>
						<IonBackButton color='primary' defaultHref='/' />

						{/* <IonButton slot='start' expand='full' routerLink='/profile'>
						<IonIcon icon={camera} />
					</IonButton> */}

						<IonButton
							color='primary'
							size='large'
							fill={btnFillColorOther}
							onClick={() => {
								this.props.ChatsFunc && this.props.ChatsFunc();
								// return this.setState({ chats: !this.state.chats, list: !this.state.list });
							}}>
							<IonLabel>Chats</IonLabel>
							{/* <IonBadge style={{ margin: '5px' }} slot='end'>
								{this.props.userUnreadMsg}
							</IonBadge> */}
						</IonButton>

						<IonButton
							color='primary'
							size='large'
							slot='end'
							fill={btnFillColor}
							onClick={() => {
								this.props.ContactsFunc && this.props.ContactsFunc();
								// return this.setState({ list: !this.state.list, chats: !this.state.chats });
							}}>
							Contacts
						</IonButton>

						{/* <IonButton
						slot='start'
						expand='full'
						onClick={() => {
							console.log('Search Contacts');
						}}>
						<IonIcon icon={search} />
					</IonButton> */}
					</IonButtons>
				</IonToolbar>
			</>
		);
	}
}

export default ChatHeader;
