import React, { Component, Dispatch } from 'react';
import {
	IonSlides,
	IonSlide,
	IonCol,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonGrid,
	IonCardContent,
	IonRow,
	IonItem,
	IonIcon,
	IonLabel,
	IonCardSubtitle,
	IonButton,
	IonRouterLink
} from '@ionic/react';
import { GL_CATS } from '../../models/002CatagoryModels';
import { i_BaseInterface_Donation } from '../../models/0003DonationModels';
import { i_BaseInterface_Event } from '../../models/005EventModels';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { timeOutline, calendar, location, heart, heartOutline } from 'ionicons/icons';
import moment from 'moment';
import { i_BaseInterface_Group } from '../../models/004GroupModels';
import { i_BaseInterface_User, followingData, i_BaseInterface_Member } from '../../models/001UserModels';
import { convertObjectToArray } from '../../services/ownServices/ConverterFuncs';
import { TypesToFirebaseGlobals } from '../../services/firebase/TypesToServer';
import { connect } from 'react-redux';
import { User_AddFollowing, User_RemoveFollowing } from '../../services/redux/actions/userActions/001UserActions';

const slideOpts = {
	slidesPerView: 2,
	initialSlide: 0,
	speed: 400,
	spaceBetween: 0
};

const slideOptsBig = {
	slidesPerView: 1,
	initialSlide: 0,
	spaceBetween: 25,
	speed: 400
};

interface SlidesProps {
	slidesContent: any[];
	type: 'cat' | 'event' | 'group' | 'dons' | 'members';
	currentUserLoggendIn: string;
	lang: string;
	currentUserAsMem: i_BaseInterface_Member;
}

export class CardSliders extends Component<any> {
	private slidesRef = React.createRef<any>();
	class = '';
	classE = '';

	componentDidMount() {
		this.setSlidesPerView();
		this.slidesRef.current.update();
	}

	componentDidUpdate(prevProps: SlidesProps) {
		if (this.props.slidesContent.length !== prevProps.slidesContent.length) {
			this.setSlidesPerView();
			this.slidesRef.current.update();
			this.forceUpdate();
		}
	}

	setSlidesPerView() {
		// console.log('window.innerWidth', window.innerWidth);
		if (window.innerWidth > 800) {
			slideOpts.slidesPerView = 4;
			slideOptsBig.slidesPerView = 3;
			this.class = 'group';
			this.classE = 'event';
			this.slidesRef.current.update();
			this.forceUpdate();
			return this.class;
		} else {
			slideOpts.slidesPerView = 2;
			slideOptsBig.slidesPerView = 1;
			this.slidesRef.current.update();
			this.forceUpdate();
		}
	}

	slideUpdate(e: any) {
		this.slidesRef.current.update();
		this.forceUpdate();
		// console.log('e', e);
		// async () => this.props.setActiveDate(this.props.slides[await this.slidesRef.current.getActiveIndex()].date)
	}

	follow(userToFollow: i_BaseInterface_Member, isFollow: boolean) {
		const send: followingData = {
			currentUser: this.props.currentUserAsMem,
			follow: userToFollow
		};
		console.log('send', send);

		if (isFollow) {
			console.log('already following so unfollow');
			this.props.removeFollowing(send);
		} else {
			console.log('not following so follow');
			this.props.addFollowing(send);
			// alert(`You are now following ${send.follow.name}`);
		}
	}

