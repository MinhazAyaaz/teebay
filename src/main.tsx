import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import './index.css'
import { Notifications } from '@mantine/notifications';
import App from './App.tsx'
import { MantineProvider } from '@mantine/core'
import { AuthProvider } from './context/AuthProvider.tsx'
import { ApolloProvider } from '@apollo/client/react'
import { apolloClient } from './graphql/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <Notifications position='top-right'/>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ApolloProvider>
    </MantineProvider>
  </StrictMode>,
)
