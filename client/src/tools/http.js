import axios from 'axios';
import Utils from './utils.js';

const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  POST_JSON: 'POST_JSON',
  POST_FORMDATA: 'POST_FORMDATA',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

// 检查并返回合适的 FormData 实现
function FormData() {
  if (typeof window !== 'undefined' && window.FormData) {
    return window.FormData;
  } else {
    return require('form-data');
  }
}

// 默认配置
const _defaultHttpConfig = {
  baseURL: 'https://org.huisharing.com/sesame/',
  timeout: 600000,
};

// 定义 Http 类
export class Http {
  adminSid = '';
  clientSid = '';

  constructor(config) {
    const opt = config || _defaultHttpConfig;
    this.client = axios.create(opt);

    // 请求拦截器：每次请求时自动添加 token 或其他 headers
    this.client.interceptors.request.use(
      (config) => {
        const url = config.url;
        const session = Utils.getLocalStorage('session');
        const sessionStorage = Utils.getSessionStorage('session');

        if (session != 'null' && sessionStorage != 'null' && url !== '/api/login/h5login/phoneLogin') {
          config.headers['token'] = `${sessionStorage ? sessionStorage : session}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器：处理响应中的错误
    this.client.interceptors.response.use(
      (response) => {
        if (response.data.code == '401') {
          // window.location.replace(`window.location.origin&{#/login?redirect=${window.location.pathname}`);
          window.location.replace(`#/login`);
        } else {
          return response;
        }
      },
      (error) => {
        return error.response || {};
      }
    );

    this.initSession();
  }

  static getInstance() {
    if (!Http._instance) {
      Http._instance = new Http();
    }
    return Http._instance;
  }

  // 初始化会话
  initSession() {
    const session = Utils.getLocalStorage('session');
    if (session) {
      this.setSession(session);
    }
  }

  // 清除会话
  clearSession() {
    this.adminSid = '';
    this.clientSid = '';
    Utils.removeLocalStorage('session');
  }

  // 设置会话
  setSession(session) {
    const { adminSid, clientSid } = session;
    if (adminSid && clientSid) {
      Utils.setLocalStorage('session', session);
      this.adminSid = adminSid;
      this.clientSid = clientSid;
    }
  }

  // 格式化请求选项
  _formatOptions(method, options) {
    // 处理 FormData
    if (typeof options.data === 'object' && !(options.data instanceof FormData())) {
      const newData = {};
      Object.keys(options.data).forEach((key) => {
        if (options.data[key] !== void 0) {
          newData[key] = options.data[key];
        } else {
          console.info(`remove undefined attr: ${key}`);
        }
      });
      options.data = newData;
    }

    if (typeof options.headers !== 'object') {
      options.headers = {};
    }

    // 如果存在 adminSid，则将其作为 Cookie 发送
    //  if (this.adminSid) {
    //    options.headers["Cookie"] = `JSESSIONID=${this.adminSid}`;
    //  }

    // 处理不同的 HTTP 方法
    switch (method) {
      case HTTP_METHOD.GET:
        options.method = 'GET';
        if (options.data) {
          options.params = options.data;
          options.paramsSerializer = {
            serialize: (params) =>
              Object.keys(params)
                .map((k) => `${k}=${encodeURIComponent(params[k])}`)
                .join('&'),
          };
          delete options.data;
        }
        break;
      case HTTP_METHOD.POST:
        options.method = 'POST';
        options.headers['content-type'] = 'application/x-www-form-urlencoded';
        if (typeof options.data === 'object' && options.data !== null) {
          options.data = Object.keys(options.data)
            .map((key) => `${key}=${encodeURIComponent(options.data[key])}`)
            .join('&');
        }
        break;
      case HTTP_METHOD.POST_JSON:
        options.method = 'POST';
        options.headers['content-type'] = 'application/json';
        options.data = typeof options.data === 'string' ? options.data : JSON.stringify(options.data);
        break;
      case HTTP_METHOD.POST_FORMDATA:
        options.method = 'POST';
        options.headers['content-type'] = 'multipart/form-data';
        break;
      case HTTP_METHOD.DELETE:
        options.method = 'DELETE';
        options.headers['content-type'] = 'application/json';
        break;
      case HTTP_METHOD.PUT:
        options.method = 'PUT';
        options.headers['content-type'] = 'application/json';
        break;
      default:
        throw new Error('Invalid HTTP method');
    }

    return options;
  }

  _handler() {
    return (response) => {
      if (response.status === 0) {
        return { __status: response.status };
      }
      if (typeof response.data === 'string') {
        try {
          const data = JSON.parse(response.data);
          data.__status = response.status;
          return data;
        } catch (e) {
          return { data: response.data, __status: response.status };
        }
      }
      const data = response.data || {};
      data.__status = response.status;
      return data;
    };
  }

  get(options) {
    const _opt = this._formatOptions(HTTP_METHOD.GET, options);
    return this.client?.request(_opt).then(this._handler());
  }

  post(options) {
    const _opt = this._formatOptions(HTTP_METHOD.POST, options);
    return this.client?.request(_opt).then(this._handler());
  }

  postFormData(options) {
    const _opt = this._formatOptions(HTTP_METHOD.POST_FORMDATA, options);
    return this.client?.request(_opt).then(this._handler());
  }

  postJSON(options) {
    const _opt = this._formatOptions(HTTP_METHOD.POST_JSON, options);
    return this.client?.request(_opt).then(this._handler());
  }

  delete(options) {
    const _opt = this._formatOptions(HTTP_METHOD.DELETE, options);
    return this.client?.request(_opt).then(this._handler());
  }

  put(options) {
    const _opt = this._formatOptions(HTTP_METHOD.PUT, options);
    return this.client?.request(_opt).then(this._handler());
  }
}
