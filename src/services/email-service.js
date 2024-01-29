'use strict'

var config = require('../config');
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(config.sendgridKey)

exports.send = async (to, subject, body) => {

    const msg = {
        to: to, // Change to your recipient
        from: 'oppressorcheat@oppressorcheat.com', // Change to your verified sender
        subject: subject,
        text: 'and easy to do anywhere, even with Node.js',
        html: body,
      }

    sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode)
      console.log(response[0].headers)
    })
    .catch((error) => {
      console.error(error)
    })
}
