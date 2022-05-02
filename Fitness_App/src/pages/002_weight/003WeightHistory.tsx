/** @format */

import React from 'react';
import moment from 'moment';
import { IonContent, IonPage, IonCard, IonGrid, IonRow, IonCol } from '@ionic/react';
import { Get } from '../../services/firebase/ConectToServer';
import { TypesToServer } from '../../services/firebase/TypesToServer';
import { convertObjectToArray } from '../../helpers/Tools';
import PageHeader from '../../components/layout/PageHeader';
import { LablesList } from '../../components/titleLists/Titles';
import WeightChart from '../../components/charts/WeightChart';
import BioWeightchart from '../../components/charts/BioWeightchart';
import MessureWeightChart from '../../components/charts/MessureWeightChart';

interface iProps {}
interface iState {
	WeightHistoryData: any[];
	WeightMesureHistoryData: any[];
	Weight: any[];
}

export default class WeightHistory extends React.Component<iProps, iState> {
	constructor(props: any) {
		super(props);

		this.state = {
			WeightHistoryData: [],
			WeightMesureHistoryData: [],
			Weight: []
		};

		Get(TypesToServer.WeightBio)
			.then(snapshot => {
				// console.log("snapshot.val()",snapshot.val())
				var WeightHistoryData: any[] = [];

				if (snapshot.val() !== null) {
					var ArrFromServer = convertObjectToArray(snapshot.val());
					// eslint-disable-next-line
					ArrFromServer.map((y: any) => {
						WeightHistoryData.push(y);
						WeightHistoryData.sort(function(a: any, b: any) {
							if (a.date < b.date) {
								return -1;
							}
							if (a.date > b.date) {
								return 1;
							}
							return 0;
						});

						// console.log("WeightHistoryData",WeightHistoryData)

						this.setState({ WeightHistoryData: WeightHistoryData });
					});
				} else {
					console.log('No data', snapshot.val());
				}
			})
			.catch(error => {
				console.log('error get', error);
			});

		Get(TypesToServer.WeightMesssure)
			.then(snapshot => {
				// console.log("snapshot.val()",snapshot.val())
				var WeightMesureHistoryData: any[] = [];

				if (snapshot.val() !== null) {
					var ArrFromServer = convertObjectToArray(snapshot.val());
					var Weight: any[] = [];
					// eslint-disable-next-line
					ArrFromServer.map((y: any) => {
						WeightMesureHistoryData.push(y);
						WeightMesureHistoryData.sort(function(a: any, b: any) {
							if (a.date < b.date) {
								return -1;
							}
							if (a.date > b.date) {
								return 1;
							}
							return 0;
						});
					});
					WeightMesureHistoryData.map(x => {
						return Weight.push({ date: x.date, weight: +x.weight });
					});

					// console.log("Weight",Weight)
					// console.log("this.WeightMesureHistoryData",WeightMesureHistoryData)

					this.setState({ Weight: Weight });
					this.setState({ WeightMesureHistoryData: WeightMesureHistoryData });
				} else {
					console.log('No data', snapshot.val());
				}
			})
			.catch(error => {
				console.log('error get', error);
			});
	}

	render() {
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<PageHeader titleString={LablesList.Page_Header_Names.WeightHistory.af} />
				<IonContent className='ion-padding'>
					<IonCard>
						<WeightChart data={this.state.Weight} />
					</IonCard>
					<IonCard>
						<BioWeightchart data={this.state.WeightHistoryData} />
					</IonCard>
					<IonCard>
						<MessureWeightChart data={this.state.WeightMesureHistoryData} />
					</IonCard>

					<IonCard>
						<IonGrid>
							{this.state.WeightHistoryData.map((item: any, index: number) => {
								return (
									<IonRow key={index} align-items-center>
										<IonCol>
											<IonCard style={{ padding: '10px' }} color='primary'>
												{moment(item.date).format('lll')}
												<br />
												<b>{LablesList.WeightPages.BioWeight.Labels.c_weight.af}:</b>
												{item.weight} Kg <br />
												<b>{LablesList.WeightPages.BioWeight.Labels.bfat.af}:</b> {item.bodyFat} % <br />
												<b>{LablesList.WeightPages.BioWeight.Labels.muscle.af}:</b> {item.muscleMass} % <br />
												<b>{LablesList.WeightPages.BioWeight.Labels.water.af}:</b> {item.waterDensity} % <br />
												<b>{LablesList.WeightPages.BioWeight.Labels.bone.af}:</b> {item.boneDensity} % <br />
											</IonCard>
										</IonCol>
									</IonRow>
								);
							})}
						</IonGrid>
					</IonCard>

					<IonCard>
						<IonGrid>
							{this.state.WeightMesureHistoryData.map((item: any, index: number) => {
								return (
									<IonRow key={index} align-items-center>
										<IonCol>
											<IonCard style={{ padding: '10px' }} color='primary'>
												{moment(item.date).format('lll')}
												<br />
												<b> {LablesList.WeightPages.MesureWeight.Labels.c_weight.af}: </b> {item.weight} Kg <br />
												<b> {LablesList.WeightPages.MesureWeight.Labels.bust.af}:</b> {item.bust} cm <br />
												<b> {LablesList.WeightPages.MesureWeight.Labels.middle.af}: </b> {item.waist} cm <br />
												<b> {LablesList.WeightPages.MesureWeight.Labels.hips.af}: </b> {item.hip} cm <br />
												<b> {LablesList.WeightPages.MesureWeight.Labels.thigh.af}: </b> {item.thigh} cm <br />
												<b> {LablesList.WeightPages.MesureWeight.Labels.arm.af}: </b> {item.uperArm} cm <br />
											</IonCard>
										</IonCol>
									</IonRow>
								);
							})}
						</IonGrid>
					</IonCard>
				</IonContent>
			</IonPage>
		);
	}
}
