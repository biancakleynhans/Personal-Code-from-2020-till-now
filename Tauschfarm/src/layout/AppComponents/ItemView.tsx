import React, { Component } from 'react';
import {
	IonToolbar,
	IonChip,
	IonItem,
	IonAvatar,
	IonLabel,
	IonGrid,
	IonRow,
	IonCol,
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonText,
	IonSlides,
	IonSlide
} from '@ionic/react';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import UserItemFabButton from '../Buttons/UserItemFabButton';
import UserDontationFabButton from '../Buttons/UserDontationFabButton';
import { TypesToFirebaseGlobals } from '../../services/firebase/TypesToServer';
import { i_BaseInterface_Item } from '../../models/006ItemModels';
import { i_BaseInterface_User } from '../../models/001UserModels';
import { getDistance, convertDistance } from 'geolib';

interface iProps {
	item: i_BaseInterface_Item;
	uOg: string;
	currentUser: i_BaseInterface_User;
	catN: string;
	showFab: boolean;
	showDonFab: boolean;
	groupID: string;
}

const slideOpts = {
	slidesPerView: 1,
	initialSlide: 0,
	speed: 400,
	spaceBetween: 0
};

export class ItemView extends Component<iProps> {
	private slidesRef = React.createRef<any>();

	componentDidMount() {
		this.setSlidesPerView();
		this.slidesRef.current.update();
	}

	componentDidUpdate(prevProps: any) {
		if (this.props.item.imgArray.length !== prevProps.item.imgArray.length) {
			this.setSlidesPerView();
			this.slidesRef.current.update();
		}
	}

	setSlidesPerView() {
		this.slidesRef.current.update();
		this.forceUpdate();
	}

	slideUpdate(e: any) {
		// console.log('e', e);
		// async () => this.props.setActiveDate(this.props.slides[await this.slidesRef.current.getActiveIndex()].date)
	}

	getDistancefromUser(userCoords: { latitude: number; longitude: number }, itemCoords: { latitude: number; longitude: number }) {
		var distance = '';
		// console.log('?? coords ', userCoords, itemCoords);

		var meters = getDistance(userCoords, itemCoords, 1);
		var km = convertDistance(meters, 'km');

		// console.log('meters', meters, km);

		distance = `${km.toFixed(0)} km ${Translate(lsInj.transDict.fromYou)}`;

		return distance;
	}

