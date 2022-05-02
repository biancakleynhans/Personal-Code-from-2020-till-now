/** @format */

import React from 'react';
import { IonGrid, IonPage, IonContent, IonCard, IonRow, IonCol, IonRouterLink } from '@ionic/react';
import moment from 'moment';
import { Get } from '../../services/firebase/ConectToServer';
import { TypesToServer } from '../../services/firebase/TypesToServer';
import { convertObjectToArray } from '../../helpers/Tools';
import PageHeader from '../../components/layout/PageHeader';
import { LablesList } from '../../components/titleLists/Titles';
import BarChart from '../../components/charts/FastChart';

function getAv(arr: any) {
	var total = 0;
	for (var i = 0; i < arr.length; i++) {
		total += arr[i].duration;
	}
	var avg = total / arr.length;
	return avg;
}

export default class FastHistoryPage extends React.Component {
	fastHistoryData: any[] = [];
	lenghtOfFD = 0;
	longestFastlength = 0;
	shortesFastlength = 0;
	averageFastlength = 0;
	longestStreak: any;
	currentsStreak: any;

	///
	lof: any[] = [];
	dof: any[] = [];
	labels: any[] = [];

	constructor(props: any) {
		super(props);

		var ArrFromServer: any[] = [];

		Get(TypesToServer.Fast)
			.then(snapshot => {
				console.log('snapshot.val()', snapshot.val());
				if (snapshot.val() !== null) {
					ArrFromServer = convertObjectToArray(snapshot.val());
					return ArrFromServer;
				} else {
					ArrFromServer = [];
					return ArrFromServer;
				}
			})
			.then(data => {
				console.log('??????', data);

				if (data.length <= 0) {
					console.log('data.length  < 0', data.length);

					return;
				} else {
					ArrFromServer.map((y: any) => {
						this.fastHistoryData.push(y);
						console.log('?????? Y', y);
						this.lof.push(+y.typeofFast.lengthofFast);
						this.dof.push(+y.duration.toFixed(2));
						return this.fastHistoryData;
					});

					this.fastHistoryData.map(x => {
						for (let index = 0; index < this.fastHistoryData.length; index++) {
							this.labels.push('');
							return this.labels;
						}
						return this.labels;
					});

					this.lenghtOfFD = this.fastHistoryData.length;
					this.longestFastlength = Math.max.apply(
						Math,
						this.fastHistoryData.map(function(o) {
							return o.duration;
						})
					);
					this.shortesFastlength = Math.min.apply(
						Math,
						this.fastHistoryData.map(function(o) {
							return o.duration;
						})
					);
					this.averageFastlength = getAv(this.fastHistoryData);

					console.log('fastHistoryData', this.fastHistoryData);
					console.log('lenghtOfFD', this.lenghtOfFD); //amount of fasts
					console.log('longestFastlength', this.longestFastlength); //longest fast
					console.log('shortesFastlength', this.shortesFastlength); //longest fast
					console.log('averageFastlength', this.averageFastlength); //av fast length
					console.log('lof', this.lof);
					console.log('dof', this.dof);
					console.log('labels', this.labels);

					this.forceUpdate();
				}
			})
			.catch(error => {
				console.log('error get', error);
			});
	}

	render() {
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<PageHeader titleString={LablesList.Page_Header_Names.FastHistory.af} />
				<IonContent>
					<IonCard className='ion-card-padding'>
						<IonGrid>
							<IonRow>
								<IonCol>
									{LablesList.FastPages.fastHistory.done.af} <br /> {this.lenghtOfFD}
								</IonCol>
								<IonCol>
									{LablesList.FastPages.fastHistory.avg.af} <br /> {isNaN(this.averageFastlength) ? 0 : this.averageFastlength.toFixed(2)} h
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									{LablesList.FastPages.fastHistory.long.af} <br /> {this.longestFastlength !== Infinity ? this.longestFastlength.toFixed(2) : 0} h
								</IonCol>
								<IonCol>
									{LablesList.FastPages.fastHistory.short.af}
									<br /> {this.shortesFastlength !== Infinity ? this.shortesFastlength.toFixed(2) : 0} h
								</IonCol>
							</IonRow>
						</IonGrid>
					</IonCard>

					<IonCard className='ion-card-padding'>
						<BarChart LengthOfFast={this.lof} DurationCompleted={this.dof} labels={this.labels} />
					</IonCard>

					<IonCard>
						<IonGrid>
							{this.fastHistoryData.map((item: any, index: number) => {
								console.log(item.id);
								return (
									<IonRow key={index} align-items-center>
										<IonCol>
											<IonCard style={{ padding: '10px' }} color='primary'>
												<IonRouterLink color='dark' routerLink={`/fastEdit/${item.id}`} routerDirection='none'>
													{moment(new Date(item.startTime)).format('lll')}
													<br />
													{moment(new Date(item.endTime)).format('lll')} <br />
													{item.duration.toFixed(2)} Ure <br />
													{item.typeofFast.name} <br />
													{LablesList.FastPages.fastHistory.change.af}
												</IonRouterLink>
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
