import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

const blog = 'blog/';

const blogUrl = {
  get: blog + 'get',
  getEntry: blog + 'get-entry',
  editGet: blog + 'get-edit',
  post: blog + 'post',
  put: blog + 'put',
  delete: blog + 'delete',
};

export type BlogObj = {
  path: string;
  tag: string;
  title: string;
  uuid: string;
  sentence: string;
  edit_time: string;
  post_time: string;
};

export type BlogDict = BlogObj[];

export const BlogEndpoint = (builder: EndpointBuilder<BaseQueryFn, string, string>) => {
  return {
    getBlog: builder.query<BlogDict, void>({
      query: () => blogUrl.get,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ uuid }) => ({ type: 'GetBlog', uuid })),
              // postBlogがあったときのために特別なタグを用意する。
              { type: 'GetBlog', id: 'LIST' },
            ]
          : // エラーがあった場合でもユーザ追加をしたタイミングで再データ取得をする。
            [{ type: 'GetBlog', id: 'LIST' }],
    }),
    getBlogPager: builder.query<BlogDict, string>({
      query: (time: string) => `${blogUrl.get}/${time}`,
    }),
    getEditBlog: builder.query<BlogDict, void>({
      query: () => blogUrl.editGet,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ uuid }) => ({ type: 'GetBlog', uuid })),
              // postBlogがあったときのために特別なタグを用意する。
              { type: 'GetBlog', id: 'LIST' },
            ]
          : // エラーがあった場合でもユーザ追加をしたタイミングで再データ取得をする。
            [{ type: 'GetBlog', id: 'LIST' }],
    }),
    getBlogEntry: builder.query<BlogDict, string>({
      query: (path: string) => `${blogUrl.getEntry}/${path}`,
    }),
    postBlog: builder.mutation<BlogObj, Partial<BlogObj>>({
      query(body) {
        return {
          url: blogUrl.post,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'GetBlog', id: 'LIST' }],
    }),
    putBlog: builder.mutation<BlogObj, Partial<BlogObj>>({
      query(body) {
        return {
          url: blogUrl.put,
          method: 'PUT',
          body,
        };
      },
      // getBlogのキャッシュを無効化する(Getの更新)
      invalidatesTags: [{ type: 'GetBlog', id: 'LIST' }],
    }),
    deleteBlog: builder.mutation<{ success: boolean; uuid: string }, string>({
      query(uuid) {
        const body = { uuid };
        return {
          url: blogUrl.delete,
          method: 'DELETE',
          body,
        };
      },
      // getBlogのキャッシュを無効化する(Getの更新)
      invalidatesTags: [{ type: 'GetBlog', id: 'LIST' }],
    }),
  };
};
