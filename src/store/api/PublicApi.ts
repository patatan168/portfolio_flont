import { BaseApi } from '@store/api/BaseApi';
import { BlogEndpoint } from './endpoints/BlogEndpoints';

const api = new BaseApi('omit', 'public', ['GetTodos']);

const PublicApi = api.createApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => BlogEndpoint(builder),
});

// use + endpointsで設定した名前 + (Query or Mutation)でHooksが作られる
export const { useLazyGetBlogPagerQuery, useGetBlogQuery, useGetBlogEntryQuery } = PublicApi;

export default PublicApi;
