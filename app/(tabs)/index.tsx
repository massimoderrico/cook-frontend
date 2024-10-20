import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from './home';
import Config from 'react-native-config';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql', // Your GraphQL endpoint
    cache: new InMemoryCache(),
  });

export default function Index() {
    return (
        <ApolloProvider client={client}>
            <Home />
        </ApolloProvider>
    )
  }

