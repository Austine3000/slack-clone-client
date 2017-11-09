import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { ApolloClient , createNetworkInterface } from 'react-apollo'; 

import Routes from './routes';

const networkInterface = createNetworkInterface ({
    uri: 'http://localhost:8081',
});

const client = new ApolloClient ({
    networkInterface: networkInterface
})

const App = (
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>        
);

ReactDOM.render(App , document.getElementById('root'));
registerServiceWorker();
