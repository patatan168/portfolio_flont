import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LoginObj } from '@store/api/endpoints/LoginEndpoint';
import { useHasLoginQuery, usePostLoginMutation } from '@store/api/LoginApi';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit } = useForm<LoginObj>();
  const { data, isSuccess } = useHasLoginQuery();
  const [updatePost] = usePostLoginMutation();

  if (data !== undefined && data && isSuccess) {
    return <Navigate replace to="/login/blog/edit" />;
  }

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Stack>
          <form onSubmit={handleSubmit(updatePost)}>
            <TextField
              fullWidth
              sx={{ my: 1 }}
              {...register('id')}
              required
              type="text"
              id="user"
              label="User ID"
            />
            <br />
            <TextField
              fullWidth
              sx={{ my: 1 }}
              {...register('password')}
              required
              type="password"
              id="id"
              label="Password"
            />
            <br />
            <Button variant="contained" type="submit" sx={{ mt: 3 }} endIcon={<SendIcon />}>
              Login
            </Button>
          </form>
        </Stack>
      </Paper>
    </>
  );
};

export default Login;
