import axios from 'axios';
import * as qs from 'querystring';

export function request(
  defaultHeader = {},
  options?: { isEncodedParams?: boolean },
) {
  return (
    url,
    payload,
    method: 'POST' | 'GET' | 'PUT',
    header?: Record<string, any>,
  ) => {
    console.log('method: ', method);
    console.log(
      'payload: ',
      options?.isEncodedParams ? qs.stringify(payload) : payload,
    );
    console.log('header: ', Object.assign(defaultHeader, header || {}));

    if (/GET/g.test(method)) {
      const genUrl = () => {
        const payloadKeys = Object.keys(payload);
        return payloadKeys.length === 0
          ? url
          : payloadKeys.reduce(
              (cum, index, i) =>
                `${cum}${index}=${payload[index]}${
                  i === payloadKeys.length - 1 ? '' : '&'
                }`,
              `${url}?`,
            );
      };

      url = genUrl();
      console.log('URL: ', url);
      return axios({
        url,
        method,
        headers: Object.assign(defaultHeader, header || {}),
        timeout: 140000,
      })
        .then((jsonResponse) => {
          return jsonResponse?.data;
        })
        .catch((exp) => console.log('ERROR: ', exp));
    } else if (method === 'PUT') {
      console.log('URL: ', url);
      return axios({
        url,
        method,
        data: payload,
        headers: Object.assign(defaultHeader, header || {}),
        timeout: 140000,
      })
        .then((jsonResponse) => {
          return jsonResponse?.data;
        })
        .catch((exp) => console.log('ERROR: ', exp));
    } else {
      console.log('URL: ', url);
      return axios({
        url,
        method,
        data: options?.isEncodedParams ? qs.stringify(payload) : payload,
        headers: Object.assign(defaultHeader, header || {}),
        timeout: 140000,
      })
        .then((jsonResponse) => {
          return jsonResponse?.data;
        })
        .catch((exp) => console.log('ERROR: ', exp));
    }
  };
}
