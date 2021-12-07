import { StackProps } from '@aws-cdk/core';
import { EnvNames } from '@make-pi/global-config';

export interface StackPropsExt extends StackProps {
  envName: EnvNames;
}
