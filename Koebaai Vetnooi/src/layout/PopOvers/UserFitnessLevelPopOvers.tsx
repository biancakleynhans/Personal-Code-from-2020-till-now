import React, { Component } from 'react';
import { IonCardContent, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonIcon, IonPopover, IonList } from '@ionic/react';

import { ellipse } from 'ionicons/icons';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';

export class ActiveLevelPopOver extends Component<any> {
	render() {
		return (
			<IonPopover
				isOpen={this.props.isOpenBool}
				// cssClass='my-custom-class'
			>
				<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.yourFitness)} </IonCardTitle>
				<IonCardSubtitle style={{ color: 'var(--ion-text-color)' }}>{this.props.prog}</IonCardSubtitle>
				<IonCardContent style={{ color: 'var(--ion-text-color)' }}>
					<IonCardSubtitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.info)}</IonCardSubtitle>
					<IonList>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#e70f0f' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.noExcercise)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#e7910f' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.littleExcercise)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#dae70f' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.normalExcercise)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#26e70f' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.goodExcercise)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#17720d' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.veryExcercise)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: 'black' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.noData)}</IonLabel>
						</IonItem>
					</IonList>
				</IonCardContent>
			</IonPopover>
		);
	}
}

export class BmiPopOver extends Component<any> {
	render() {
		return (
			<IonPopover
				isOpen={this.props.isOpenBool}
				// cssClass='my-custom-class'
			>
				<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.bmiis)}</IonCardTitle>
				<IonCardSubtitle style={{ color: 'var(--ion-text-color)' }}>{this.props.prog}</IonCardSubtitle>
				<IonCardContent style={{ color: 'var(--ion-text-color)' }}>
					<IonCardSubtitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.info)}</IonCardSubtitle>
					<IonList>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#e70fd6' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.bmiLow)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#26e70f' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.bmiNorm)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#f1ab0e' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.bmiOver)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#f10e0e' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.bmiSuper)}</IonLabel>
						</IonItem>

						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: 'black' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.noData)}</IonLabel>
						</IonItem>
					</IonList>
				</IonCardContent>
			</IonPopover>
		);
	}
}

export class BmrPopOver extends Component<any> {
	render() {
		return (
			<IonPopover
				isOpen={this.props.isOpenBool}
				// cssClass='my-custom-class'
			>
				<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.bmris)}</IonCardTitle>
				<IonCardSubtitle style={{ color: 'var(--ion-text-color)' }}>{this.props.prog}</IonCardSubtitle>
				<IonCardContent style={{ color: 'var(--ion-text-color)' }}>
					<IonCardSubtitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.info)}</IonCardSubtitle>
					{Translate(lsInj.transDict.bmrInfo)}
					<br />
					<br />
					{Translate(lsInj.transDict.female)}
					<br />
					BMR = 655 + (9.6 × {Translate(lsInj.transDict.weight)}kg) + (1.8 × {Translate(lsInj.transDict.height)}cm) – (4.7 × {Translate(lsInj.transDict.age)})
					<br />
					{Translate(lsInj.transDict.male)}
					<br />
					BMR = 66 + (13.7 × {Translate(lsInj.transDict.weight)}kg) + (5 × {Translate(lsInj.transDict.height)}cm) – (6.8 × {Translate(lsInj.transDict.age)}
					)
					<br />
					<b>{Translate(lsInj.transDict.bmrInfo2)}</b>
					<br />
					{Translate(lsInj.transDict.bmrInfo3)}
				</IonCardContent>
				<br />
				<a href='https://www.healthline.com/health/what-is-basal-metabolic-rate#purpose'>{Translate(lsInj.transDict.learnMore)}</a>
				<br />
				<br />
				<br />
			</IonPopover>
		);
	}
}

