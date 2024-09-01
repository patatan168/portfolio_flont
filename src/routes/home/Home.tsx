import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import HeadBlock from 'HeadBlock';

import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';

import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';

const Home = () => {
  const paperClass = { p: 3, mb: 1 };
  const dividerClass = { mb: 2 };
  return (
    <>
      <HeadBlock title="Home" description="ホーム画面です。" />
      <Paper sx={paperClass}>
        <Typography gutterBottom variant="h4" component="h1">
          Profile
        </Typography>
        <Divider sx={dividerClass} />
        <Typography gutterBottom variant="h5" component="h2">
          Name：パタたん
        </Typography>
        <Typography sx={{ px: 1 }} variant="h6" component="p">
          1995年の生まれのソフトウェアエンジニア。
          <br />
          大学院で無線通信を学び、卒業後ソフトウェアエンジニアとして活躍する。
        </Typography>
      </Paper>
      <Paper sx={paperClass}>
        <Typography gutterBottom variant="h4" component="h1">
          Carrer
        </Typography>
        <Divider sx={dividerClass} />
        <CarrerTimeline />
      </Paper>
    </>
  );
};

const CarrerTimeline = () => {
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot>
            <HomeIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          1995.9.23.
          <br />
          神奈川県で生まれる
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot>
            <SchoolIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          2015.3. <br />
          <Link href="https://www.metro.ed.jp/tamakagakugijutsu-h/">
            東京都立多摩科学技術高等学校
          </Link>
          卒業
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot>
            <SchoolIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          2019.3. <br />
          <Link href="https://www.tcu.ac.jp/">東京都市大学</Link> 知識工学部情報通信工学科卒業
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot>
            <SchoolIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          2021.3. <br />
          <Link href="https://www.tcu.ac.jp/">東京都市大学大学院</Link> 総合理工学研究科情報専攻卒業
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot>
            <WorkIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          2021.4. <br />
          <Link href="https://www.for-a.co.jp/">株式会社 朋栄</Link> 入社
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export default Home;
