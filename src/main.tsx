import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import './index.css';

// Global Google Maps Authentication & Script Error Interceptor
(window as any).gm_authFailure = () => {
  window.dispatchEvent(
    new CustomEvent('gmp-auth-failed', { detail: { error: 'InvalidKeyMapError' } })
  );
};

const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  const msg = args.map((a) => String(a)).join(' ');
  if (
    msg.includes('Google Maps JavaScript API error') ||
    msg.includes('InvalidKeyMapError') ||
    msg.includes('OverQuotaMapError') ||
    msg.includes('QuotaExceededError')
  ) {
    window.dispatchEvent(new CustomEvent('gmp-auth-failed', { detail: { error: msg } }));
  }
  originalConsoleError.apply(console, args);
};

window.addEventListener('error', (event) => {
  if (
    event.message?.includes('Google Maps') ||
    event.message?.includes('InvalidKeyMapError') ||
    event.filename?.includes('maps.googleapis.com') ||
    event.filename?.includes('maps.gstatic.com')
  ) {
    window.dispatchEvent(new CustomEvent('gmp-auth-failed', { detail: { error: event.message } }));
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