export class DietTypePopOver extends Component<any> {
	render() {
		return (
			<IonPopover
				isOpen={this.props.isOpenBool}
				// cssClass='my-custom-class'
			>
				<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.dietis)} </IonCardTitle>
				<IonCardSubtitle style={{ color: 'var(--ion-text-color)' }}>{this.props.prog}</IonCardSubtitle>
				<IonCardContent style={{ color: 'var(--ion-text-color)' }}>
					<IonCardSubtitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.info)}</IonCardSubtitle>
					{Translate(lsInj.transDict.dietInfo)}
					<br />
					<br />
					<a href='https://www.health.harvard.edu/topics/diet-and-weight-loss'>{Translate(lsInj.transDict.learnMore)}</a>
				</IonCardContent>
			</IonPopover>
		);
	}
}

export class DietGoalPopOver extends Component<any> {
	render() {
		return (
			<IonPopover
				isOpen={this.props.isOpenBool}
				// cssClass='my-custom-class'
			>
				<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.goalis)}</IonCardTitle>
				<IonCardSubtitle style={{ color: 'var(--ion-text-color)' }}>{this.props.prog}</IonCardSubtitle>
				<IonCardContent style={{ color: 'var(--ion-text-color)' }}>
					<IonCardSubtitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.info)}</IonCardSubtitle>
					{Translate(lsInj.transDict.dietInfo4)}
				</IonCardContent>
				<br />
			</IonPopover>
		);
	}
}

export class MacrosPopOver extends Component<any> {
	render() {
		return (
			<IonPopover
				isOpen={this.props.isOpenBool}
				// cssClass='my-custom-class'
			>
				<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.macros)} </IonCardTitle>
				<IonCardContent style={{ color: 'var(--ion-text-color)' }}>
					<IonCardSubtitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.info)}</IonCardSubtitle>
					<b>{Translate(lsInj.transDict.macroInfo)}</b> <br />
					{Translate(lsInj.transDict.carbs)}: {this.props.prog.carb} <br />
					{Translate(lsInj.transDict.fats)}: {this.props.prog.fat} <br />
					{Translate(lsInj.transDict.protein)}: {this.props.prog.protein} <br />
				</IonCardContent>
				<br />
			</IonPopover>
		);
	}
}

export class CWeightPopOver extends Component<any> {
	render() {
		return (
			<IonPopover
				isOpen={this.props.isOpenBool}
				// cssClass='my-custom-class'
			>
				<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.weightis)} </IonCardTitle>
				<IonCardSubtitle style={{ color: 'var(--ion-text-color)' }}>{this.props.prog}</IonCardSubtitle>
				<IonCardContent style={{ color: 'var(--ion-text-color)' }}></IonCardContent>
				<br />
			</IonPopover>
		);
	}
}

export class GWeightPopOver extends Component<any> {
	render() {
		return (
			<IonPopover
				isOpen={this.props.isOpenBool}
				// cssClass='my-custom-class'
			>
				<IonCardTitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.gweightis)}</IonCardTitle>
				<IonCardSubtitle style={{ color: 'var(--ion-text-color)' }}>{this.props.prog}</IonCardSubtitle>
				<IonCardContent style={{ color: 'var(--ion-text-color)' }}>
					<IonCardSubtitle style={{ color: 'var(--ion-text-color)' }}>{Translate(lsInj.transDict.info)}</IonCardSubtitle>
					<IonList>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#800000' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.more50)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#DC143C' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.w45)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#CD5C5C' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.w40)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#FF4500' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.w35)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#FFD700' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.w30)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#f1ab0e' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.w25)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#BDB76B' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.w20)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#FFFF00' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.w15)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#9ACD32' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.w10)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#6B8E23' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.w5)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#1E90FF' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.w3)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#0000FF' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.w1)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: '#9400D3' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.w0)}</IonLabel>
						</IonItem>
						<IonItem>
							<IonIcon slot='end' size='small' style={{ color: 'black' }} icon={ellipse} />
							<IonLabel class='ion-text-wrap'>{Translate(lsInj.transDict.noData)}</IonLabel>
						</IonItem>
					</IonList>
				</IonCardContent>
			</IonPopover>
		);
	}
}
