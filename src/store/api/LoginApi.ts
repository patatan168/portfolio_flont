import { BaseApi } from '@store/api/BaseApi';
import { BlogEndpoint } from './endpoints/BlogEndpoints';
import { LoginEndpoint } from './endpoints/LoginEndpoint';

const api = new BaseApi('include', 'login', ['GetHasLogin, GetUserList, GetBlog']);

const LoginApi = api.createApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => {
    return Object.assign(LoginEndpoint(builder), BlogEndpoint(builder));
  },
});

// use + endpointsで設定した名前 + (Query or Mutation)でHooksが作られる
export const {
  useHasLoginQuery,
  usePostLoginMutation,
  useGetUserListQuery,
  usePostUserMutation,
  useDeleteUserMutation,
  useDeleteBlogMutation,
  useLazyGetBlogPagerQuery,
  usePutBlogMutation,
  usePostBlogMutation,
  useGetBlogQuery,
  useGetBlogEntryQuery,
  useGetEditBlogQuery,
} = LoginApi;

export default LoginApi;
