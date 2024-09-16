import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid2,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { BlogObj } from '@store/api/endpoints/BlogEndpoints';
import { useGetBlogEntryQuery, usePutBlogMutation } from '@store/api/LoginApi';
import '@uiw/react-markdown-preview/markdown.css';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import { memo, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

interface formObj {
  title: string;
  label: string;
  blogKey: keyof BlogObj;
}

const formDict: Array<formObj> = [
  { title: 'Title', label: 'Title', blogKey: 'title' },
  { title: 'Path', label: 'Path', blogKey: 'path' },
  { title: 'Tag', label: 'Tag', blogKey: 'tag' },
];

interface BlogFormProps extends formObj {
  register: UseFormRegister<BlogObj>;
}

const BlogForm = memo(function _BlogForm({ title, label, blogKey, register }: BlogFormProps) {
  return (
    <>
      <Grid2 size={{ xs: 3, md: 2 }}>
        <Typography variant="h5">{title}</Typography>
      </Grid2>
      <Grid2 size={{ xs: 13, md: 14 }}>
        <TextField
          sx={{ my: 1 }}
          required={blogKey === 'tag'}
          disabled={blogKey !== 'tag'}
          fullWidth
          id="outlined-basic"
          label={label}
          variant="outlined"
          {...register(blogKey)}
        />
      </Grid2>
    </>
  );
});

const BlogPut = () => {
  const { pathname } = useLocation();
  const editPath = pathname.substring(pathname.indexOf('edit/', 1) + 5);
  const { data, isSuccess } = useGetBlogEntryQuery(editPath);
  const [value, setValue] = useState<string | undefined>();
  const { setValue: setSubmitVal, handleSubmit, register } = useForm<BlogObj>();
  const [updatePost, { status }] = usePutBlogMutation();

  const setSentenceSubmit = useCallback(
    (val: string | undefined) => {
      setValue(val);
      if (val !== undefined) setSubmitVal('sentence', val);
    },
    [value]
  );

  useEffect(() => {
    if (status === 'pending') {
      alert('投稿が完了しました');
    }
  }, [status]);

  useLayoutEffect(() => {
    if (isSuccess && data !== undefined) {
      setValue(data[0].sentence);
      setSubmitVal('title', data[0].title);
      setSubmitVal('path', data[0].path);
      setSubmitVal('tag', data[0].tag);
      setSubmitVal('uuid', data[0].uuid);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isSuccess && data !== undefined) {
      setValue(data[0].sentence);
    }
  }, [data, isSuccess]);

  return (
    <>
      {isSuccess && data !== undefined ? (
        <>
          <Paper key={status} sx={{ p: 2, mb: 1 }}>
            <Grid2 justifyContent="space-between" container>
              <Button sx={{ mb: 3 }} href="/login/blog/edit/" variant="contained">
                一覧へ戻る
              </Button>
              <Button sx={{ mb: 3 }} variant="contained" form="post" type="submit">
                Post
              </Button>
            </Grid2>
            <form id="post" onSubmit={handleSubmit(updatePost)}>
              <Grid2 container alignItems="center" columns={16}>
                {formDict.map(({ title, label, blogKey }) => (
                  <BlogForm key={blogKey} {...{ title, label, blogKey, register }} />
                ))}
                <Grid2 size={{ xs: 16 }}>
                  <Typography variant="h5">Sentence</Typography>
                </Grid2>
                <Grid2 size={{ xs: 16 }} sx={{ mt: 0.5 }}>
                  <MDEditor
                    preview="edit"
                    value={value}
                    onChange={setSentenceSubmit}
                    textareaProps={{
                      placeholder: 'Please enter Markdown text',
                    }}
                  />
                </Grid2>
              </Grid2>
            </form>
          </Paper>
          <Preview preview={value} />
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

type PreviewProps = {
  preview: string | undefined;
};

const Preview = memo(function _Preview({ preview }: PreviewProps) {
  return (
    <Paper>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h4">Preview</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <Box component="div" height="200px" sx={{ overflow: 'auto' }}>
            <MDEditor.Markdown source={preview} />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
});

export default BlogPut;
