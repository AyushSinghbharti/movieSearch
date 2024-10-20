import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import store from './store';
import Navigation from './Navigation';

const queryClient = new QueryClient();

export default function App() {
    return (  
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Navigation />
            </QueryClientProvider>
        </Provider>
    );
}
