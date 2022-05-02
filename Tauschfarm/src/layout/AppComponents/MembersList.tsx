import React, { Component } from 'react';
import { i_BaseInterface_Member } from '../../models/001UserModels';
import { IonItem, IonAvatar, IonLabel, IonList, IonListHeader } from '@ionic/react';

class MembersList extends Component<any> {
	render() {
		const { members, title } = this.props;
		return (
			<IonList>
				<IonListHeader style={{ fontSize: 'larger', fontWeight: 'bold' }}>{title}</IonListHeader>

				{members.length > 0 &&
					members.map((mem: i_BaseInterface_Member, index: number) => {
						// console.log('mem', mem);
						return (
							<IonItem key={index} button={true} routerLink={`/user/${mem.id}`}>
								<IonAvatar slot='start'>
									<img src={mem.avatar} alt='broken' />
								</IonAvatar>
								<IonLabel class='ion-text-wrap'>{mem.name}</IonLabel>
							</IonItem>
						);
					})}
			</IonList>
		);
	}
}

export default MembersList;
