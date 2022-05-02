import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

//this is a test key must be replaced with propper key before deployment
const pubKeyForStripe = 'pk_live_Nf1xi208YGL8Thr7qYFDunVQ';
//'pk_test_51GxQ4ZHp6P1IgCd4E3CMrAHboWB0Q6MMeuVGqN7snmTPmQfAzoabOmgQMJJ3iziZfC6KKEbG6yEg95o0kCocGrHl00s9EtXEvS';

const CheckoutForm = (props: any) => {
	function handleToken(token: any) {
		// console.log('Checkout form handle token func ', token);

		if (token) {
			alert('Payment was complete please check your email for confirmation');
			props.completeFunction(token, 'stripe');
		} else {
			alert('Payment was not complete');
		}
	}

	return (
		<>
			<StripeCheckout
				stripeKey={pubKeyForStripe}
				token={handleToken}
				amount={props.productPrice * 100}
				name={props.productName} // the pop-in header title
				billingAddress
				shippingAddress
				description={props.productDesc} // the pop-in header subtitle
				image={props.productImg} // the pop-in header image (default none)
				label={props.productLabel} // text inside the Stripe button
				panelLabel={props.productPayLine} // prepended to the amount in the bottom pay button
				currency='EUR'
				locale={props.lang ? props.lang : 'en'} //language
				zipCode={false}
				alipay // accept Alipay (default false)
				bitcoin // accept Bitcoins (default false)
				allowRememberMe // "Remember Me" option (default true)
				// Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
				// you are using multiple stripe keys
				reconfigureOnUpdate={false}
			/>
		</>
	);
};
export default CheckoutForm;
