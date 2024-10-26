import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Form } from './Form.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Form />
  </StrictMode>
);
