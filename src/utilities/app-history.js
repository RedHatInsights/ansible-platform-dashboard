const pathName = window.location.pathname.split('/');
pathName.shift();

let prefix = '/';
if (pathName[0] === 'beta' || pathName[0] === 'preview') {
  prefix = `/${pathName.shift()}/`;
}

export const release = prefix;
