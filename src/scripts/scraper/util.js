// @flow

const CLIENT_ID = 'Q5EBLBEVOFI0BETNIWXPZATZWTQJ2KDBGEKXMTOF3XFLZDQ0';
const CLIENT_SECRET = '4ICZPHHXFVL3KV1HR22IFVJVDFQRMVS0NWL4JYPH33YXRQUT';

const dateToYMD = function dateToYMD(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedMonth = month <= 9 ? `0${month}` : month;
  const formattedDay = day <= 9 ? `0${day}` : day;
  return `${year}${formattedMonth}${formattedDay}`;
};

const AUTHORIZATION_PARAMS = {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  v: dateToYMD(new Date()),
};


const computeUrlQuery = function computeUrlQuery(
  urlString: string,
  params: { [string]: string | number } = {},
): URL {
  const urlQuery = new URL(urlString);
  // $FlowFixMe
  const urlSearchParams = new URLSearchParams({...params, ...AUTHORIZATION_PARAMS});
  urlQuery.search = urlSearchParams.toString();
  return urlQuery;
};

const confirmStatus = function confirmStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
};


const retrieveJsonData = function retrieveJsonData(promise: Promise<any>): Promise<any> {
  return promise
    .then(confirmStatus)
    .then(response => response.json())
    .then(({response}) => response);
};


export { computeUrlQuery, retrieveJsonData };
