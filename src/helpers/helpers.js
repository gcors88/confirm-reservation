const AWS = require('aws-sdk')
const stepfunctions = new AWS.StepFunctions();

module.exports.callStepFunction = async ({stateMachineArn, input}) => {
    await stepfunctions.startExecution({stateMachineArn, input}).promise();
  };