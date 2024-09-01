import { createTheme, useMediaQuery } from '@mui/material';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { LoginStore, PublicStore } from '@store/Store';
import { motion, MotionConfig } from 'framer-motion';
import { lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminMenu from './routes/AdminMenu';
import MainMenu from './routes/MainMenu';

const Home = lazy(() => import('./routes/home/Home'));
const Blog = lazy(() => import('./routes/blog/Blog'));
const BlogEntry = lazy(() => import('./routes/blogEntry/BlogEntry'));
const Login = lazy(() => import('./routes/login/Login'));
const BlogPost = lazy(() => import('./routes/login/blogPost/BlogPost'));
const Page404 = lazy(() => import('./routes/Page404'));
const Page401 = lazy(() => import('./routes/login/Page401'));
const UserManager = lazy(() => import('./routes/login/user/UserManager'));

/** Transition Types */
type TransProps = {
  children: JSX.Element;
};

/**
 * Transition
 * @param props Child Component
 * @returns
 */
const Transition = ({ children }: TransProps) => {
  return (
    <MotionConfig transition={{ duration: 1 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {children}
      </motion.div>
    </MotionConfig>
  );
};

const ReactRoutes = () => {
  const mode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
          }
        : {
            // palette values for dark mode
            background: {
              paper: 'rgb(2, 4, 9)',
            },
          }),
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Provider store={PublicStore} children={<MainMenu />} />}>
              <Route index element={<Transition children={<Home />} />} />
              <Route path="/blog/" element={<Blog />} />
              <Route path="/blog/*" element={<Transition children={<BlogEntry />} />} />
              <Route path="*" element={<Page404 />} />
            </Route>
            <Route path="/login" element={<Provider store={LoginStore} children={<AdminMenu />} />}>
              <Route index element={<Login />} />
              <Route path="/login/page401" element={<Page401 />} />
              <Route path="/login/blog/post" element={<BlogPost />} />
              <Route path="/login/user" element={<UserManager />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default ReactRoutes;
