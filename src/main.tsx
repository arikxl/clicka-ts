import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { StrictMode } from 'react'

import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'


const client = new QueryClient()


createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <AuthProvider>
      <BrowserRouter>
        {/* // <StrictMode> */}
        <App />
        {/* // </StrictMode>, */}
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
)
