import { Construct, Stack } from '@aws-cdk/core';
import { StackPropsExt } from '../pipelines/pipelines-interface';

export class SecretsStack extends Stack {
  constructor(scope: Construct, id: string, props: StackPropsExt) {
    super(scope, id, props);
  }
}
