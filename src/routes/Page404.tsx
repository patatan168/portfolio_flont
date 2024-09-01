import HomeIcon from '@mui/icons-material/Home';
import { Button, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import HeadBlock from 'HeadBlock';

const Page404 = () => {
  const paperClass = { p: 3, mb: 1 };
  const dividerClass = { mb: 2 };
  return (
    <>
      <HeadBlock title="Not Found" description="お探しのページは見つかりません。" />
      <Paper sx={paperClass}>
        <Typography gutterBottom variant="h4" component="h1">
          お探しのページは見つかりません
        </Typography>
        <Divider sx={dividerClass} />
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <Button
            sx={{ flexGrow: 1 }}
            href="/"
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
          >
            ホームに戻る
          </Button>
        </Stack>
      </Paper>
    </>
  );
};

export default Page404;
