import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import { IonCardHeader, IonCardSubtitle, IonCardTitle, IonText } from "@ionic/react";

const CLIENT = {
    sandbox:
        "AbIc8N5_2_1i4-eMipLIRB3Wu1zbuMxhKDdcutFlyGq4CqCifsYGKQqmYtVysphrGFW_-cTu9_uiRefC",
    production:
        "your_production_key"
};

const CLIENT_ID =
    process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;
//create button here
let PayPalButton = null;

// next create the class and Bind React and ReactDom to window
//as we will be needing them later

class PaypalButton extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            showButtons: false,
            loading: true,
            paid: false
        };

        window.React = React;
        window.ReactDOM = ReactDOM;
    }
    

    //In the componentDidMount () lifecycle method, you can decide if the button should be rendered already.
    //The scriptLoader gives you access to two properties in the props of the component, isScriptLoaded and isScriptLoadSucceed,
    // to check if the script was loaded successfully.If that is the case, you could already render the PayPal button.


    componentDidMount () {
        const { isScriptLoaded, isScriptLoadSucceed } = this.props;

        if ( isScriptLoaded && isScriptLoadSucceed ) {
            PayPalButton = window.paypal.Buttons.driver( "react", { React, ReactDOM } );
            this.setState( { loading: false, showButtons: true } );
        }
    }

    componentWillReceiveProps ( nextProps ) {
        const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

        const scriptJustLoaded =
            !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

        if ( scriptJustLoaded ) {
            if ( isScriptLoadSucceed ) {
                PayPalButton = window.paypal.Buttons.driver( "react", {
                    React,
                    ReactDOM
                } );
                this.setState( { loading: false, showButtons: true } );
            }
        }
    }

    // Next, we add some functions that our Paypal buttons will be needing
    // Create createOrder is called when the user clicks on any of the PayPal buttons while onApprove 
    //is called when the user approves the payment
    // it receives the user transaction details and acts accordingly


    createOrder = ( data, actions ) => {
        return actions.order.create( {
            purchase_units: [
                {
                    description: "Training session with Micheal",
                    amount: {
                        currency_code: "USD",
                        value: 150
                    }
                }
            ]
        } );
    };

    onApprove = ( data, actions ) => {
        actions.order.capture().then( details => {
            // console.log('data', data)
            // console.log('details', details)
            const paymentData = {
                payerID: data.payerID,
                orderID: data.orderID,
                payerDetails: details.payer,
                orderDetails: details.purchase_units[0],
                paymentDate: details.update_time
            };
            console.log( "Payment Approved: ", paymentData );
            this.setState( { showButtons: false, paid: true } );
            this.props.completed && this.props.completed(paymentData)
        } );
    };


    render () {
        const { showButtons, loading, paid } = this.state;

        return (
            <div className="main">
                {loading && <IonText>Loading...</IonText>}

                {showButtons && (
                   <>
                        { this.props.before}
                        <PayPalButton
                            createOrder={( data, actions ) => this.createOrder( data, actions )}
                            onApprove={( data, actions ) => this.onApprove( data, actions )}
                        />
                   </>
                   
                )}

                {paid && (
                   <IonCardHeader>
                       <IonCardTitle style={{color: 'rgb(0, 153, 255)'}}>Successfull</IonCardTitle>
                       <IonCardSubtitle style={{color: 'rgb(0, 153, 255)'}}>Booking session completed </IonCardSubtitle>
                   </IonCardHeader>
                )}
            </div>
        );
    }
}

export default scriptLoader( `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}` )( PaypalButton );
