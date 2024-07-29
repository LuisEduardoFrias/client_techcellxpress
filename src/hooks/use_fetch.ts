//
'use client'
import { useState, useEffect } from 'react';
import useStore from "str/store";

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type FetchObj = {
  url: string;
  method?: Method;
  body?: BodyInit;
};

export type Result = {
  data: object | null;
  error: object | null;
};

export default function useFetch(baseUrl: string) {
  const session = useStore((state) => state.session)
  const [dataFetch, setFetch] = useState<FetchObj>(null);
  const [data, setData] = useState<Result>({ data: null, error: null });
  const [loading, setLoading] = useState(false);

  function joinURLs(baseUrl: string, url: string): string {
    const baseUrlFinal = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    const urlFinal = url.startsWith('/') ? url.substring(1) : url;

    return baseUrlFinal + urlFinal;
  }

  const _fetch = useCallback(({ url, method = Method.GET, body = null }: FetchObj) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    //   headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    // headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'PUT', 'DELETE');
    headers.append('Authorization', 'Basic ' + session?.token);

    return fetch(joinURLs(baseUrl, url), {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: method === Method.GET ? null : (body ? JSON.stringify(body) : null),
    });
  }, [baseUrl, session]);

  useEffect(() => {
    if (dataFetch) {
      setData({ data: null, error: null });
      setLoading(true);

      //setTimeout(() => {
      _fetch(dataFetch)
        .then((response) => {
          console.log(
            'statustext: ',
            response.statusText,
            'status: ',
            response.status
          );

          if (!response.ok) {
            throw new Error('Error al recuperar el HTML');
          }

          return response.json();
        })
        .then((data) => {
          setData({ data: data, error: null });
        })
        .catch((err) => {
          console.log('fetch: ', err);
          setData({ data: null, error: 'Hubo un problema con la solicitud' });
        })
        .finally(() => {
          setLoading(false);
          setFetch(null);
        });
      //}, 1000);
    }
  }, [dataFetch, _fetch]);

  return [setFetch, data, loading];
}
