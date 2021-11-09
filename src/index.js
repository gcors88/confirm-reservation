const { callStepFunction } = require('./helpers/helpers')

module.exports.handle = async (event,contex,callback) => {
    console.log('--------------------------------');
    console.log('\n\n');
    console.log('Init reservation index.handle');
    const id = event.pathParameters.id;
    console.log('Id: ', id)
    const info = typeof event.body === 'string' ?
        JSON.parse(event.body) : event.body
    
    Object.assign(info,{
        id: Number(id)
    })

    console.log('-----------------------Payload-----------------')
    console.log(info)

    await callStepFunction({
        stateMachineArn: 'arn:aws:states:us-east-2:268769556228:stateMachine:ConfirmReservationsHotels',
        input: JSON.stringify(info)
      })
    
    const message = 'Finish'
    const response = {
        statusCode: 200,
        body: JSON.stringify({ message })
      };
    callback(null, response);
}