import { Http } from './http';

const http = Http.getInstance();

// 获取黑丝数据;
const getHeisi = () => {
  return http.postJSON({
    url: 'https://v2.api-m.com/api/heisi',
  });
};

// const getHeisi = (url, data = {}) => {
//   return http.postJSON({
//     url: 'https://v2.api-m.com/api/heisi',
//     data,
//   });
// };

// const getUserInfo = (data = {}) => {
//   return http.postJSON('/user/info', data);
// };

export default {
  getHeisi,
  // getUserInfo,
};
