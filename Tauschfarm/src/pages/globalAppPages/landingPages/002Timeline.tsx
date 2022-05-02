import React, { Component } from 'react';
import {
	IonPage,
	IonContent,
	IonHeader,
	IonGrid,
	IonRow,
	IonCard,
	IonCardHeader,
	IonAvatar,
	IonItem,
	IonLabel,
	IonCol,
	IonCardContent,
	IonCardSubtitle,
	IonCardTitle
} from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { connect } from 'react-redux';
import { IAppState } from '../../../services/redux/reduxModels';
import { NamedDict } from '../../../services/helpers/Tools';
import { iTimeLineEntry } from '../../../models/TimelineModels';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import moment from 'moment';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { i_BaseInterface_Category } from '../../../models/002CatagoryModels';
import CategoriesToChosefrom from '../../../services/translate/OptionsDict/CatagoriesToChoseFrom';
import { i_BaseInterface_User } from '../../../models/001UserModels';

interface iState {
	tl: NamedDict<iTimeLineEntry>;
}

function newUserEntry(entry: iTimeLineEntry, index: number, globalUsers: NamedDict<i_BaseInterface_User>, cUser: i_BaseInterface_User) {
	console.log('globalUsers', globalUsers[entry.id], entry.id);
	return (
		<IonRow key={index}>
			<IonCol>
				<IonCard>
					<IonCardHeader>
						<IonItem lines='none' routerLink={`/user/${entry.id}`}>
							<IonAvatar slot='start'>
								<img src={globalUsers[entry.id] !== undefined ? globalUsers[entry.id].avatar : cUser.avatar} alt='brokjen' />
							</IonAvatar>
							<IonLabel class='ion-text-wrap' style={{ flexWrap: 'wrap', overflow: 'visible' }}>
								{entry?.name} <br />
								<span
									style={{
										opacity: 0.5,
										fontSize: '0.9em',
										flex: '0 0 100%',
										overflow: 'visible'
									}}>
									{moment(entry?.date).utcOffset('+0200').format('ll')} {moment(entry?.date).utcOffset('+0200').format('HH:mm')}
								</span>
							</IonLabel>
						</IonItem>
						<IonCardSubtitle>{entry?.type}</IonCardSubtitle>
					</IonCardHeader>
					{entry?.content?.avatar && <img style={{ height: '300px', width: 'fit-content' }} src={entry?.content?.avatar} alt='broken' />}
				</IonCard>
			</IonCol>
		</IonRow>
	);
}

function UserNewItemEntry(entry: iTimeLineEntry, index: number) {
	return (
		<IonRow key={index}>
			<IonCol>
				<IonCard>
					<IonCardHeader>
						<IonItem lines='none' routerLink={`/user/${entry?.content?.item?.userWhoAddedItem?.id}`}>
							<IonAvatar slot='start'>
								<img src={entry?.content?.avatar} alt='brokjen' />
							</IonAvatar>
							<IonLabel class='ion-text-wrap' style={{ flexWrap: 'wrap', overflow: 'visible' }}>
								{entry?.name} <br />
								<span
									style={{
										opacity: 0.5,
										fontSize: '0.9em',
										flex: '0 0 100%',
										overflow: 'visible'
									}}>
									{moment(entry?.date).utcOffset('+0200').format('ll')} {moment(entry?.date).utcOffset('+0200').format('HH:mm')}
								</span>
							</IonLabel>
						</IonItem>
						<IonCardSubtitle>{entry?.type}</IonCardSubtitle>
					</IonCardHeader>
					<IonCard
						routerLink={`/dashboard/categories/selectedCategory/${entry?.content?.item?.categories[0]}/selectedItem/${entry?.content?.item?.id}/${
							entry?.content?.item?.id.split('-').length === 3 ? 'Group' : 'NotGroup'
						}/${entry?.content?.item?.userWhoAddedItem?.id}`}>
						{entry?.content?.item?.avatar && <img style={{ height: '300px', width: 'fit-content' }} src={entry?.content?.item.avatar} alt='broken' />}
						<IonCardContent>
							<IonCardTitle>{entry?.content?.item?.name}</IonCardTitle>
							<IonCardSubtitle>{entry?.content?.item?.description}</IonCardSubtitle>
						</IonCardContent>
					</IonCard>
				</IonCard>
			</IonCol>
		</IonRow>
	);
}

