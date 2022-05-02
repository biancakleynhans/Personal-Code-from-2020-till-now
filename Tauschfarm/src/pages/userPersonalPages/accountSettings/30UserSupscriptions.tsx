import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonCard, IonTitle, IonHeader, IonCardTitle, IonCardHeader, IonCardSubtitle } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import CheckoutForm from '../../../components/stripe/CheckoutForm';
import { connect } from 'react-redux';
import { IAppState } from '../../../services/redux/reduxModels';
import { TypesToFirebaseGlobals } from '../../../services/firebase/TypesToServer';
import { User_Update_SubType } from '../../../services/redux/actions/userActions/001UserActions';
import moment from 'moment';
import PayPalCheckoutForm from '../../../components/paypal/PayPalCheckoutForm';

interface iState {
	showPaymentStripe: boolean;
	showPaymentPayPal: boolean;
	isUserPaid: boolean;
}
class UserSupscriptions extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			showPaymentStripe: false,
			showPaymentPayPal: false,
			isUserPaid: this.props.user.subscriptionType.type === 'free' ? false : true
		};
	}

	HandleMontlySubscritionPurchase() {
		this.setState({
			showPaymentStripe: !this.state.showPaymentStripe,
			showPaymentPayPal: !this.state.showPaymentPayPal
		});
	}

	HandleThreeMonthsfree() {}

	handleSucsessPayment(token: any, type: 'stripe' | 'payPal') {
		const { user } = this.props;

		// console.log('subs page got this from callback : ', token, type);
		// console.log('user to update', user.id, user.subscriptionType);

		const updateObj = {
			id: user.id,
			sub: {
				type: 'paid',
				startDate: new Date().getTime(),
				payedWith: type
			}
		};

		this.props.updateUserSub(updateObj);
		this.setState({ isUserPaid: !this.state.isUserPaid });
	}

	render() {
		const { user } = this.props;

		const start = new Date(user.subscriptionType.startDate);
		const end = new Date(moment(new Date(user.subscriptionType.startDate)).add(3, 'months').toDate().getTime());
		const freeRemainging = moment(start).to(moment(end), true);

		// console.log('start', start, new Date(1598131957354));
		// console.log('end', end);
		// console.log('freeRemainging', freeRemainging);
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.Subcriptions)} />
					</IonHeader>
					<br />
					<br />
					<br />
					{this.state.isUserPaid && (
						<IonCard>
							<IonCardHeader>
								<IonTitle style={{ fontSize: 'large' }}>
									{Translate(lsInj.transDict.youhave)} <br /> {Translate(lsInj.transDict.startat)} <br />
									{moment(user.subscriptionType.startDate).utcOffset('+0200').format('LLL')}
								</IonTitle>
								<IonCardSubtitle style={{ fontSize: 'medium' }}>
									{Translate(lsInj.transDict.endat)} {moment(user.subscriptionType.startDate).utcOffset('+0200').add(3, 'm').format('LLL')}
								</IonCardSubtitle>
							</IonCardHeader>
						</IonCard>
					)}
					{!this.state.isUserPaid && (
						<>
							<IonCard color='primary'>
								<IonHeader>
									<IonCardTitle>{Translate(lsInj.transDict.free)}</IonCardTitle>
									<IonCardTitle>{Translate(lsInj.transDict.threefree)}</IonCardTitle>
									<IonCardSubtitle style={{ fontSize: 'medium' }}>
										{Translate(lsInj.transDict.remain)} {freeRemainging}
									</IonCardSubtitle>
								</IonHeader>
							</IonCard>

							<IonCard color='primary' onClick={() => this.HandleMontlySubscritionPurchase()}>
								<IonHeader>
									<IonCardTitle>{Translate(lsInj.transDict.paid)}</IonCardTitle>
									<IonCardTitle> {Translate(lsInj.transDict.price)}</IonCardTitle>
								</IonHeader>
							</IonCard>
							{this.state.showPaymentStripe && (
								<IonCard style={{ backgroundColor: 'lightgrey' }}>
									<IonCardTitle>{Translate(lsInj.transDict.paystripe)}</IonCardTitle>
									<br />
									<CheckoutForm
										productPrice={4.95}
										productName={Translate(lsInj.transDict.montlysub)}
										completeFunction={(token: any, type: 'stripe' | 'payPal') => this.handleSucsessPayment(token, type)}
										productDesc={Translate(lsInj.transDict.montlysub)}
										productImg={TypesToFirebaseGlobals.Main}
										productLabel={'Pay now'}
										productPayLine={'Pay now'}
										lang={this.props.user.lang}
									/>
								</IonCard>
							)}

							{this.state.showPaymentStripe && (
								<IonCard style={{ backgroundColor: 'lightgrey' }}>
									<IonCardTitle>{Translate(lsInj.transDict.paypaypal)}</IonCardTitle>
									<PayPalCheckoutForm
										amount={4.95}
										item={Translate(lsInj.transDict.montlysub)}
										completeFunction={(token: any, type: 'stripe' | 'payPal') => this.handleSucsessPayment(token, type)}
									/>
								</IonCard>
							)}
						</>
					)}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		user: state.user
	};
};

const matchDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		updateUserSub: (data: any) => dispatch(User_Update_SubType(data))
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(UserSupscriptions);
