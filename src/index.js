import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
   uri: 'http://localhost:5000/graphql',
   cache: new InMemoryCache(),
});

const rootNode = document.getElementById("root");
const root = ReactDOM.createRoot(rootNode);
root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
