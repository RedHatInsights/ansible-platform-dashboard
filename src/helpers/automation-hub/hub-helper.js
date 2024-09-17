import { getAxiosInstance } from '../shared/user-login';

const axiosInstance = getAxiosInstance();

export const getCollections = () =>
  axiosInstance.get(
    `/api/automation-hub/v3/plugin/ansible/content/published/collections/index/?deprecated=false&limit=31`,
  );

export const getCollection = (offset) =>
  axiosInstance.get(
    `/api/automation-hub/_ui/v1/repo/published/?deprecated=false&offset=${offset}&limit=1`,
  );

export const getPartners = () =>
  axiosInstance.get(`/api/automation-hub/v3/namespaces/?limit=1`);

export const getSyncCollections = (account) =>
  axiosInstance.get(
    `/api/automation-hub/content/${account}-synclist/v3/plugin/ansible/content/${account}-synclist/collections/index/?deprecated=false&limit=1`,
  );
