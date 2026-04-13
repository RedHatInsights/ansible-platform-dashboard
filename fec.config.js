const path = require('path');

module.exports = {
  debug: true,
  useProxy: true,
  proxyVerbose: true,
  appUrl: ['/ansible/ansible-dashboard/', '/ansible/ansible-dashboard'],
  plugins: [],
  sassPrefix: '.ansible-dashboard, .ansibleDashboard',

  moduleFederation: {
    exclude: ['react-router-dom'],
    shared: [
      { 'react-router-dom': { singleton: true, version: '*', import: false } },
    ],
    exposes: {
      './RootApp': path.resolve(__dirname, './src/AppEntry'),
      './AnsibleWidget': path.resolve(
        __dirname,
        './src/components/Widgets/ansible-widget.tsx'
      ),
    },
  },
};