	renderItem(item: i_BaseInterface_Item, distance: any) {
		console.log('item', item);
		return (
			<>
				<IonSlides
					ref={this.slidesRef}
					pager={false}
					options={slideOpts}
					key={this.props.item.imgArray.length}
					onIonSlideDidChange={(e) => {
						this.slideUpdate(e);
					}}>
					{this.props.item.imgArray.map((slide: string, i) => {
						return (
							<React.Fragment key={i}>
								<IonSlide key={i}>
									<img style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', height: '400px', width: '400px' }} alt='broken' src={slide} />
								</IonSlide>
							</React.Fragment>
						);
					})}
				</IonSlides>
				{/* <img style={{ width: '100%', height: '400px' }} alt='broken' src={item !== undefined ? item.avatar : TypesToFirebaseGlobals.placeholderImg} /> */}

				{this.props.showFab && (
					<UserItemFabButton
						uOrG={this.props.uOg}
						catname={this.props.catN}
						itemId={item.id}
						userWhoAdded={item.userWhoAddedItem}
						currentUser={this.props.currentUser}
						fullItem={item}
						groupID={this.props.groupID}
					/>
				)}

				{this.props.showDonFab && <UserDontationFabButton itemId={item.id} />}

				<IonToolbar className='rounding'>
					<IonItem lines='none'>
						<IonLabel class='ion-text-wrap'>{item.name}</IonLabel>
						<IonChip slot='end'>{item.brand?.en}</IonChip>
					</IonItem>
				</IonToolbar>
				<IonItem lines='none' routerLink={`/user/${item.userWhoAddedItem.id}`}>
					<IonAvatar slot='start' style={{ width: '50px', height: '50px' }}>
						<img src={item.userWhoAddedItem !== undefined ? item.userWhoAddedItem.avatar : TypesToFirebaseGlobals.placeholderImg} alt='broken' />
					</IonAvatar>
					<IonLabel class='ion-text-wrap'>{item.userWhoAddedItem !== undefined ? item.userWhoAddedItem.name : ''}</IonLabel>
				</IonItem>
				<IonToolbar color='light'>
					<IonGrid>
						<IonRow>
							<IonCol>
								<IonCardHeader>
									<IonCardTitle>{Translate(lsInj.transDict.Size)}</IonCardTitle>
									<IonCardSubtitle color='dark'>{item.size && Translate(item.size)}</IonCardSubtitle>
								</IonCardHeader>
							</IonCol>

							<IonCol>
								<IonCardHeader>
									<IonCardTitle>{Translate(lsInj.transDict.Color)}</IonCardTitle>
									<IonCardSubtitle color='dark'>{item.color}</IonCardSubtitle>
								</IonCardHeader>
							</IonCol>

							<IonCol>
								<IonCardHeader>
									<IonCardTitle>{Translate(lsInj.transDict.Length)}</IonCardTitle>
									<IonCardSubtitle color='dark'>{item.length}</IonCardSubtitle>
								</IonCardHeader>
							</IonCol>

							<IonCol>
								<IonCardHeader>
									<IonCardTitle>{Translate(lsInj.transDict.Worth2)}</IonCardTitle>
									<IonCardSubtitle color='dark'>{item.worth}</IonCardSubtitle>
								</IonCardHeader>
							</IonCol>
							<IonCol>
								<IonCardHeader>
									<IonCardTitle>{Translate(lsInj.transDict.Shipping)}</IonCardTitle>
									<IonCardSubtitle color='dark'>{item.shipping}</IonCardSubtitle>
								</IonCardHeader>
							</IonCol>

							<IonCol>
								<IonCardHeader>
									<IonCardTitle>{Translate(lsInj.transDict.distanceFromYou)}</IonCardTitle>
									<IonCardSubtitle color='dark'>{distance}</IonCardSubtitle>
									{/* need to fix this and add the real value here using coords */}
								</IonCardHeader>
							</IonCol>
						</IonRow>
					</IonGrid>
				</IonToolbar>

				<br />
				<br />
				<br />
				<IonText style={{ margin: '15px', fontSize: '1.3em' }}>{item.description}</IonText>
				<br />
				<br />
				<br />
			</>
			// <>
			// 	<img style={{ width: '500px', height: '500px' }} alt='broken' src={item !== undefined ? item.avatar : TypesToFirebaseGlobals.placeholderImg} />

			// 	{this.props.showDonFab && <UserDontationFabButton itemId={item.id} />}

			// 	<IonToolbar className='rounding'>
			// 		<IonItem lines='none'>
			// 			<IonLabel class='ion-text-wrap'>{item.name}</IonLabel>
			// 			<IonChip slot='end'>{item.brand?.en}</IonChip>
			// 		</IonItem>
			// 	</IonToolbar>
			// 	<IonItem lines='none' routerLink={`/user/${item.userWhoAddedItem.id}`}>
			// 		<IonAvatar slot='start' style={{ width: '50px', height: '50px' }}>
			// 			<img src={item.userWhoAddedItem !== undefined ? item.userWhoAddedItem.avatar : TypesToFirebaseGlobals.placeholderImg} alt='broken' />
			// 		</IonAvatar>
			// 		<IonLabel class='ion-text-wrap'>{item.userWhoAddedItem !== undefined ? item.userWhoAddedItem.name : ''}</IonLabel>
			// 	</IonItem>
			// 	<IonToolbar color='light'>
			// 		<IonGrid>
			// 			<IonRow>
			// 				<IonCol>
			// 					<IonCardHeader>
			// 						<IonCardTitle>{Translate(lsInj.transDict.Size)}</IonCardTitle>
			// 						<IonCardSubtitle color='dark'>{item.size && Translate(item.size)}</IonCardSubtitle>
			// 					</IonCardHeader>
			// 				</IonCol>

			// 				<IonCol>
			// 					<IonCardHeader>
			// 						<IonCardTitle>{Translate(lsInj.transDict.Color)}</IonCardTitle>
			// 						<IonCardSubtitle color='dark'>{item.color}</IonCardSubtitle>
			// 					</IonCardHeader>
			// 				</IonCol>

			// 				<IonCol>
			// 					<IonCardHeader>
			// 						<IonCardTitle>{Translate(lsInj.transDict.Length)}</IonCardTitle>
			// 						<IonCardSubtitle color='dark'>{item.length}</IonCardSubtitle>
			// 					</IonCardHeader>
			// 				</IonCol>

			// 				<IonCol>
			// 					<IonCardHeader>
			// 						<IonCardTitle>{Translate(lsInj.transDict.Worth2)}</IonCardTitle>
			// 						<IonCardSubtitle color='dark'> {item.worth}</IonCardSubtitle>
			// 					</IonCardHeader>
			// 				</IonCol>
			// 				<IonCol>
			// 					<IonCardHeader>
			// 						<IonCardTitle>{Translate(lsInj.transDict.Shipping)}</IonCardTitle>
			// 						<IonCardSubtitle color='dark'> {item.shipping}</IonCardSubtitle>
			// 					</IonCardHeader>
			// 				</IonCol>

			// 				<IonCol>
			// 					<IonCardHeader>
			// 						<IonCardTitle>{Translate(lsInj.transDict.distanceFromYou)}</IonCardTitle>
			// 						<IonCardSubtitle color='dark'>{distance}</IonCardSubtitle>
			// 						{/* need to fix this and add the real value here using coords */}
			// 					</IonCardHeader>
			// 				</IonCol>
			// 			</IonRow>
			// 		</IonGrid>
			// 	</IonToolbar>

			// 	<br />
			// 	<br />
			// 	<br />
			// 	<IonText style={{ margin: '15px', fontSize: '1.3em' }}>{item.description}</IonText>
			// 	<br />
			// 	<br />
			// 	<br />
			// </>
		);
	}

