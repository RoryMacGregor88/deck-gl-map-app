import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapProvider } from './hooks/map-context.js';
import App from './App';
import './index.css';
import { worker } from './mocks/browser';

/** Mock server used to mimic the real backend that the dashboard uses in real life */
worker.start();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MapProvider>
      <App />
    </MapProvider>
  </React.StrictMode>
);
