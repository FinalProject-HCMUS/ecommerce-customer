// jest.config.js
export const testEnvironment = 'jsdom';
export const moduleNameMapper = {
  '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
};
export const setupFilesAfterEnv = ['<rootDir>/jest.setup.js'];