	istheraItem() {
		const { item } = this.props;
		// console.log('ItemView props', this.props);

		var userCoords = {
			latitude: this.props.currentUser.location ? +this.props.currentUser.location.coords.lat : 0,
			longitude: this.props.currentUser.location ? +this.props.currentUser.location.coords.long : 0
		};
		var itemCoord = {
			latitude: this.props.item.location ? +this.props.item.location.coords.lat : 0,
			longitude: this.props.item.location ? +this.props.item.location.coords.long : 0
		};

		var distance = this.getDistancefromUser(userCoords, itemCoord);

		var windowSize = window.innerWidth;
		//console.log('windowSize', windowSize);
		if (item !== undefined && windowSize < 400) {
			return <>{this.renderItem(item, distance)}</>;
		}
		if (item !== undefined && windowSize > 900) {
			return (
				<>
					{this.props.showFab && (
						<UserItemFabButton
							uOrG={this.props.uOg}
							catname={this.props.catN}
							itemId={item.id}
							userWhoAdded={item.userWhoAddedItem}
							currentUser={this.props.currentUser}
							fullItem={item}
							groupID={this.props.groupID}
						/>
					)}
					<IonGrid>
						<IonRow>
							<IonCol size='4'></IonCol>
							<IonCol size='4'>{this.renderItem(item, distance)}</IonCol>
							<IonCol size='4'></IonCol>
						</IonRow>
					</IonGrid>
				</>
			);
		} else {
			return <></>;
		}
	}

	render() {
		return <>{this.istheraItem()}</>;
	}
}

export default ItemView;
