export const defaultSettings = {
  limit: 1,
  offset: 0,
  count: 0,
  filter: '',
};

export const getCurrentPage = (limit = 1, offset = 0) =>
  Math.floor(offset / limit) + 1;

export const getNewPage = (page = 1, offset = 0) => (page - 1) * offset;
