const pathName = window.location.pathname.split('/');
pathName.shift();

let prefix = '/';
if (pathName[0] === 'beta') {
  prefix = `/${pathName.shift()}/`;
}

export const release = prefix;
