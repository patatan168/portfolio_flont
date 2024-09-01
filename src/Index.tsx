import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './Index.css';
import ReactRoutes from './ReactRoutes';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ReactRoutes />
    </HelmetProvider>
  </React.StrictMode>
);
