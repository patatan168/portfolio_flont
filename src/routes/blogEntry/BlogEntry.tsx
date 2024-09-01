import AutorenewIcon from '@mui/icons-material/Autorenew';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { CircularProgress, Divider, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useGetBlogEntryQuery } from '@store/api/PublicApi';
import MDEditor from '@uiw/react-md-editor';
import HeadBlock from 'HeadBlock';
import { useSideContents } from 'public/components/MainContents';
import XComponent from 'public/components/XComponent';
import { createFormatedDate } from 'public/functions/createFormatedDate';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BlogEntry = () => {
  const { setLeftContent } = useSideContents();
  const { pathname } = useLocation();
  const entryPath = pathname.substring(pathname.indexOf('/', 1) + 1);
  const { data, isSuccess } = useGetBlogEntryQuery(entryPath);

  // サイドメニュー
  useEffect(() => {
    if (isSuccess && data !== undefined) {
      setLeftContent(
        <Stack
          sx={{ mx: 1, width: '100%' }}
          direction="column"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Paper sx={{ backgroundColor: 'rgb(255,255,255)' }}>
            <XComponent size="large" tootText={`${data[0].title} ${location.href}`} />
          </Paper>
        </Stack>
      );
    }
  }, [data, isSuccess]);

  return (
    <>
      {isSuccess && data !== undefined ? (
        data.map(({ title, tag, sentence, uuid, edit_time, post_time }) => {
          return (
            <>
              <HeadBlock title={title} description={title} />
              <Paper key={uuid} sx={{ px: 3, pt: 3, pb: 1 }}>
                <Stack
                  sx={{ mx: 2 }}
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing={2}
                >
                  <Typography component="p" variant="subtitle1">
                    {tag}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography sx={{ mb: 1 }} component="h1" variant="h4">
                    {title}
                  </Typography>
                  <Stack sx={{ mx: 1 }} direction="row" spacing={1}>
                    <AutorenewIcon fontSize="small" />
                    <Typography component="p" variant="subtitle2">
                      最終更新日：{createFormatedDate(edit_time)}
                    </Typography>
                  </Stack>
                  <Stack sx={{ mx: 1 }} direction="row" spacing={1}>
                    <BorderColorIcon fontSize="small" />
                    <Typography component="p" variant="subtitle2">
                      投稿日：{createFormatedDate(post_time)}
                    </Typography>
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                  <MDEditor.Markdown source={sentence} />
                  <Stack
                    sx={{ mt: 1, mx: 1 }}
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={2}
                  >
                    <XComponent size="medium" tootText={`${title} ${location.href}`} />
                  </Stack>
                </Stack>
              </Paper>
            </>
          );
        })
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default BlogEntry;
