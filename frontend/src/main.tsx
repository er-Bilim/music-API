import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './shared/styles/index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';

// const googleClientID = import.meta.env.GOOGLE_CLIENT_ID;

const GOOGLE_CLIENT_ID="500463385603-paa9mlqihkg9spkl8mcpt93pb00kavun.apps.googleusercontent.com"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);