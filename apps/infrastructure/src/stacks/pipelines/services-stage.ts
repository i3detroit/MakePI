import { Stage } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SecretsStack } from '../secrets/secrets-stack';
import { StackPropsExt } from './pipelines-interface';

export class ServicesStage extends Stage {
  constructor(scope: Construct, id: string, props: StackPropsExt) {
    super(scope, id, props);
    new SecretsStack(this, 'SecretsStack', {
      stackName: `${props.envName}-makepi-secrets`,
      env: props.env,
      envName: props.envName,
    });
  }
}
