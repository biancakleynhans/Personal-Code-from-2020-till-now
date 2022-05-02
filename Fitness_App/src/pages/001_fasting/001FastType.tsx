/** @format */

import React from 'react';
import { IonPage, IonContent, IonCard, IonText, IonTitle, IonList, IonListHeader, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButton, IonCardHeader } from '@ionic/react';
import { isLocalNotify_Mobile, LocalNotify_Mobile_TypeList } from '../../capAddOns/localNotifications/LocalNotify';
import { getType, removeType, setType } from '../../helpers/FastCache';
import { typeOfFastTime } from '../../models/FastModels';
import { SetFastType } from '../../helpers/FastUtil';
import PageHeader from '../../components/layout/PageHeader';
import { generator } from '../../helpers/Tools';
import { LablesList } from '../../components/titleLists/Titles';

export default class FastTypeSelectPage extends React.Component {
	GetType() {
		var getTypeFromLS = getType();
		if (getTypeFromLS === undefined) {
			//console.log(x, "is get type info")
			return (
				<IonCard>
					{LablesList.FastPages.fastType.notSet.af}
					<IonList>
						<IonListHeader>{LablesList.FastPages.fastType.choose.af}</IonListHeader>
						<IonItem>
							<IonLabel>{LablesList.FastPages.fastType.set.main.af}</IonLabel>
							<IonSelect onIonChange={this.getSelectedTypeofFast} cancelText={LablesList.OptionsBtn.cancel.af} okText={LablesList.OptionsBtn.ok.af}>
								{typeOfFastTime.fastTypeTimes.map(i => {
									return (
										<IonSelectOption key={generator()} value={i}>
											{i}
										</IonSelectOption>
									);
								})}
							</IonSelect>
						</IonItem>
					</IonList>

					<IonText>{LablesList.FastPages.fastType.unique.af}</IonText>
					<IonItem>
						<IonInput placeholder='15' autofocus={true} inputmode='numeric' name='email' type='number' onIonChange={this.CustomFastType} />
					</IonItem>
					<IonButton onIonFocus={this.doneSelectingFastType}>{LablesList.OptionsBtn.submitBtn.af}</IonButton>
				</IonCard>
			);
		}
		if (getTypeFromLS !== undefined) {
			//console.log(x, "is get type info");
			return (
				<IonCard>
					<IonTitle>
						{LablesList.FastPages.fastType.set.name.af}: {getTypeFromLS.name}
					</IonTitle>
					<IonTitle>
						{LablesList.FastPages.fastType.set.length.af}: {getTypeFromLS.lengthofFast}
					</IonTitle>
					<IonTitle>
						{LablesList.FastPages.fastType.set.nonLength.af}: {getTypeFromLS.nonFastingTime}
					</IonTitle>

					<IonButton onIonFocus={this.resetType}>{LablesList.OptionsBtn.submitBtn.af}</IonButton>
				</IonCard>
			);
		}
	}

	getSelectedTypeofFast(e: any) {
		// console.log(SetFastType(e.target.value),"???");
		removeType();
		return setType(SetFastType(e.target.value));
	}

	doneSelectingFastType() {
		window.location.reload();
	}

	CustomFastType(i: any) {
		// console.log(i.target.value, 'input')
		// console.log(SetFastType('custom', i.target.value), 'input')
		removeType();
		return setType(SetFastType('custom', +i.target.value));
	}

	resetType() {
		removeType();
		window.location.reload();
	}

	setFastRemiderDaily(i: any) {
		isLocalNotify_Mobile(
			LocalNotify_Mobile_TypeList.RepeatDailyNotify,
			LablesList.FastPages.fastType.reminder.remiderText.title.af,
			LablesList.FastPages.fastType.reminder.remiderText.body.af,
			true,
			true,
			+i.target.value,
			0
		);
	}

	render() {
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<PageHeader titleString={LablesList.Page_Header_Names.FastType.af} />
				<IonContent>
					{this.GetType()}

					<IonCard>
						<IonCardHeader>{LablesList.FastPages.fastType.reminder.af}</IonCardHeader>
						<IonInput autofocus={true} inputmode='numeric' name='time' type='number' onIonChange={this.setFastRemiderDaily} debounce={300} placeholder='20' />
					</IonCard>
				</IonContent>
			</IonPage>
		);
	}
}
