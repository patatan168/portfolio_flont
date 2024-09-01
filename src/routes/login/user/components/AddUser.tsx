import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { LoginObj, UserType } from '@store/api/endpoints/LoginEndpoint';
import { usePostUserMutation } from '@store/api/LoginApi';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const AddUser = () => {
  const [updatePost, { status }] = usePostUserMutation();
  const { setValue: setSubmitVal, handleSubmit, reset, register } = useForm<LoginObj>();
  const [type, setType] = useState<UserType>('blogger');

  useEffect(() => {
    if (status === 'pending') {
      reset();
      setSubmitVal('type', 'blogger');
    }
  }, [status]);

  const handleType = useCallback(
    (event: SelectChangeEvent<UserType>) => {
      setType(event.target.value as UserType);
      setSubmitVal('type', event.target.value);
    },
    [type]
  );

  return (
    <>
      <Paper key={status} sx={{ mb: 2, p: 2 }}>
        <Stack sx={{ mb: 2 }} direction="row" justifyContent="space-between">
          <Typography variant="h6" id="tableTitle" component="div">
            Add User
          </Typography>
          <Button variant="contained" form="add" type="submit">
            Post
          </Button>
        </Stack>
        <form id="add" onSubmit={handleSubmit(updatePost)}>
          <Stack spacing={2}>
            <TextField
              sx={{ my: 1 }}
              required
              fullWidth
              id="user-name"
              label="User Name"
              variant="outlined"
              {...register('user_name')}
            />
            <TextField
              sx={{ my: 1 }}
              required
              fullWidth
              id="user-id"
              label="User Id"
              variant="outlined"
              {...register('id')}
            />
            <TextField
              sx={{ my: 1 }}
              required
              fullWidth
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              {...register('password')}
            />
            <FormControl fullWidth>
              <InputLabel id="type-label">User Type</InputLabel>
              <Select
                required
                labelId="type-label"
                id="type-select"
                value={type}
                label="User Type"
                onChange={handleType}
              >
                <MenuItem value={'admin'}>Admin</MenuItem>
                <MenuItem value={'blogger'}>Blogger</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </form>
      </Paper>
    </>
  );
};

export default AddUser;
