/** @format */

import React, { Component } from 'react';
import { IonCard, IonButton, IonText } from '@ionic/react';
import { FavList } from '../../components/icons/FaviconList';
import { LablesList } from '../../components/titleLists/Titles';

interface iProps {
	nextPagesearchResults: () => void;
	prevPagesearchResults: () => void;
}

class SearchNextPageButton extends Component<iProps> {
	handleClickNext(e: any) {
		this.props.nextPagesearchResults();
	}

	handleClickBack(e: any) {
		this.props.prevPagesearchResults();
	}

	render() {
		return (
			<IonCard color='light' style={{ textAlign: 'center' }}>
				<IonButton size='large' fill='clear' onClick={this.handleClickBack.bind(this)}>
					{FavList.navIcons.arrowLeft.icon}
				</IonButton>
				<IonText style={{ fontWeight: 'bolder', fontSize: 'large' }}>{LablesList.FoodDiary.search.page.af}</IonText>
				<IonButton size='large' fill='clear' onClick={this.handleClickNext.bind(this)}>
					{FavList.navIcons.arrowRight.icon}
				</IonButton>
			</IonCard>
		);
	}
}

export default SearchNextPageButton;
