import * as cdk from '@aws-cdk/core';

import { environment } from './environments/environment';

const app = new cdk.App();
new PipelinesStack(app, 'the-apostles-pipelines', {
  env: {
    region: environment.pipelinesRegion,
  },
});
