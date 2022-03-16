import Axios from 'axios';

const instance = Axios.create({
  validateStatus: (status) => (status >= 200 && status < 300) || status == 404,
  responseType: 'json',
});

export const axiosShared = instance;