function UserNewDonEntry(entry: iTimeLineEntry, index: number) {
	return (
		<IonRow key={index}>
			<IonCol>
				<IonCard routerLink={`/donations/selectedItem/${entry?.content?.item?.id}`}>
					<IonCardHeader>
						<IonItem lines='none' routerLink={`/user/${entry.id}`}>
							<IonAvatar slot='start'>
								<img src={entry?.content?.avatar} alt='brokjen' />
							</IonAvatar>
							<IonLabel class='ion-text-wrap' style={{ flexWrap: 'wrap', overflow: 'visible' }}>
								{entry?.name} <br />
								<span
									style={{
										opacity: 0.5,
										fontSize: '0.9em',
										flex: '0 0 100%',
										overflow: 'visible'
									}}>
									{moment(entry?.date).utcOffset('+0200').format('ll')} {moment(entry?.date).utcOffset('+0200').format('HH:mm')}
								</span>
							</IonLabel>
						</IonItem>
						<IonCardSubtitle>{entry?.type}</IonCardSubtitle>
					</IonCardHeader>
					{entry?.content?.item?.avatar && <img style={{ height: '300px', width: 'fit-content' }} src={entry?.content?.item.avatar} alt='broken' />}
					<IonCardContent>
						<IonCardTitle>{entry?.content?.item?.name}</IonCardTitle>
						<IonCardSubtitle>{entry?.content?.item?.description}</IonCardSubtitle>
					</IonCardContent>
				</IonCard>
			</IonCol>
		</IonRow>
	);
}

function UserNewEventEntry(entry: iTimeLineEntry, index: number) {
	return (
		<IonRow key={index}>
			<IonCol>
				<IonCard routerLink={`/events/selectedEvent/${entry.content?.event?.id}/${entry.content?.event?.userWhoAddedEvent?.id}`}>
					<IonCardHeader>
						<IonItem lines='none'>
							<IonAvatar slot='start'>
								<img src={entry?.content?.avatar} alt='brokjen' />
							</IonAvatar>
							<IonLabel class='ion-text-wrap' style={{ flexWrap: 'wrap', overflow: 'visible' }}>
								{entry?.name} <br />
								<span
									style={{
										opacity: 0.5,
										fontSize: '0.9em',
										flex: '0 0 100%',
										overflow: 'visible'
									}}>
									{moment(entry?.date).utcOffset('+0200').format('ll')} {moment(entry?.date).utcOffset('+0200').format('HH:mm')}
								</span>
							</IonLabel>
						</IonItem>
						<IonCardSubtitle>{entry?.type}</IonCardSubtitle>
					</IonCardHeader>
					{entry?.content?.event?.avatar && <img style={{ height: '300px', width: 'fit-content' }} src={entry?.content?.event?.avatar} alt='broken' />}
					<IonCardContent>
						<IonCardTitle>{entry.content?.event?.name}</IonCardTitle>
						<IonCardSubtitle>{entry.content?.event?.description}</IonCardSubtitle>
					</IonCardContent>
				</IonCard>
			</IonCol>
		</IonRow>
	);
}

