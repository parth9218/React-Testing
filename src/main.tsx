import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { InputElements } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InputElements />
  </StrictMode>
);
