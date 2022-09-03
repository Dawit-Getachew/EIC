import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {ApolloLink} from 'apollo-link';
import {WebSocketLink} from 'apollo-link-ws';
import {split} from 'apollo-link';
import {getMainDefinition} from 'apollo-utilities';
import endPoints from 'src/constants/endPoints'

// @ts-ignore
const wsLink = new WebSocketLink({
    uri: endPoints.websocketURL,
    options: {
        reconnect: true
    }
});

const httpLink = new HttpLink({
    uri: endPoints.baseURL
});

const link = split(
    // split based on operation type
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: ApolloLink.from([
        onError(({graphQLErrors, networkError}) => {
            if (graphQLErrors)
                graphQLErrors.forEach(({message, locations, path}) =>
                    console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
            if (networkError) console.error(`[Network error]: ${networkError}`);
        }),
        link
    ]),
    cache: new InMemoryCache()
});

export default client;