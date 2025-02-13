const { CallerSdkTypeEnum, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'recipe-app',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

