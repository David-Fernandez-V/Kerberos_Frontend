import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ChakraProvider} from "@chakra-ui/react"
import {RouterProvider} from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools} from "@tanstack/react-query-devtools"

//import './index.css'

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import router from './pages'
import theme from './theme'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
        <ReactQueryDevtools/>
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>,
)
