import React, { Component } from 'react';
import { i_BaseInterface_User } from '../../models/001UserModels';
import { i_BaseInterface_Event } from '../../models/005EventModels';
import { NamedDict } from '../../services/helpers/Tools';
import { IonPopover, IonList, IonButton, IonCard, IonGrid, IonRow, IonCol, IonItem, IonIcon, IonLabel, IonCardTitle, IonCardContent } from '@ionic/react';
import { timeOutline, calendar, location, thumbsUp } from 'ionicons/icons';
import moment from 'moment';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { renderDistance, howFar } from './FilterCatContent';
import { convertObjectToArray } from '../../services/ownServices/ConverterFuncs';

interface iState {
	filterRes: boolean;
	sort: boolean;
	results: any[];
	showRes: boolean;
	eventContent: any[];
	distance: { lower: number; upper: number };
}

interface iProps {
	sort: boolean;
	filter: boolean;
	orginalEventContent: any[];
	lang: 'en' | 'de';
	// routerLink: string;
	currentUser: i_BaseInterface_User;
	filter_buttonBoolean?: () => void;
	sort_buttonBoolean?: () => void;
}

function sortByTextAsc(a: any, b: any) {
	if (a.name !== undefined && b.name !== undefined) {
		const diff = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		return -1 * diff;
	} else return 1;
}

function sortByTextDsc(a: any, b: any) {
	if (a.name !== undefined && b.name !== undefined) {
		const diff = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		return -1 * -diff;
	} else return 1;
}

function disp(event: i_BaseInterface_Event, index: number) {
	if (event.name && event.id) {
		return (
			<IonCard key={index} color='tertiary' button={true} routerLink={`/events/selectedEvent/${event?.id}/${event?.userWhoAddedEvent?.id}`}>
				{/* <img style={{ height: '193.8px', width: '100%' }} src={slide?.avatar} alt='broken' /> */}
				<IonCardContent style={{ padding: '0px' }}>
					<IonCardTitle color='light' style={{ textAlign: 'center' }}>
						{event?.name}
					</IonCardTitle>
					<IonGrid className='eventCard'>
						<IonRow>
							<IonCol color='light' size='4'>
								<IonItem lines='none' color='tertiary'>
									<IonIcon color='light' icon={timeOutline}></IonIcon>
									<IonLabel class='ion-text-wrap' color='dark' style={{ fontSize: 'small' }}>
										{Translate(lsInj.transDict.Time)} <br /> {moment(event?.time).utcOffset('+0200').format('HH:mm')}
									</IonLabel>
								</IonItem>
							</IonCol>

							<IonCol size='4'>
								<IonItem lines='none' color='tertiary'>
									<IonIcon color='light' icon={calendar}></IonIcon>
									<IonLabel class='ion-text-wrap' color='dark' style={{ fontSize: 'small' }}>
										{Translate(lsInj.transDict.Date)} <br /> {moment(event?.date).utcOffset('+0200').format('DD/MM')}
									</IonLabel>
								</IonItem>
							</IonCol>

							<IonCol size='4'>
								<IonItem lines='none' color='tertiary'>
									<IonIcon color='light' icon={location}></IonIcon>
									<IonLabel class='ion-text-wrap' color='dark' style={{ fontSize: 'small' }}>
										{Translate(lsInj.transDict.Place)} <br /> {event?.location?.address?.city}
									</IonLabel>
								</IonItem>
							</IonCol>

							<IonCol color='tertiary'>
								<IonItem lines='none' color='tertiary'>
									<IonIcon color='light' icon={thumbsUp}></IonIcon>
									<IonLabel class='ion-text-wrap' color='dark' style={{ fontSize: 'small' }}>
										{Translate(lsInj.transDict.Going)} <br /> {event?.counts?.going}
									</IonLabel>
								</IonItem>
							</IonCol>
						</IonRow>
					</IonGrid>
				</IonCardContent>
			</IonCard>
		);
	} else {
		return <></>;
	}
}

function getResults(distanceUser: { upper: number; lower: number }, currentUser: i_BaseInterface_User, eventContent: i_BaseInterface_Event[]) {
	var iRes: NamedDict<i_BaseInterface_Event> = {};
	var res: any[] = [];
	eventContent.forEach((event: i_BaseInterface_Event) => {
		var dist = howFar(currentUser, event);
		// console.log('eventContent', dist);

		if (dist < distanceUser.upper) {
			iRes = {
				...iRes,
				[event.id]: event
			};
		}
	});
	res = convertObjectToArray(iRes);
	return res;
}

export class FilterEvents extends Component<iProps, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			filterRes: this.props.filter,
			sort: false,
			results: [],
			showRes: false,
			eventContent: this.props.orginalEventContent,
			distance: { lower: 0, upper: 10 }
		};
		this.setDistance = this.setDistance.bind(this);
	}

	componentDidUpdate(prevProps: iProps) {
		if (prevProps.filter !== this.props.filter) {
			this.setState({ filterRes: this.props.filter });
		}
		if (prevProps.sort !== this.props.sort) {
			this.setState({ sort: this.props.sort });
		}
		if (prevProps.orginalEventContent !== this.props.orginalEventContent) {
			this.setState({ eventContent: this.props.orginalEventContent });
			// console.log('the cat contenttent updated ', this.state.catContent, this.props.orginalCatContent);
		}
	}

	setDistance(e: any) {
		//.detail.value as any
		// console.log('distance ', e.detail.value);
		this.setState({ distance: e.detail.value });
		this.getRes();
	}

	getRes() {
		// const { orginalCatContent } = this.props;
		var res: any[] = [];
		res = getResults(this.state.distance, this.props.currentUser, this.state.eventContent);
		this.setState({ results: res });
		// console.log('this.state', this.state);
	}

	render() {
		return (
			<>
				<IonGrid>
					{!this.state.showRes && this.props.orginalEventContent && (
						<IonRow>
							{this.state.eventContent.length > 0 ? (
								<>
									{this.props.orginalEventContent.sort(this.props.sort ? sortByTextAsc : sortByTextDsc).map((event: i_BaseInterface_Event, index: number) => {
										return disp(event, index);
									})}
								</>
							) : (
								Translate(lsInj.transDict.noContent)
							)}
						</IonRow>
					)}

					{this.state.showRes && this.state.results.length && (
						<IonRow>
							{this.state.results.length > 0 ? (
								<>
									{this.state.results.sort(this.props.sort ? sortByTextAsc : sortByTextDsc).map((event: i_BaseInterface_Event, index: number) => {
										return disp(event, index);
									})}
								</>
							) : (
								Translate(lsInj.transDict.noContent)
							)}
						</IonRow>
					)}
				</IonGrid>

				{this.state.filterRes && (
					<IonPopover
						isOpen={this.state.filterRes}
						onDidDismiss={(e) => {
							this.props.filter_buttonBoolean && this.props.filter_buttonBoolean();
							// this.props.sort_buttonBoolean && this.props.sort_buttonBoolean();
							this.setState({ filterRes: false });
						}}>
						<IonList>
							{/* items diffrent props */}

							{renderDistance(this.setDistance)}
						</IonList>

						{/* Done buttons  */}
						<IonButton
							onClick={() => {
								this.setState({ filterRes: false });
							}}>
							{Translate(lsInj.transDict.Cancel)}
						</IonButton>
						<IonButton
							onClick={() => {
								this.props.filter_buttonBoolean && this.props.filter_buttonBoolean();
								// this.props.sort_buttonBoolean && this.props.sort_buttonBoolean();
								this.setState({ filterRes: false, showRes: true });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>
				)}
			</>
		);
	}
}

export default FilterEvents;
