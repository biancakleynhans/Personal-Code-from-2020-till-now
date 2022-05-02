import React, { Component, Dispatch } from 'react';
import axios from 'axios';
import { IonItem, IonLabel, IonInput, IonButton, IonCard } from '@ionic/react';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { User_Event_Set_Location } from '../../../services/redux/actions/userActions/005EventsActions';
import { i_BaseInterface_Location_Full } from '../../../models/005EventModels';
import { User_Update_Location } from '../../../services/redux/actions/userActions/001UserActions';
import { RedirectTo } from '../../../layout/Loading_Redirecting/CommonUIServices';

const APP_ID_HERE = '5RrixL9OWykQ6lw9ZYmCRUG2XZ1QvBWosA4pL2ilH08';

interface iState {
	//response from sever
	address: {
		district: string;
		houseNumber: string;
		street: string;
		city: string;
		state: string;
		postalCode: string;
		country: string;
		county: string;
		label: string;
	};

	locationId: string;
	locationType: string;
	coords: {
		lat: string;
		long: string;
	};

	isChecked: boolean;
	//request string
	query: string;
}

class AddressForm extends Component<any, iState> {
	constructor(props: any) {
		super(props);

		this.state = this.getInitialState();

		// User has entered something in the address bar
		this.onQuery = this.onQuery.bind(this);
		// User has entered something in an address field
		this.onAddressChange = this.onAddressChange.bind(this);
		// User has clicked the clear button
		this.onClear = this.onClear.bind(this);
	}

	onQuery() {
		// console.log('onQuery', this.state.query);
		const query = this.state.query;
		var obj = {
			address: {
				district: '',
				houseNumber: '',
				street: '',
				city: '',
				state: '',
				postalCode: '',
				country: '',
				county: '',
				label: ''
			},

			locationId: '',
			locationType: '',
			isChecked: true,
			coords: {
				lat: '',
				long: ''
			}
		};

		axios
			.get('https://geocoder.ls.hereapi.com/search/6.2/geocode.json', {
				params: {
					languages: 'en-US',
					maxresults: 1,
					searchtext: query,
					apiKey: APP_ID_HERE
				}
			})
			.then((response: any) => {
				if (response.data.Response) {
					// console.log('response from api', response.data.Response);
					if (response.data.Response.View[0]) {
						if (response.data.Response.View[0].Result[0]) {
							// console.log('response from api', response.data.Response.View[0].Result);

							var res = response.data.Response.View[0].Result[0].Location;

							obj = {
								address: {
									street: res.Address.Street,
									city: res.Address.City,
									state: res.Address.State,
									postalCode: res.Address.PostalCode,
									country: res.Address.Country,
									county: res.Address.County,
									label: res.Address.Label,
									district: res.Address.District,
									houseNumber: res.Address.HouseNumber
								},

								locationId: res.LocationId,
								locationType: res.LocationType,
								isChecked: true,
								coords: {
									lat: res.DisplayPosition.Latitude,
									long: res.DisplayPosition.Longitude
								}
							};
							this.setStateINReq(obj);
						}
					}
				}
			});
	}

	setStateINReq(res: any) {
		// console.log('res done', res);
		this.setState(res);

		if (this.props.type === 'createEvent') {
			this.props.setEventLoc(res);
		} else {
			// console.log('type', this.props.type);
		}
	}

	getInitialState() {
		return {
			address: {
				district: '',
				houseNumber: '',
				street: '',
				city: '',
				state: '',
				postalCode: '',
				country: '',
				county: '',
				label: ''
			},

			locationId: '',
			locationType: '',
			isChecked: false,
			coords: {
				lat: '',
				long: ''
			},
			query: ''
		};
	}

	onClear(evt: any) {
		// console.log('onClear evt', evt);
		const ClearState = this.getInitialState();
		this.setState(ClearState);
	}

	onAddressChange(e: any) {
		// console.log('onAddressChange evt', e);
		this.setState({ query: e.detail.value });
		this.onQuery();
	}

	alert() {
		if (!this.state.isChecked) {
			return;
		} else {
			if (this.state.coords === null) {
				return (
					<IonCard color='danger'>
						<b>Invalid.</b> The address is not recognized.
					</IonCard>
				);
			} else {
				return (
					<IonCard color='success'>
						<b>Valid Address.</b>.
						<br />
						Is this the correct Location : <br />
						<br />
						{this.state.address.houseNumber} <br />
						{this.state.address.street} <br />
						{this.state.address.district} <br />
						{this.state.address.city} <br />
						{this.state.address.county} <br />
						{this.state.address.state} <br />
						{this.state.address.country} <br />
						{this.state.address.postalCode} <br />
					</IonCard>
				);
			}
		}
	}

	saveUserLocChanege() {
		if (this.props.type === 'userUpdate') {
			// console.log('type', this.props.type);
			// console.log('state', this.state);

			var loc = {
				address: {
					district: this.state.address.district ? this.state.address.district : '',
					houseNumber: this.state.address.houseNumber ? this.state.address.houseNumber : '',
					street: this.state.address.street ? this.state.address.street : '',
					city: this.state.address.city ? this.state.address.city : '',
					state: this.state.address.state ? this.state.address.state : '',
					postalCode: this.state.address.postalCode ? this.state.address.postalCode : '',
					country: this.state.address.country ? this.state.address.country : '',
					county: this.state.address.county ? this.state.address.county : '',
					label: this.state.address.label ? this.state.address.label : ''
				},

				locationId: this.state.locationId ? this.state.locationId : '',
				locationType: this.state.locationType ? this.state.locationType : '',
				coords: {
					lat: this.state.coords.lat ? this.state.coords.lat : 0,
					long: this.state.coords.long ? this.state.coords.long : 0
				}
			};

			this.props.setUserAdress(loc);
			RedirectTo('/');
		}
	}

	render() {
		let result = this.alert();
		return (
			<>
				<IonItem className='eventInput'>
					<IonLabel class='ion-text-wrap' position='floating'>
						{Translate(lsInj.transDict.Location)}
					</IonLabel>
					<IonInput debounce={1000} value={this.state.query} onIonChange={(e) => this.onAddressChange(e)} clearInput />
				</IonItem>

				<IonItem lines='none'>
					<IonCard style={{ textAlign: 'center' }} color='primary' button class='ion-text-wrap' onClick={this.onQuery}>
						{Translate(lsInj.transDict.checkLoc)}
					</IonCard>
				</IonItem>
				<br />
				<br />
				{result}

				{this.props.type === 'userUpdate' && (
					<IonButton disabled={this.state.address.label.length === 0 ? true : false} onClick={() => this.saveUserLocChanege()}>
						{Translate(lsInj.transDict.Save)}
					</IonButton>
				)}
			</>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		setEventLoc: (data: i_BaseInterface_Location_Full) => dispatch(User_Event_Set_Location(data)),
		setUserAdress: (data: i_BaseInterface_Location_Full) => dispatch(User_Update_Location(data))
	};
};

export default connect(null, mapDispatchToProps)(AddressForm);

// City: "Gonubie"
// Country: "ZAF"
// County: "Buffalo City"
// District: "Gonubie North"
// HouseNumber: "6"
// Label: "6 Dew Dr, Gonubie, 5257, South Africa"
// PostalCode: "5257"
// State: "Eastern Cape"
// Street: "Dew Dr"
