module.exports = {
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(@ms/centro-hvc-loader|@testing-library/jest-dom))/'],
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
