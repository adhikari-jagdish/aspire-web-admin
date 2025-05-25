import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { AuthCustomHook } from './auth/controller/auth_hook.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthCustomHook>
      <BrowserRouter>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <App />
        </MantineProvider>

      </BrowserRouter>
    </AuthCustomHook>

  </StrictMode>
)
