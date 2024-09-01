import {
  Api,
  BaseQueryFn,
  coreModuleName,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  reactHooksModuleName,
} from '@reduxjs/toolkit/query/react';

const apiUrl = import.meta.env.VITE_API_URI;

/** Set HTTP Header */
const baseHeaders = (headers: Headers) => {
  headers.set('Content-Type', 'application/json');
  headers.set('Access-Control-Request-Headers', 'origin, x-requested-with');
  headers.set('Access-Control-Allow-Origin', `${apiUrl}, http://localhost:4000`);
  return headers;
};

export class BaseApi {
  public createApi: Api<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
    NonNullable<unknown>,
    string,
    string,
    typeof coreModuleName | typeof reactHooksModuleName
  >;
  constructor(
    private credentials: RequestCredentials,
    private reducerPath: string,
    private tagTypes: Array<string>
  ) {
    this.createApi = createApi({
      baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
        mode: 'cors',
        credentials: this.credentials,
        prepareHeaders: baseHeaders,
      }),
      endpoints: () => ({}),
      reducerPath: this.reducerPath,
      tagTypes: this.tagTypes,
    });
  }
}
