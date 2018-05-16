/**
 *
 * Environment Config
 *
 */

const env = {
  production: {
    name: 'production',
    port: 3003
  },
  dev: {
    name: 'dev',
    port: 3003
  },
  test: {
    name: 'test',
    port: 3003
  }
};
export default env[process.env.NODE_ENV];
