module.exports = {
  default: [
    '--require-module ts-node/register',
    '--require ./tests/features/steps/*.ts',
    './tests/features/*.feature'
  ].join(' ')
};
