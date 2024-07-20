module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    testMatch: ['**/__tests__/**/*.ts'],
    moduleFileExtensions: ['ts', 'js', 'json'],
  };
  