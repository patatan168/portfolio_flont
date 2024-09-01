import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

const todo = 'todo/';

const todoUrl = {
  get: todo + 'get',
  post: todo + 'post',
  put: todo + 'put',
  delete: todo + 'delete',
};

export type TodoObj = {
  id: string;
  todo: string;
  time: string;
};

export type TodoDict = TodoObj[];

export const TodoEndpoint = (builder: EndpointBuilder<BaseQueryFn, string, string>) => {
  return {
    getTodos: builder.query<TodoDict, void>({
      query: () => todoUrl.get,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'GetTodos', id })),
              // postTodoがあったときのために特別なタグを用意する。
              { type: 'GetTodos', id: 'LIST' },
            ]
          : // エラーがあった場合でもユーザ追加をしたタイミングで再データ取得をする。
            [{ type: 'GetTodos', id: 'LIST' }],
    }),
    getTodosPager: builder.query<TodoDict, string>({
      query: (time: string) => `${todoUrl.get}/${time}`,
    }),
    postTodo: builder.mutation<TodoObj, Partial<TodoObj>>({
      query(body) {
        return {
          url: todoUrl.post,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'GetTodos', id: 'LIST' }],
    }),
    putTodo: builder.mutation<TodoObj, Partial<TodoObj>>({
      query(body) {
        return {
          url: todoUrl.put,
          method: 'PUT',
          body,
        };
      },
      // getTodosのキャッシュを無効化する(Getの更新)
      invalidatesTags: [{ type: 'GetTodos', id: 'LIST' }],
    }),
    deleteTodo: builder.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        const body = { id };
        return {
          url: todoUrl.delete,
          method: 'DELETE',
          body,
        };
      },
      // getTodosのキャッシュを無効化する(Getの更新)
      invalidatesTags: [{ type: 'GetTodos', id: 'LIST' }],
    }),
  };
};
