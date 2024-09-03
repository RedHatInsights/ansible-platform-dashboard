module.exports = {
    debug: true,
    useProxy: true,
    proxyVerbose: true,
    appUrl: ['/ansible/ansible-dashboard/', '/ansible/ansible-dashboard'],
    plugins: [],
  
    moduleFederation: {
      exclude: ['react-router-dom'],
      shared: [
        { 'react-router-dom': { singleton: true, version: '*', import: false } },
      ],
    },
  };