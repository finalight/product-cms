import { ApolloLink, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './index.css'

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : null,
    },
  }
})

const httpLink = new HttpLink({ uri: `${process.env.GRAPHQL_URL}` })
const link: ApolloLink = authLink.concat(httpLink)

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <RedwoodApolloProvider graphQLClientConfig={{ link }}>
        <Routes />
      </RedwoodApolloProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
