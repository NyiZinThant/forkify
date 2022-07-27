import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchUrl = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([timeout(TIMEOUT_SEC), fetchUrl]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${data.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
/*
export const getJSON = async function (url) {
  try {
    const fetchUrl = fetch(url);
    const res = await Promise.race([timeout(TIMEOUT_SEC), fetchUrl]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${data.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const sendJSON = async function (url, uploadData) {
  try {
    const fetchUrl = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([timeout(TIMEOUT_SEC), fetchUrl]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${data.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};
*/
