import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './lib/context/AuthContext.jsx'
import { ModalContextProvider } from './lib/context/ModalContext.jsx'
import { HelmetProvider } from 'react-helmet-async'
import '@fontsource/leckerli-one';
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <ModalContextProvider>
        <HelmetProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </HelmetProvider>
      </ModalContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
