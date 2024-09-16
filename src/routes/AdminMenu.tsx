import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MenuIcon from '@mui/icons-material/Menu';
import NotesIcon from '@mui/icons-material/Notes';
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
import { useHasLoginQuery } from '@store/api/LoginApi';
import MainContents from 'public/components/MainContents';
import { useToggle } from 'public/functions/useToggle';
import { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AdminMenu = () => {
  const [open, toggle] = useToggle(false);
  const isLoginPath = useLocation().pathname === '/login';
  const isPage401 = useLocation().pathname === '/login/page401';
  const { data, isSuccess } = useHasLoginQuery();

  // 認証に失敗したら失敗画面を表示
  useEffect(() => {
    if (data === undefined) return;
    if (!data && !isLoginPath && !isPage401) window.location.pathname = '/login/page401';
  }, [isSuccess, isLoginPath, isPage401]);

  return (
    <>
      <MenuList {...{ open, toggle }} />
      <ButtonAppBar {...{ toggle, isLoginPath }} />
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

  const BlogEditList = () => {
    return (
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/login/blog/edit">
            <EditNoteIcon />
            <ListItemText
              primary="Blog Edit"
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

  const BlogPostList = () => {
    return (
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/login/blog/post">
            <NotesIcon />
            <ListItemText
              primary="Blog Post"
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

  const UserManagerList = () => {
    return (
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/login/user">
            <AccountCircleIcon />
            <ListItemText
              primary="User Manager"
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
        <BlogPostList />
        <BlogEditList />
        <Divider />
        <UserManagerList />
      </Box>
    </Drawer>
  );
});

/** AppBar Types */
type AppBarProps = {
  isLoginPath: boolean;
  toggle: () => void;
};

/** ボタン付きの上部メニュー */
const ButtonAppBar = memo(function _ButtonAppBar({ isLoginPath, toggle }: AppBarProps) {
  return (
    <>
      <AppBar sx={{ backgroundColor: 'rgba(255,150,0,0.85)' }} position="fixed">
        <Toolbar>
          {!isLoginPath && (
            <IconButton
              onClick={toggle}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
              <Typography variant="subtitle1" component="div" sx={{ pl: 1, flexGrow: 1 }}>
                Menu
              </Typography>
            </IconButton>
          )}
          <Typography variant="h4" align="center" sx={{ userSelect: 'none', pr: 1, flexGrow: 1 }}>
            Admin Page
          </Typography>
          <Button color="inherit" href="/">
            Home
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
});

export default AdminMenu;
