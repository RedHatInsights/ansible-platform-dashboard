module.exports = {
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  roots: ['<rootDir>/src/'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost:4000/ansible/ansible-dashboard',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@redhat-cloud-services)',
    '/node_modules/(?!@patternfly)',
  ],
  verbose: true,
};
