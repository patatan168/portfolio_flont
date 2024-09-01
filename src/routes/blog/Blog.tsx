import { CircularProgress, Stack } from '@mui/material';
import { BlogDict, BlogObj } from '@store/api/endpoints/BlogEndpoints';
import { useGetBlogQuery, useLazyGetBlogPagerQuery } from '@store/api/PublicApi';
import HeadBlock from 'HeadBlock';
import { useDictionary } from 'public/functions/useDictionary';
import { useToggle } from 'public/functions/useToggle';
import { memo, useEffect, useRef, useState } from 'react';
import BlogList from './components/BlogList';

/** Main */
const Todo = () => {
  const { data, isSuccess } = useGetBlogQuery();
  // 追加データが欲しいか
  const [hasMore, setHasMore] = useToggle(true);
  // データ末尾の最終時間
  const [lastTime, setLastTime] = useState<string>();
  /** オブザーバー */
  const observerTarget = useRef(null);
  // 追加データ用のトリガー付きクエリ
  const [trigger, result] = useLazyGetBlogPagerQuery();
  const [arrayData, setQueueData, setStackData] = useDictionary<BlogObj>();

  // 最初の10件を取得したらLastTimeとArrayDataを初期化
  useEffect(() => {
    if (isSuccess && data.length !== 0) {
      const initTime = data.at(-1)?.post_time;
      if (arrayData.length === 0) setLastTime(initTime);
      setStackData(data);
    }
  }, [isSuccess, data]);
  // LastTimeが変動すればデータをセットしに行く
  useEffect(() => {
    if (lastTime !== undefined && hasMore) trigger(lastTime);
  }, [lastTime, hasMore]);
  // Lazyスクロール
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && result.isSuccess) {
          // 末尾の日付データを取得
          const todoLast = result.data.at(-1)?.post_time;
          setQueueData(result.data);
          if (todoLast !== undefined) {
            // LastTime更新
            setLastTime(todoLast);
          } else {
            // データの末尾なので、データ追加をやめる
            setHasMore(false);
          }
        }
      },
      { threshold: 0.2 }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, result.data, result.isSuccess, hasMore]);

  return (
    <>
      <HeadBlock title="Blog" description="Blogの記事の一覧です。" />
      <Stack>
        <DataBody data={arrayData} />
        {isSuccess && hasMore && (
          <div ref={observerTarget}>
            <CircularProgress />
          </div>
        )}
      </Stack>
    </>
  );
};

type DataBodyProps = {
  data: BlogDict;
};

const DataBody = memo(function _DataBody({ data }: DataBodyProps) {
  return (
    <>
      {data !== undefined ? (
        data.map((data) => <BlogList key={data.uuid} {...data} />)
      ) : (
        <CircularProgress />
      )}
    </>
  );
});

export default Todo;
