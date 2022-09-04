import { NPMResponse, Todo } from '../types';
import { ApiResponse, ApiStatusType, HttpMethod } from './apiUtils';

const createFetchOptions = <Body, AdditionalHeaders>(
  method: HttpMethod,
  body?: Body,
  additionalHeaders?: AdditionalHeaders
) => {
  const setContentType =
    body instanceof FormData ? null : { 'Content-Type': 'application/json' };

  const headers: RequestInit['headers'] = {
    Accepts: 'application/json',
    ...setContentType,
    ...(additionalHeaders || null),
  };

  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  if (body) {
    fetchOptions.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  return fetchOptions;
};

function api<ResponseData, Body = void, AdditionalHeaders = void>() {
  return <Params = void>(
      method: HttpMethod,
      urlFn: ((params: Params) => string) | (() => string),
      transform?: (json: unknown) => ResponseData,
      additionalHeaders?: AdditionalHeaders
    ) =>
    async (params: Params, body: Body): Promise<ApiResponse<ResponseData>> => {
      const url = urlFn(params);
      const resp = await fetch(
        url,
        createFetchOptions(method, body, additionalHeaders)
      );
      try {
        if (resp.status >= 400) {
          const errorJson = await resp.json();
          throw new Error(errorJson.message);
        }

        let responseData = await resp.json().catch(() => undefined);

        const data: ResponseData = transform
          ? transform(responseData)
          : responseData;

        return {
          status: resp.status,
          type: ApiStatusType.Success,
          data,
        };
      } catch (err: unknown) {
        return {
          status: resp.status,
          type: ApiStatusType.Failure,
          error: (err as Error).message,
        };
      }
    };
}

function HtmlApi<Body = void, AdditionalHeaders = void>() {
  return <Params = void>(
      method: HttpMethod,
      urlFn: ((params: Params) => string) | (() => string),
      additionalHeaders?: AdditionalHeaders
    ) =>
    async (params: Params, body: Body): Promise<ApiResponse<string>> => {
      const url = urlFn(params);
      const resp = await fetch(
        url,
        createFetchOptions(method, body, additionalHeaders)
      );

      try {
        if (resp.status >= 400) {
          throw new Error('Bad Request');
        }

        const response = await resp.text();

        if (!response) {
          throw new Error('Response text is empty');
        }

        return {
          status: resp.status,
          type: ApiStatusType.Success,
          data: response,
        };
      } catch (err: unknown) {
        return {
          status: resp.status,
          type: ApiStatusType.Failure,
          error: (err as Error).message,
        };
      }
    };
}

const URLS = {
  GET_TODOS: () => 'https://jsonplaceholder.typicode.com/todos',
  GET_MODULES: ({ query }: { query: string }) =>
    `https://thingproxy.freeboard.io/fetch/https://registry.npmjs.org/-/v1/search?text=${query}`,
  GET_GIFS: ({ query }: { query: string }) =>
    `https://thingproxy.freeboard.io/fetch/https://api.giphy.com/v1/gifs/search?api_key=SDEsWMHoj4DO7LFMxWFHlVJVkElcDm8h&q=${query}`,
  GET_ANIME: ({ query }: { query: string }) =>
    `https://jikan1.p.rapidapi.com/search/anime?q=${encodeURIComponent(query)}`,
};

export const getTodos = api<Todo[]>()(HttpMethod.Get, URLS.GET_TODOS);

export const getModules = api<NPMResponse>()(HttpMethod.Get, URLS.GET_MODULES);

export const getGifs = api<any>()(HttpMethod.Get, URLS.GET_GIFS);

export const getAnime = api<any>()(HttpMethod.Get, URLS.GET_ANIME);
