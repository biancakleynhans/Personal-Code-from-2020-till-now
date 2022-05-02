import React, { useState, useRef, useEffect } from 'react';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';

const PayPalCheckoutForm = (props) => {
	const { item, amount } = props;

	const [paidFor, setPaidFor] = useState(false);
	const [error, setError] = useState(null);

	const payPalRef = useRef();

	useEffect(() => {
		window.paypal
			.Buttons({
				createOrder: (data, actions) => {
					return actions.order.create({
						purchase_units: [
							{
								description: Translate(lsInj.transDict.payPalDesc),
								amount: {
									currency_code: 'EUR',
									value: amount
								}
							}
						]
					});
				},
				onApprove: async (data, actions) => {
					const order = await actions.order.capture();
					setPaidFor(true);
					// console.log('ORDER', order);
					props.completeFunction(order, 'payPal');
				},
				onError: (err) => {
					setError(err);
					console.error('ERROR', err);
				}
			})
			.render(payPalRef.current);
		// eslint-disable-next-line
	}, [item]);

	if (paidFor) {
		return <>Paid</>;
	}

	if (error) {
		return <>Error</>;
	}

	return (
		<>
			<div ref={payPalRef}></div>
		</>
	);
};

export default PayPalCheckoutForm;
