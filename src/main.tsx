import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

/**
 * El punto de entrada de la aplicación.
 * El componente StrictMode ayuda a identificar problemas potenciales durante el desarrollo.
 */

const container = document.getElementById('root');

if (!container) {
  throw new Error(
    "No se pudo encontrar el elemento raíz. Asegúrate de que index.html tenga un <div id='root'></div>"
  );
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