	renderEvents() {
		return (
			<IonSlides
				ref={this.slidesRef}
				pager={true}
				options={slideOptsBig}
				key={this.props.slidesContent.length}
				onIonSlideDidChange={(e) => {
					this.slideUpdate(e);
				}}>
				{this.props.slidesContent.map((slide: i_BaseInterface_Event, i: number) => {
					return (
						<>
							{slide?.id !== undefined && slide?.name !== undefined && (
								<IonSlide className={this.classE} key={i}>
									<IonCard
										style={{ width: '400px', height: '400px' }}
										color='tertiary'
										button={true}
										routerLink={`/events/selectedEvent/${slide?.id}/${slide?.userWhoAddedEvent?.id}`}>
										<img style={{ width: '400px', height: '280px', display: 'block' }} src={slide?.avatar} alt='broken' />
										<IonCardContent style={{ padding: '0px' }}>
											<IonCardTitle color='light' style={{ textAlign: 'center' }}>
												{slide?.name}
											</IonCardTitle>
											<IonGrid className='eventCard'>
												<IonRow>
													<IonCol color='light' size='4'>
														<IonItem lines='none' color='tertiary'>
															<IonIcon color='light' icon={timeOutline}></IonIcon>
															<IonLabel class='ion-text-wrap' color='dark' style={{ fontSize: 'small' }}>
																{Translate(lsInj.transDict.Time)} <br /> {moment(slide?.time).utcOffset('+0200').format('HH:mm')}
															</IonLabel>
														</IonItem>
													</IonCol>

													<IonCol size='4'>
														<IonItem lines='none' color='tertiary'>
															<IonIcon color='light' icon={calendar}></IonIcon>
															<IonLabel class='ion-text-wrap' color='dark' style={{ fontSize: 'small' }}>
																{Translate(lsInj.transDict.Date)} <br /> {moment(slide?.date).utcOffset('+0200').format('DD/MM')}
															</IonLabel>
														</IonItem>
													</IonCol>

													<IonCol size='4'>
														<IonItem lines='none' color='tertiary'>
															<IonIcon color='light' icon={location}></IonIcon>
															<IonLabel class='ion-text-wrap' color='dark' style={{ fontSize: 'small' }}>
																{Translate(lsInj.transDict.Place)} <br /> {slide?.location?.address?.city}
															</IonLabel>
														</IonItem>
													</IonCol>
												</IonRow>
											</IonGrid>
										</IonCardContent>
									</IonCard>
								</IonSlide>
							)}
						</>
					);
				})}
			</IonSlides>
		);
	}
	renderGroups() {
		return (
			<IonSlides
				ref={this.slidesRef}
				pager={true}
				options={slideOpts}
				key={this.props.slidesContent.length}
				onIonSlideDidChange={(e) => {
					this.slideUpdate(e);
				}}>
				{this.props.slidesContent.map((slide: i_BaseInterface_Group, i: number) => {
					return (
						<IonSlide className={this.class} key={i}>
							<IonCard style={{ width: '150px', height: '250px' }} button={true} routerLink={`/groups/selectedGroup/${slide?.id}`}>
								<img style={{ width: '100%', height: '150px', display: 'block' }} src={slide?.avatar} alt='broken' />
								{/* <IonCardContent> */}
								<IonCardHeader>
									<IonCardTitle style={{ fontSize: '1em' }}>{slide?.name}</IonCardTitle>
									<IonCardSubtitle style={{ fontSize: '0.9em' }}>
										{slide?.memberCount} {Translate(lsInj.transDict.Members)}
									</IonCardSubtitle>
								</IonCardHeader>
								{/* </IonCardContent> */}
							</IonCard>
						</IonSlide>
					);
				})}
			</IonSlides>
		);
	}
	renderMembers() {
		return (
			<IonSlides
				ref={this.slidesRef}
				pager={false}
				options={slideOpts}
				key={this.props.slidesContent.length}
				onIonSlideDidChange={(e) => {
					this.slideUpdate(e);
				}}>
				{this.props.slidesContent.map((slide: i_BaseInterface_User, i: number) => {
					var isFollow = convertObjectToArray(slide?.UsersFollowingMe).find((u) => u.id === this.props.currentUserLoggendIn);

					if (slide?.id && slide?.name && slide?.avatar) {
						return (
							<IonSlide className={this.class} key={i}>
								<IonCard style={{ width: '150px', height: '250px' }}>
									<IonRouterLink routerLink={`/members/${slide?.id}/${this.props.currentUserLoggendIn}`}>
										<img
											style={{ width: '100%', height: '150px', display: 'block' }}
											src={slide && slide.avatar === undefined ? TypesToFirebaseGlobals.placeholderImg : slide.avatar}
											alt='broken'
										/>
									</IonRouterLink>
									<IonCardContent style={{ padding: '0px', margin: '0px' }}>
										<IonButton
											style={{ padding: '0px', margin: '0px' }}
											fill='clear'
											onClick={() => {
												this.follow({ name: slide?.name, avatar: slide?.avatar, id: slide?.id }, isFollow);
											}}>
											<IonIcon size='large' color='secondary' icon={isFollow ? heart : heartOutline} />
										</IonButton>

										<IonCardSubtitle style={{ fontSize: '0.9em' }} class='ion-text-wrap'>
											{convertObjectToArray(slide?.UsersFollowingMe).length} {Translate(lsInj.transDict.Followers)}
										</IonCardSubtitle>

										<IonButton
											class='ion-text-wrap'
											style={{ fontSize: '0.9em' }}
											color='medium'
											fill='clear'
											routerLink={`/members/${slide?.id}/${this.props.currentUserLoggendIn}`}>
											{slide?.name}
										</IonButton>
									</IonCardContent>
								</IonCard>
							</IonSlide>
						);
					} else {
						return <></>;
					}
				})}
			</IonSlides>
		);
	}
	renderDons() {
		return (
			<IonSlides
				ref={this.slidesRef}
				pager={true}
				options={slideOpts}
				key={this.props.slidesContent.length}
				onIonSlideDidChange={(e) => {
					this.slideUpdate(e);
				}}>
				{this.props.slidesContent.map((slide: i_BaseInterface_Donation, i: number) => {
					return (
						<React.Fragment key={i}>
							<IonSlide className={this.class} key={i}>
								<IonCard style={{ width: '150px', height: '280px' }} button={true} routerLink={`/donations/selectedItem/${slide?.id}`}>
									<img style={{ width: '100%', height: '150px', display: 'block' }} src={slide?.avatar} alt='broken' />
									<IonCardContent style={{ padding: '0px' }}>
										<IonCardHeader>
											<IonCardTitle style={{ fontSize: '1em' }}>{slide?.name}</IonCardTitle>
											{this.props.lang === 'de' && (
												<IonCardSubtitle style={{ fontSize: '0.8em' }}>
													G: {slide?.size?.de} <br />
													F: {slide?.color} <br />
													M: {slide?.length} <br />
												</IonCardSubtitle>
											)}

											{this.props.lang === 'en' && (
												<IonCardSubtitle style={{ fontSize: '0.8em' }}>
													S: {slide?.size?.en} <br />
													C: {slide?.color} <br />
													L: {slide?.length} <br />
												</IonCardSubtitle>
											)}
										</IonCardHeader>
									</IonCardContent>
								</IonCard>
							</IonSlide>
						</React.Fragment>
					);
				})}
			</IonSlides>
		);
	}
	renderCats() {
		return (
			<IonSlides
				ref={this.slidesRef}
				pager={false}
				options={slideOpts}
				key={this.props.slidesContent.length}
				onIonSlideDidChange={(e) => {
					this.slideUpdate(e);
				}}>
				{this.props.slidesContent.map((slide: GL_CATS, i: number) => {
					return (
						<React.Fragment key={i}>
							{slide.checkMatch !== 'Uncategorized' && (
								<IonSlide className={this.class}>
									<IonCard
										style={{ width: '150px', height: '230px' }}
										button={true}
										routerLink={`/homeBasedCategories/:userName/${slide?.checkMatch}/${slide?.groupName.length > 0 ? slide?.groupName : 'NoGroup'}`}>
										<img style={{ width: '100%', height: '150px', display: 'block' }} src={slide?.avatar} alt='broken' />

										<IonCardContent>
											<IonCardHeader style={{ padding: '0px', margin: '0px' }}>
												<IonCardTitle style={{ fontSize: '1em' }}>{slide?.name}</IonCardTitle>
												<IonCardSubtitle style={{ fontSize: '0.9em' }}>
													{convertObjectToArray(slide.items).length} {Translate(lsInj.transDict.itemMultiple)}
												</IonCardSubtitle>
											</IonCardHeader>
										</IonCardContent>
									</IonCard>
								</IonSlide>
							)}
						</React.Fragment>
					);
				})}
			</IonSlides>
		);
	}

	render() {
		return (
			<>
				{this.props.type === 'event' && this.renderEvents()}

				{this.props.type === 'group' && this.renderGroups()}

				{this.props.type === 'members' && this.renderMembers()}

				{this.props.type === 'dons' && this.renderDons()}

				{this.props.type === 'cat' && this.renderCats()}
			</>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		addFollowing: (followingData: followingData) => dispatch(User_AddFollowing(followingData)),
		removeFollowing: (followingData: followingData) => dispatch(User_RemoveFollowing(followingData))
	};
};

export default connect(null, mapDispatchToProps)(CardSliders);
