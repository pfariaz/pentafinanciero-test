import { config as devConfig } from './development';
import { config as stagingConfig } from './staging';
import { config as productionConfig } from './production';
import { config as testConfig } from './test';
import { config as defaultConfig } from './default';

const ENV = process.env.REACT_APP_ENV || 'development';

const config = {
  production: {...defaultConfig, ...productionConfig},
  development: {...defaultConfig, ...devConfig},
  staging: {...defaultConfig, ...stagingConfig},
  test: {...defaultConfig, ...testConfig}
};


export default config[ENV];
