// Ensure process shim is the very first thing that runs
if (typeof window !== 'undefined' && typeof (window as any).process === 'undefined') {
  (window as any).process = { env: {} };
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to. Ensure index.html contains <div id='root'></div>");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);