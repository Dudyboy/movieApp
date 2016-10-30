import React, { Component } from 'react';
import { AsyncStorage, NetInfo } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import Router from './Router';
import reducers from './reducers/reducer_index';
import Thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist'

const logger = createLogger();

const middleware = [Thunk, logger];
const store = compose(
    autoRehydrate(), applyMiddleware(...middleware)
)(createStore)(reducers);

persistStore(store, {storage: AsyncStorage});

global.connected = false;

class movieApp extends Component {

    componentWillMount() {
        NetInfo.isConnected.addEventListener('change', this.handleConnectivityChange.bind(this));
        NetInfo.isConnected.fetch().done((data) => {});
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener(
            'change',
            this.handleConnectivityChange
        );
    }

    handleConnectivityChange(change) {
        connected = change;
    }

    render() {
        return(
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default movieApp;