// @flow

const CLIENT_ID = 'Q5EBLBEVOFI0BETNIWXPZATZWTQJ2KDBGEKXMTOF3XFLZDQ0';
const CLIENT_SECRET = '4ICZPHHXFVL3KV1HR22IFVJVDFQRMVS0NWL4JYPH33YXRQUT';

type WrappedResponse<Value> = {
  response: Value
}

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

export type JSONParameterType = { [string]: string | number }
const computeUrlQuery = function computeUrlQuery(
  urlString: string,
  params: JSONParameterType = {},
): URL {
  const urlQuery = new URL(urlString);
  // $FlowFixMe
  const urlSearchParams = new URLSearchParams({...params, ...AUTHORIZATION_PARAMS});
  urlQuery.search = urlSearchParams.toString();
  return urlQuery;
};

function strictJsonTyping<Value>(value: any): WrappedResponse<Value> {
  return value;
}

function confirmStatus(response: Response): Promise<any> {
  // if it was successful, then get the json from the response
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }
  return Promise.reject(new Error(response.statusText));
}


function retrieveJsonData<Value>(promise: Promise<Response>): Promise<Value> {
  return promise
    .then(confirmStatus)
    .then(strictJsonTyping)
    .then(({response}) => response);
}


export { computeUrlQuery, retrieveJsonData };
