import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Paper, Stack, Typography } from '@mui/material';
import { BlogObj } from '@store/api/endpoints/BlogEndpoints';
import { createFormatedDate } from 'public/functions/createFormatedDate';
import { memo } from 'react';
import { Link } from 'react-router-dom';

const BlogList = memo(function _TodoList({ path, title, tag, uuid, post_time }: BlogObj) {
  return (
    <>
      <Paper key={uuid} sx={{ px: 3, pt: 1.5, pb: 1, mb: 1 }}>
        <Stack direction="row">
          <BorderColorIcon fontSize="small" />
          <Typography component="p" variant="subtitle2">
            投稿日：{createFormatedDate(post_time)}
          </Typography>
        </Stack>
        <Stack>
          <Typography sx={{ mt: 1 }} component="h1" variant="h4">
            <Link to={path}>{title}</Link>
          </Typography>
        </Stack>
        <Stack sx={{ mt: -2 }} direction="row" justifyContent="flex-end" alignItems="center">
          <Typography component="p" variant="subtitle1">
            {tag}
          </Typography>
        </Stack>
      </Paper>
    </>
  );
});

export default BlogList;
