const admin = require("firebase-admin");
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true }); //"https://webfusiononline-368cb.web.app"

admin.initializeApp();

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  // service: "gmail",
  auth: {
    user: "bianca.kleynhans93@gmail.com",
    pass: "ujnmyezphzitnncg"
  }
});

//export the cloud function called `sendEmail`
exports.sendEmail = functions.https.onRequest((req, res) => {
  //for testing purposes
  // console.log("from sendEmail function. The request object is:", JSON.stringify(req.body));

  //enable CORS using the `cors` express middleware.
  cors(req, res, () => {
    //get contact form data from the req and then assigned it to variables
    const email = req.body.data.email;
    const cell = req.body.data.cell;
    const name = req.body.data.name;
    const message = req.body.data.content;
    const subject = req.body.data.type;

    //config the email message
    const mailOptions = {
      from: "bianca.kleynhans93@gmail.com",
      to: "webfusiononline265@gmail.com, bianca.kleynhans93@gmail.com",
      subject: `Please contact me regarding ${subject}`,
      text: `Please contacts ${name}, regarding ${message}`,
      html: `<!DOCTYPE html>
      <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

      <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css">
        <!--<![endif]-->
        <style>
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 0;
          }

          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }

          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }

          p {
            line-height: inherit
          }

          @media (max-width:520px) {
            .row-content {
              width: 100% !important;
            }

            .stack .column {
              width: 100%;
              display: block;
            }
          }
        </style>
      </head>

      <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
          <tbody>
            <tr>
              <td>
                <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                          <tbody>
                            <tr>
                              <td class="column" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="heading_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td style="text-align:center;width:100%;">
                                      <h1 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 23px; font-weight: normal; letter-spacing: normal; line-height: 150%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong>&nbsp;Good day Mariette&nbsp;</strong></h1>
                                    </td>
                                  </tr>
                                </table>
                                <table class="heading_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td style="width:100%;text-align:center;">
                                      <h1 style="margin: 0; color: #555555; font-size: 23px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: center; direction: ltr; font-weight: normal; letter-spacing: normal; margin-top: 0; margin-bottom: 0;"><strong>&nbsp;${name} would like you to contact them regarding ${subject}</strong></h1>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                          <tbody>
                            <tr>
                              <td class="column" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="text_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td>
                                      <div style="font-family: Georgia, 'Times New Roman', serif">
                                        <div style="font-size: 12px; font-family: 'Bitter', Georgia, Times, 'Times New Roman', serif; mso-line-height-alt: 14.399999999999999px; color: #393d47; line-height: 1.2;">
                                          <p style="margin: 0; font-size: 18px; mso-line-height-alt: 14.399999999999999px;">&nbsp;</p>
                                          <p style="margin: 0; text-align: center; font-size: 18px;"><span style="font-size:18px;">
                                          Product Name: ${message.Name}</span></p>
                                          <p style="margin: 0; text-align: center; font-size: 18px;"><span style="font-size:18px;">&nbsp; Sides: ${message.Sides}</span></p>
                                          <p style="margin: 0; text-align: center; font-size: 18px;"><span style="font-size:18px;">&nbsp; Color: ${message.Color}</span></p>
                                          <p style="margin: 0; text-align: center; font-size: 18px;"><span style="font-size:18px;">&nbsp; Processing: ${message.Processing}</span></p>
                                          <p style="margin: 0; text-align: center; font-size: 18px;"><span style="font-size:18px;">&nbsp; Design required: ${message.Design}</span></p>
                                          <p style="margin: 0; text-align: center; font-size: 18px;"><span style="font-size:18px;">&nbsp; Hard Proof required : ${message.Proof}</span></p>
                                          <p style="margin: 0; text-align: center; font-size: 18px;"><span style="font-size:18px;">&nbsp; Paper / Material: ${message.Paper}</span></p>
                                          <p style="margin: 0; text-align: center; font-size: 18px;"><span style="font-size:18px;">&nbsp; Size: ${message.Size}</span></p>
                                          <p style="margin: 0; text-align: center; font-size: 18px;"><span style="font-size:18px;">Quantity: ${message.Quantity}</span></p>
                                          <p style="margin: 0; text-align: center; font-size: 18px;"><span style="font-size:18px;">
                                          Art: Please contact client </span></p>
                                          <p style="margin: 0; text-align: center; font-size: 18px; mso-line-height-alt: 14.399999999999999px;">&nbsp;</p>
                                          <p style="margin: 0; text-align: center; font-size: 18px; mso-line-height-alt: 14.399999999999999px;">&nbsp;</p>
                                          <p style="margin: 0; text-align: center; font-size: 18px; mso-line-height-alt: 14.399999999999999px;">&nbsp;</p>
                                          <p style="margin: 0; text-align: center; font-size: 18px;"><span style="font-size:18px;">Their email adress: ${email}</span></p>
                                          <p style="margin: 0; text-align: center; font-size: 18px;"><span style="font-size:18px;">Their cell number: ${cell}</span></p>
                                          <p style="margin: 0; text-align: center; font-size: 18px; mso-line-height-alt: 14.399999999999999px;">&nbsp;</p>
                                          <p style="margin: 0; text-align: center; font-size: 18px;"><span style="font-size:18px;">Thank you&nbsp;</span></p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table><!-- End -->
      </body>

      </html>`
    };

    //call the built in `sendMail` function and return different responses upon success and failure
    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send({
          data: {
            status: 500,
            message: error.toString()
          }
        });
      }

      return res.status(200).send({
        data: {
          status: 200,
          message: "sent"
        }
      });
    });
  });
});

