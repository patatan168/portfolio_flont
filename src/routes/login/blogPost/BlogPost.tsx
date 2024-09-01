import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { BlogObj } from '@store/api/endpoints/BlogEndpoints';
import { usePostBlogMutation } from '@store/api/LoginApi';
import '@uiw/react-markdown-preview/markdown.css';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import { memo, useCallback, useEffect, useState } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';

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
          required
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

const BlogPost = () => {
  const [value, setValue] = useState<string | undefined>();
  const { setValue: setSubmitVal, handleSubmit, register, reset } = useForm<BlogObj>();
  const [updatePost, { status }] = usePostBlogMutation();
  const setSentenceSubmit = useCallback(
    (val: string | undefined) => {
      setValue(val);
      if (val !== undefined) setSubmitVal('sentence', val);
    },
    [value]
  );

  useEffect(() => {
    if (status === 'pending') {
      reset();
      setValue('');
      alert('投稿が完了しました');
    }
  }, [status]);

  return (
    <>
      <Paper key={status} sx={{ p: 2, mb: 1 }}>
        <Grid2 justifyContent="end" container>
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

export default BlogPost;
