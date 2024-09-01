import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material/';
import { MainTitle } from 'HeadBlock';
import MainContents from 'public/components/MainContents';
import { useToggle } from 'public/functions/useToggle';
import { memo } from 'react';

const MainMenu = () => {
  const [open, toggle] = useToggle(false);

  return (
    <>
      <MenuList open={open} toggle={toggle} />
      <ButtonAppBar toggle={toggle} />
      <MainContents />
    </>
  );
};

/** MenuList Types */
type MenuListProps = {
  open: boolean;
  toggle: () => void;
};

/** メニューリスト */
const MenuList = memo(function _MenuList({ open, toggle }: MenuListProps) {
  const CloseList = () => {
    return (
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={toggle}>
            <CloseIcon sx={{ ml: 1 }} />
            <Typography variant="subtitle1" component="div" sx={{ pl: 1 }}>
              Close
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
    );
  };

  const HomeList = () => {
    return (
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/">
            <HomeIcon />
            <ListItemText
              primary="HOME"
              sx={{ pl: 1 }}
              primaryTypographyProps={{
                fontSize: 22,
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    );
  };

  const BlogList = () => {
    return (
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/blog">
            <MenuBookIcon />
            <ListItemText
              primary="Blog"
              sx={{ pl: 1 }}
              primaryTypographyProps={{
                fontSize: 22,
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    );
  };

  return (
    <Drawer open={open} anchor="left" onClose={toggle}>
      <Box sx={{ width: 280 }} role="presentation">
        <CloseList />
        <Divider />
        <HomeList />
        <BlogList />
      </Box>
    </Drawer>
  );
});

/** AppBar Types */
type AppBarProps = {
  toggle: () => void;
};

/** ボタン付きの上部メニュー */
const ButtonAppBar = memo(function _ButtonAppBar({ toggle }: AppBarProps) {
  return (
    <AppBar sx={{ backgroundColor: 'rgba(0,0,0,0.85)' }} position="fixed">
      <Toolbar>
        <IconButton onClick={toggle} size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
          <Typography variant="subtitle1" component="div" sx={{ pl: 1, flexGrow: 1 }}>
            Menu
          </Typography>
        </IconButton>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontSize: '1.6rem',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            pr: 1,
            flexGrow: 1,
          }}
        >
          {MainTitle}
        </Typography>
        <Button size="large" color="inherit" href="/login">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
});

export default MainMenu;
