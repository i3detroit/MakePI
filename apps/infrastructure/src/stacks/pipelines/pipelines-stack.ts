import { Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core';
import { environment } from '../../environments/environment';
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from '@aws-cdk/pipelines';
import { ServicesStage } from './services-stage';
import { EnvNames } from '@make-pi/global-config';

export class PipelinesStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.pipelines();
  }

  private pipelines() {
    const authentication = SecretValue.secretsManager(
      environment.githubPatSecret
    );

    const input = CodePipelineSource.gitHub(
      `${environment.owner}/${environment.repo}`,
      environment.branch,
      { authentication }
    );

    const synth = new ShellStep('Synth', {
      input,
      commands: ['npm ci', 'npm run nx run infrastructure:synth'],
      primaryOutputDirectory: 'dist/apps/infrastructure',
    });

    const pipeline = new CodePipeline(this, 'CodePipeline', {
      synth,
      selfMutation: true,
      pipelineName: 'MakePiGlobalStackPipeline',
      crossAccountKeys: true,
    });

    const devServicesStage = new ServicesStage(this, EnvNames.DEV, {
      envName: EnvNames.DEV,
    });
    pipeline.addStage(devServicesStage);
  }
}
