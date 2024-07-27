//
export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type Result = {
  data: object | null;
  error: object | null;
};

export type DataFetch = {
  url: string,
  method?: Method,
  body?: object | Array<object>,
  token?: string
};

export default async function Fetch(datafetch: DataFetch) {
  return await _fetch(datafetch)
    .then((response) => {
      if (!response.ok) {
        console.error('Error retrieving data.');
        return { error: 'Error retrieving data.', data: null };
      }

      const contentType = response.headers.get('content-type');

      return response.json();
      /* if (contentType && contentType.includes('application/json')) {
         return response.json();
       } else {
         return response.text();
       }
       */
    })
    .then((data) => data)
    .catch((error) => {
      console.log('helper fetch: ', error);
      return { error, data: null }
    })
}

async function _fetch(datafetch: DataFetch) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', process.env.BASE_API_TECHCELLXPRESS);
  // headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // headers.append('Access-Control-Allow-Credentials', 'true');
  if (datafetch.token) {
    headers.append('Authorization', `Basic ${datafetch.token}`);
  }

  return await fetch(datafetch.url, {
    method: datafetch.method ?? Method.GET,
    mode: 'cors',
    redirect: 'follow',
    //cache: 'no-cache',
    credentials: 'include',
    headers: headers,
    referrerPolicy: 'no-referrer',
    body: (datafetch.body ? JSON.stringify(datafetch.body) : null),
  });
}


