import React, { Component } from 'react';
import {
	IonPage,
	IonContent,
	IonCard,
	IonText,
	IonList,
	IonListHeader,
	IonItem,
	IonLabel,
	IonSelect,
	IonSelectOption,
	IonInput,
	IonButton,
	IonHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonCardHeader
} from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';

import { getType, removeType, setType } from '../../../../services/helpers/FastCache';
import { typeOfFastTime } from '../../../../models/FastModels';
import { SetFastType } from '../../../../services/helpers/FastUtil';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { AllRoutesListed } from '../../../../routes/AllRoutesListed';

interface iState {
	FastSet: boolean;
	FastDetails: {
		name: string;
		lengthofFast: number;
		nonFastingTime: number;
	};
}

class FastTypeSelectPage extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			FastSet: getType().isSet === false ? false : true,
			FastDetails: {
				name: getType().isSet === true ? getType().name : '',
				lengthofFast: getType().isSet === true ? getType().lengthofFast : 0,
				nonFastingTime: getType().isSet === true ? getType().nonFastingTime : 0
			}
		};
	}

	getSelectedTypeofFast(e: any) {
		console.log(e.target.value, 'preset');
		removeType();
		const setT = SetFastType(e.target.value.toString());
		setType(setT);
		console.log(setT, 'setT');
		this.setState({ FastDetails: setT });
	}

	doneSelectingFastType() {
		this.setState({ FastSet: true });
	}

	CustomFastType(e: any) {
		console.log(e.target.value, 'custom');
		console.log(e.target.value, 'preset');
		removeType();
		const setT = SetFastType('custom', e.target.value);
		setType(setT);
		console.log(setT, 'setT');
		this.setState({ FastDetails: setT });
	}

	resetType() {
		console.log('reset');
		removeType();
		this.setState({
			FastSet: false,
			FastDetails: { name: '', lengthofFast: 0, nonFastingTime: 0 }
		});
	}

	render() {
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.FastType)} />
					</IonHeader>
					<br /> <br />
					<br />
					{!this.state.FastSet && (
						<IonCard style={{ color: 'var(--ion-text-color)' }}>
							{Translate(lsInj.transDict.notSetFast)}
							<IonList>
								<IonListHeader>{Translate(lsInj.transDict.chooseFast)}</IonListHeader>
								<IonItem>
									<IonLabel>{Translate(lsInj.transDict.fastMethod)}</IonLabel>
									<IonSelect onIonChange={(e: any) => this.getSelectedTypeofFast(e)} cancelText={Translate(lsInj.transDict.Cancel)} okText={Translate(lsInj.transDict.Done)}>
										{typeOfFastTime.fastTypeTimesKoebaai.map((i) => {
											return (
												<IonSelectOption key={i} value={i}>
													{i}
												</IonSelectOption>
											);
										})}
									</IonSelect>
								</IonItem>
							</IonList>

							<IonText>{Translate(lsInj.transDict.uniqueFast)}</IonText>
							<IonItem>
								<IonInput placeholder={Translate(lsInj.transDict.chooseTime)} inputmode='numeric' name='email' type='number' onIonChange={(e: any) => this.CustomFastType(e)} />
							</IonItem>
							<IonButton onClick={() => this.doneSelectingFastType()}>{Translate(lsInj.transDict.Publish)}</IonButton>
						</IonCard>
					)}
					{this.state.FastSet && (
						<IonCard style={{ color: 'var(--ion-text-color)' }}>
							<IonCardHeader style={{ color: 'var(--ion-text-color)' }}>
								<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.nameOfFast)}:</IonCardTitle>
								<IonCardSubtitle style={{ color: 'var(--ion-text-color)' }}>{this.state.FastDetails.name}</IonCardSubtitle>
								<br />

								<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.lengthOfFast)}:</IonCardTitle>
								<IonCardSubtitle style={{ color: 'var(--ion-text-color)' }}>{this.state.FastDetails.lengthofFast} H</IonCardSubtitle>
								<br />

								<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.nonLengthFast)}:</IonCardTitle>
								<IonCardSubtitle style={{ color: 'var(--ion-text-color)' }}>{this.state.FastDetails.nonFastingTime} H</IonCardSubtitle>
							</IonCardHeader>
							<br />
							<IonButton onClick={() => this.resetType()}>{Translate(lsInj.transDict.changeFast)}</IonButton>
						</IonCard>
					)}
					<br />
					<br />
					<IonButton class='ion-text-wrap' routerLink={AllRoutesListed.otherRoutes.books}>
						{Translate(lsInj.transDict.learFast)}
					</IonButton>
				</IonContent>
			</IonPage>
		);
	}
}

export default FastTypeSelectPage;
