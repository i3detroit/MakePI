import { App } from 'aws-cdk-lib';

import { environment } from './environments/environment';
import { PipelinesStack } from './stacks/pipelines/pipelines-stack';

const app = new App();
new PipelinesStack(app, 'PipelinesStack', {
  env: {
    region: environment.pipelinesRegion,
  },
});
