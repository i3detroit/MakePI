import { globalConfig } from './global-config';

describe('globalConfig', () => {
  it('should work', () => {
    expect(globalConfig()).toEqual('global-config');
  });
});
