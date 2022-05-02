const functions = require( 'firebase-functions' )
const nodemailer = require( 'nodemailer' )
const cors = require( 'cors' )( {
    origin: true
} )

const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password

const mailTransport = nodemailer.createTransport( {
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
} )

exports.submit = functions.https.onRequest( ( req, res ) => {
    res.set( 'Access-Control-Allow-Origin', '*' )
    res.set( 'Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS' )
    res.set( 'Access-Control-Allow-Headers', '*' )

    if ( req.method === 'OPTIONS' ) {
        res.end()
    } else {
        cors( req, res, () => {
            if ( req.method !== 'POST' ) {
                return
            }

            const mailOptions = {
                from: req.body.email,
                replyTo: req.body.email,
                to: gmailEmail,
                subject: `New Contact request from ${req.body.name} `,
                text: req.body.message,
                html: `<h1>${req.body.name}</h1>  <br/> <p>Please respond via cell on ${req.body.contact} or mail via ${req.body.email}</p> <br/> <b>Regarding :</b>  <p>${req.body.message}</p>`,
            }

            return mailTransport.sendMail( mailOptions ).then( () => {
                console.log( 'New email sent to:', gmailEmail )
                res.status( 200 ).send( {
                    isEmailSend: true
                } )
                return
            } )
        } )
    }
} )