function newGroupEntry(entry: iTimeLineEntry, index: number, currentUserId: string) {
	var gi = entry.content?.group?.id.split('-')[0];
	var rl = currentUserId === gi ? `/dashboard/groups/selectedGroup/${entry.content?.group?.id}/` : `/groups/dashboard/${entry.content?.group?.id}`;
	return (
		<IonRow key={index}>
			<IonCol>
				<IonCard routerLink={rl}>
					<IonCardHeader>
						<IonItem lines='none' routerLink={`/user/${entry.id}`}>
							<IonAvatar slot='start'>
								<img src={entry?.content?.avatar} alt='brokjen' />
							</IonAvatar>
							<IonLabel class='ion-text-wrap' style={{ flexWrap: 'wrap', overflow: 'visible' }}>
								{entry?.name} <br />
								<span
									style={{
										opacity: 0.5,
										fontSize: '0.9em',
										flex: '0 0 100%',
										overflow: 'visible'
									}}>
									{moment(entry?.date).utcOffset('+0200').format('ll')} {moment(entry?.date).utcOffset('+0200').format('HH:mm')}
								</span>
							</IonLabel>
						</IonItem>
						<IonCardSubtitle>{entry?.type}</IonCardSubtitle>
					</IonCardHeader>
					{entry?.content?.group?.avatar && <img style={{ height: '300px', width: 'fit-content' }} src={entry?.content?.group.avatar} alt='broken' />}
					<IonCardContent>
						<IonCardHeader>{entry?.content?.group?.name}</IonCardHeader>
						<IonCardSubtitle>{entry?.content?.group?.description}</IonCardSubtitle>
					</IonCardContent>
				</IonCard>
			</IonCol>
		</IonRow>
	);
}

function GroupNewCatsEntry(entry: iTimeLineEntry, index: number, currentUserId: string, lang: 'en' | 'de') {
	var gi = entry.content?.group?.id.split('-')[0];
	var rl = currentUserId === gi ? `/dashboard/groups/selectedGroup/${entry.content?.group?.id}/` : `/groups/dashboard/${entry.content?.group?.id}`;
	var rlC = currentUserId === gi ? `/dashboard/groups/selectedGroup/${entry.content?.group?.id}/categories` : `/groups/dashboard/${entry.content?.group?.id}/categories`;

	return (
		<IonRow key={index}>
			<IonCol>
				<IonCard>
					<IonCardHeader>
						<IonItem lines='none' routerLink={rl}>
							<IonAvatar slot='start'>
								<img src={entry?.content?.group?.avatar} alt='brokjen' />
							</IonAvatar>
							<IonLabel class='ion-text-wrap' style={{ flexWrap: 'wrap', overflow: 'visible' }}>
								{entry?.content?.group?.name} <br />
								<span
									style={{
										opacity: 0.5,
										fontSize: '0.9em',
										flex: '0 0 100%',
										overflow: 'visible'
									}}>
									{moment(entry?.date).utcOffset('+0200').format('ll')} {moment(entry?.date).utcOffset('+0200').format('HH:mm')}
								</span>
							</IonLabel>
						</IonItem>
						<IonCardSubtitle>{entry?.type}</IonCardSubtitle>
					</IonCardHeader>
					{entry?.content?.group?.avatar && <img style={{ height: '300px', width: 'fit-content' }} src={entry?.content?.group.avatar} alt='broken' />}
					<IonCardContent>
						<IonCardTitle>{Translate(lsInj.transDict.placeholderProfile)}</IonCardTitle> <br />
						{entry?.content?.group?.description} <br />
						<br />
						{convertObjectToArray(entry?.content?.group?.categories).length > 0 && <IonCardTitle>{Translate(lsInj.transDict.CatMultiple)}</IonCardTitle>}
						<br />
						{convertObjectToArray(entry?.content?.group?.categories)
							.slice(0, 4)
							.map((cat: i_BaseInterface_Category, index) => {
								return (
									<IonItem key={index} routerLink={rlC}>
										<IonLabel>{lang === 'en' ? CategoriesToChosefrom.transDict[cat.checkMatch].en : CategoriesToChosefrom.transDict[cat.checkMatch].de}</IonLabel>
									</IonItem>
								);
							})}
					</IonCardContent>
				</IonCard>
			</IonCol>
		</IonRow>
	);
}

