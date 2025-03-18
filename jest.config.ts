import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // Alias pour `src/`
  },
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.ts'], // Fichier de setup
};

export default config;