import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StackPropsExt } from '../pipelines/pipelines-interface';

export class Services extends Stack {
  constructor(scope: Construct, id: string, props: StackPropsExt) {
    super(scope, id, props);
  }
}
