/** @format */

import React, { Component } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { FavList } from '../icons/FaviconList';
import { LablesList } from '../titleLists/Titles';

interface iProps {
	title: any;
}

export default class ListHeader extends Component<iProps> {
	render() {
		return (
			<IonGrid>
				<IonRow>
					<IonCol>{this.props.title}</IonCol>
				</IonRow>
			</IonGrid>
		);
	}
}

export const ListHeader2: React.FC = () => {
	return (
		<IonGrid>
			<IonRow>
				<IonCol></IonCol>
				<IonCol>{LablesList.FoodDiary.listHeader.af}</IonCol>
				<IonCol></IonCol>
				<IonCol>{FavList.foodIcons.breadSlice.icon}</IonCol>
				<IonCol>{FavList.foodIcons.bacon.icon}</IonCol>
				<IonCol>{FavList.foodIcons.egg.icon}</IonCol>
				<IonCol>{FavList.other.fire.icon}</IonCol>
			</IonRow>
		</IonGrid>
	);
};
