/**
 * Frontend Components Config
 *
 * LOCAL DEVELOPMENT SETUP:
 * ========================
 * This app runs alongside insights-chrome for local development.
 *
 * 1. Clone insights-chrome: git clone https://github.com/RedHatInsights/insights-chrome
 * 2. Add route to insights-chrome/config/webpack.config.js:
 *    routes: {
 *      '/apps/ansible-dashboard': { host: 'https://localhost:8004' },
 *    }
 * 3. Start this app: npm start (runs on port 8004)
 * 4. Start insights-chrome: cd insights-chrome && npm run dev (runs on port 1337)
 * 5. Access: https://stage.foo.redhat.com:1337/ansible/ansible-dashboard/
 *
 * Note: Requires VPN and hosts file entry for stage.foo.redhat.com
 */
module.exports = {
  debug: true,
  useProxy: true,
  proxyVerbose: true,
  appUrl: ['/ansible/ansible-dashboard/', '/ansible/ansible-dashboard'],
  plugins: [],
  port: 8004,
  localChrome: true, // Chrome comes from insights-chrome, skip Podman
  sassPrefix: '.ansible-dashboard, .ansibleDashboard',

  moduleFederation: {
    exclude: ['react-router-dom'],
    shared: [
      { 'react-router-dom': { singleton: true, version: '*', import: false } },
    ],
  },
};
