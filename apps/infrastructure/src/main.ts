import * as cdk from '@aws-cdk/core';

import { environment } from './environments/environment';
import { PipelinesStack } from './stacks/pipelines/pipelines-stack';

const app = new cdk.App();
new PipelinesStack(app, 'PipelinesStack', {
  env: {
    region: environment.pipelinesRegion,
  },
});