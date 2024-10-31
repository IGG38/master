import { Axios } from 'axios';

function getPathValue(name, paramsUrl) {
  let search = paramsUrl.substring(1);
  if (!search) return '';
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = search.match(reg);
  let context = '';
  if (r != null) {
    context = r[2];
  }
  return context || '';
}

function getQueryString(name) {
  return getPathValue(name, window.location.search) || getPathValue(name, window.location.hash);
}

function getLocalStorage(key) {
  let data = window.localStorage.getItem(key);
  if (!data) return data;
  if (data.startsWith('{') || data.startsWith('[')) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  } else {
    return data;
  }
}

function setLocalStorage(key, data) {
  if (typeof data === 'object') {
    data = JSON.stringify(data);
  }
  window.localStorage.setItem(key, data);
}

function removeLocalStorage(key) {
  window.localStorage.removeItem(key);
}

function getSessionStorage(key) {
  let data = window.sessionStorage.getItem(key);
  if (!data) return data;
  if (data.startsWith('{') || data.startsWith('[')) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  } else {
    return data;
  }
}

function setSessionStorage(key, data) {
  if (typeof data === 'object') {
    data = JSON.stringify(data);
  }
  window.sessionStorage.setItem(key, data);
}

function removeSessionStorage(key) {
  window.sessionStorage.removeItem(key);
}

function parseJSON(str) {
  if (!str) return null;
  if (typeof str === 'object') {
    return str;
  }
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

function toFixed(value, fix) {
  if (typeof value !== 'number') return value;
  return parseFloat(value.toFixed(fix || 2));
}

function formatAddress(value = '', width = 10) {
  if (value.length < width * 2) {
    return value;
  }
  if (typeof value.slice === 'function') {
    return `${value.slice(0, width)}...${value.slice(-width)}`;
  } else {
    console.warn('the value is not a srting', value);
    return '';
  }
}

function copy(value) {
  const textArea = document.createElement('textarea');
  textArea.style.position = 'fixed';
  textArea.style.top = '-200px';
  textArea.style.left = '-200px';
  textArea.style.zIndex = -1;
  textArea.style.width = '200px';
  textArea.style.height = '200px';
  textArea.style.background = 'transparent';
  textArea.value = value;
  document.body.appendChild(textArea);
  textArea.select();
  let result = false;
  try {
    result = !!document.execCommand('copy');
  } catch (err) {
    console.error(err);
  }
  document.body.removeChild(textArea);
  return result;
}

function transformSocketNetwork(network) {
  let isSafe = network.startsWith('https://');
  let httpSchema = 'http://';
  let wsSchema = 'ws://';
  if (isSafe) {
    httpSchema = 'https://';
    wsSchema = 'wss://';
  }
  return `${network.replace(httpSchema, wsSchema)}/edge_ws`;
}

/**
 * 获取网络的延迟
 * 如果接口超时或请求不通会返回-1
 * @param {*} servers Array<{url:''}>
 * @returns
 */
function measureLatency(servers) {
  const axios = new Axios({ timeout: 10000 });
  const promises = servers.map(async (item) => {
    const st = Date.now();
    try {
      await axios.request({ method: 'GET', url: item.url });
    } catch (e) {
      return -1;
    }
    const et = Date.now();
    const delay = et - st;
    return delay;
  });
  return Promise.all(promises);
}

export default {
  getQueryString,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
  parseJSON,
  toFixed,
  formatAddress,
  copy,
  transformSocketNetwork,
  measureLatency,
};
