import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

const userTable = 'user_list/';

const userUrl = {
  add: userTable + 'post/add',
  get: userTable + 'get',
  post: userTable + 'post',
  put: userTable + 'put',
  delete: userTable + 'delete',
  hasLogin: userTable + 'get/haslogin',
};

export type LoginObj = {
  user_name: string;
  id: string;
  type: string;
  password: string;
  hasLogin: boolean;
};

export type UserListObj = {
  user_name: string;
  uuid: string;
  type: string;
};

export type UserType = 'admin' | 'blogger';

export type UserListDict = UserListObj[];

export const LoginEndpoint = (builder: EndpointBuilder<BaseQueryFn, string, string>) => {
  return {
    hasLogin: builder.query<LoginObj, void>({
      query: () => userUrl.hasLogin,
      providesTags: () =>
        // ログインをしたタイミングで再データ取得をする。
        [{ type: 'GetHasLogin' }],
    }),
    postLogin: builder.mutation<LoginObj, Partial<LoginObj>>({
      query(body) {
        return {
          url: userUrl.post,
          method: 'POST',
          body,
        };
      },
      // getHasLoginのキャッシュを無効化する(HasLoginの更新)
      invalidatesTags: [{ type: 'GetHasLogin' }],
    }),
    getUserList: builder.query<UserListDict, void>({
      query: () => userUrl.get,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ uuid }) => ({ type: 'GetUserList', uuid })),
              // postがあったときのために特別なタグを用意する。
              { type: 'GetUserList', id: 'LIST' },
            ]
          : // エラーがあった場合でもユーザ追加をしたタイミングで再データ取得をする。
            [{ type: 'GetUserList', id: 'LIST' }],
    }),
    postUser: builder.mutation<LoginObj, Partial<LoginObj>>({
      query(body) {
        return {
          url: userUrl.add,
          method: 'POST',
          body,
        };
      },
      // getHasLoginのキャッシュを無効化する(HasLoginの更新)
      invalidatesTags: [{ type: 'GetUserList' }],
    }),
    deleteUser: builder.mutation<{ success: boolean; uuid: string }, string>({
      query(uuid) {
        const body = { uuid: uuid };
        return {
          url: userUrl.delete,
          method: 'DELETE',
          body,
        };
      },
      // getTodosのキャッシュを無効化する(Getの更新)
      invalidatesTags: [{ type: 'GetUserList', id: 'LIST' }],
    }),
  };
};