//export the cloud function called `sendEmail`
exports.sendContactEmail = functions.https.onRequest((req, res) => {
  //for testing purposes
  // console.log("from sendEmail function. The request object is:", JSON.stringify(req.body));

  //enable CORS using the `cors` express middleware.
  cors(req, res, () => {
    //get contact form data from the req and then assigned it to variables
    const email = req.body.data.email;
    const cell = req.body.data.cell;
    const name = req.body.data.name;
    const message = req.body.data.msg;

    //config the email message
    const mailOptions = {
      from: email,
      to: "webfusiononline265@gmail.com, bianca.kleynhans93@gmail.com",
      subject: `Contact Us Message `,
      text: `Please contacts ${name}, regarding ${message}`,
      html: `<!DOCTYPE html>
      <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
      
      <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css">
        <!--<![endif]-->
        <style>
          * {
            box-sizing: border-box;
          }
      
          body {
            margin: 0;
            padding: 0;
          }
      
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }
      
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }
      
          p {
            line-height: inherit
          }
      
          @media (max-width:520px) {
            .row-content {
              width: 100% !important;
            }
      
            .stack .column {
              width: 100%;
              display: block;
            }
          }
        </style>
      </head>
      
      <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
          <tbody>
            <tr>
              <td>
                <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                          <tbody>
                            <tr>
                              <td class="column" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="heading_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td style="width:100%;text-align:center;">
                                      <h1 style="margin: 0; color: #555555; font-size: 31px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 150%; text-align: center; direction: ltr; font-weight: normal; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">Contact ${name}</h1>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                          <tbody>
                            <tr>
                              <td class="column" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="text_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td>
                                      <div style="font-family: Georgia, 'Times New Roman', serif">
                                        <div style="font-size: 12px; font-family: 'Bitter', Georgia, Times, 'Times New Roman', serif; mso-line-height-alt: 14.399999999999999px; color: #393d47; line-height: 1.2;">
                                          <p style="margin: 0; font-size: 20px; text-align: center;"><span style="font-size:20px;">Name: ${name}</span></p>
                                          <p style="margin: 0; font-size: 20px; text-align: center;"><span style="font-size:20px;">Email: ${email}</span></p>
                                          <p style="margin: 0; font-size: 20px; text-align: center;"><span style="font-size:20px;">Cell: ${cell}</span></p>
                                          <p style="margin: 0; font-size: 20px; text-align: center; mso-line-height-alt: 14.399999999999999px;">&nbsp;</p>
                                          <p style="margin: 0; font-size: 20px; text-align: center;"><span style="font-size:20px;">Message: ${message}</span></p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table><!-- End -->
      </body>
      
      </html>`
    };

    //call the built in `sendMail` function and return different responses upon success and failure
    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send({
          data: {
            status: 500,
            message: error.toString()
          }
        });
      }

      return res.status(200).send({
        data: {
          status: 200,
          message: "sent"
        }
      });
    });
  });
});