function GroupNewItemEntry(entry: iTimeLineEntry, index: number, currentUserId: string, lang: 'en' | 'de') {
	var gi = entry.content?.group?.id.split('-')[0];
	var rlC =
		currentUserId === gi
			? `/groups/selectedGroup/${entry.id}/selectedCatagory/${entry.content?.item?.categories[0]}/selectedItem/${entry.content?.item?.id}/undefined/${gi}`
			: `/groups/selectedGroup/${entry.id}/selectedCatagory/${entry.content?.item?.categories[0]}/selectedItem/${entry.content?.item?.id}/undefined/${gi}`;

	return (
		<IonRow key={index}>
			<IonCol>
				<IonCard>
					<IonCardHeader>
						<IonItem lines='none' routerLink={rlC}>
							<IonAvatar slot='start'>
								<img src={entry?.content?.avatar} alt='brokjen' />
							</IonAvatar>
							<IonLabel class='ion-text-wrap' style={{ flexWrap: 'wrap', overflow: 'visible' }}>
								{entry?.name} <br />
								<span
									style={{
										opacity: 0.5,
										fontSize: '0.9em',
										flex: '0 0 100%',
										overflow: 'visible'
									}}>
									{moment(entry?.date).utcOffset('+0200').format('ll')} {moment(entry?.date).utcOffset('+0200').format('HH:mm')}
								</span>
							</IonLabel>
						</IonItem>
						<IonCardSubtitle>{entry?.type}</IonCardSubtitle>
					</IonCardHeader>
					{entry?.content?.item?.avatar && <img style={{ height: '300px', width: 'fit-content' }} src={entry?.content?.item.avatar} alt='broken' />}
					<IonCardContent>
						<IonCardTitle>{entry?.content?.item?.name}</IonCardTitle>
						<IonCardSubtitle>{entry?.content?.item?.description}</IonCardSubtitle>
					</IonCardContent>
				</IonCard>
			</IonCol>
		</IonRow>
	);
}

function renderTimelineEntry(tlList: iTimeLineEntry[], lang: 'en' | 'de', currentUserId: string, glUsers: NamedDict<i_BaseInterface_User>, currentUser: i_BaseInterface_User) {
	var rs: any[] = [];

	tlList.forEach((entry: iTimeLineEntry, index) => {
		console.log('tlList', tlList);
		if (entry.type === 'New User') {
			rs.push(newUserEntry(entry, index, glUsers, currentUser));
		} else if (entry.type === 'User added new item') {
			rs.push(UserNewItemEntry(entry, index));
		} else if (entry.type === 'User added new donation') {
			rs.push(UserNewDonEntry(entry, index));
		} else if (entry.type === 'User added new event') {
			rs.push(UserNewEventEntry(entry, index));
		} else if (entry.type === 'New Group') {
			rs.push(newGroupEntry(entry, index, currentUserId));
		} else if (entry.type === 'Group added new categories') {
			rs.push(GroupNewCatsEntry(entry, index, currentUserId, lang));
		} else if (entry.type === 'Group added new item') {
			rs.push(GroupNewItemEntry(entry, index, currentUserId, lang));
		}
	});
	return rs;
}

export class TimelinePage extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			tl: this.props.tl
		};
	}

	componentDidUpdate(prevProps: any) {
		if (prevProps.tl !== this.props.tl) {
			this.setState({ tl: this.props.tl });
		}
	}

	render() {
		const { currentUser, globalUsers } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString='Timeline' />
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					<IonGrid>
						{renderTimelineEntry(
							convertObjectToArray(this.state.tl).sort((a, b) => Number(b.date) - Number(a.date)),
							currentUser.lang,
							currentUser.id,
							globalUsers,
							currentUser
						)}
					</IonGrid>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('App.tsx', state);
	return {
		tl: state.timeline.tl,
		globalUsers: state.globalUsers.GlobalUsers,
		groups: state.groups,
		eventsUser: state.user.events,
		donationsUser: state.user.donations,
		currentUser: state.user
	};
};

export default connect(mapStateToProps)(TimelinePage);
