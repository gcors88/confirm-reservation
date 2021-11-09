const AWS = require('aws-sdk')
const SES = new AWS.SES()

module.exports.handle = async (event, context, callback) => {
    console.log('------------------SEND EMAIL---------------------')
    console.log(event)

    message = event.confirmed ? 
        `<h1>Prezado sua reserva foi confirmada lhe aguardamos ansiosamente</h1>
         <h4>Seguem dados da sua reserva:</h4>
         <p>Quarto: ${event.bedroom} </p>
         <p>Data: ${event.date} </p>
         <p>Status: Confirmado </p>
        ` : 
        `<h1>Prezado sua reserva infelizmente foi cancelada por motivos administrativos.</h1>
        <h4>Seguem dados da sua reserva:</h4>
        <p>Quarto: ${event.bedroom} </p>
        <p>Data: ${event.date} </p>
        <p>Status: Cancelada </p>`

    const params = {
        Destination: {
            ToAddresses: [event.to.toLowerCase()],
        },
        Message: {
            Body: {
            Html: {
                Charset: 'UTF-8',
                Data: `<html>
                            <body>
                            ${message}
                            </body>
                        </html>
                `,
            },
            },
            Subject: {
            Data: `Solicitação de Reserva quarto ${event.bedroom}`,
            },
        },
        Source: `glauber17230@gmail.com`,
    };

    await SES.sendEmail(params).promise();
    callback(null, null);
}
