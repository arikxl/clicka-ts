// import { StrictMode } from 'react'
import App from './App.tsx'


import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()


createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
  <BrowserRouter>
    {/* // <StrictMode> */}
    <App />
    {/* // </StrictMode>, */}
  </BrowserRouter>
  </QueryClientProvider>
)
