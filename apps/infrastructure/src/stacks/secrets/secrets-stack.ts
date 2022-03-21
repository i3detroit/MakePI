import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StackPropsExt } from '../pipelines/pipelines-interface';

export class SecretsStack extends Stack {
  constructor(scope: Construct, id: string, props: StackPropsExt) {
    super(scope, id, props);

    new Secret(this, 'StripeApiKey', {
      secretName: `STRIPE_API_KEY_${props.envName.toUpperCase()}`,
      description: 'Stripe API Key',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({}),
        generateStringKey: 'value',
      },
    });

    new Secret(this, 'StripeWebhookSecret', {
      secretName: `STRIPE_WEHBOOK_SECRET_${props.envName.toUpperCase()}`,
      description: 'Stripe Webhook Secret',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({}),
        generateStringKey: 'value',
      },
    });
  }
}
