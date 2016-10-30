import React from 'react';
import { Platform } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';

//Scenes
import MovieList from './scenes/movie_list';
import MovieDetail from './scenes/movie_detail';

const getSceneStyle = (props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
    if (computedProps.isActive) {
        const top = Platform.OS === 'android' ? 54 : 64;
        style.marginTop = computedProps.hideNavBar ? 0 : top;
        style.marginBottom = computedProps.hideTabBar ? 0 : 50;
    }
    return style;
};

const RouterComponent = () => {
    return(
        <Router getSceneStyle={getSceneStyle}>
            <Scene key="root" hideTabBar={true}>
                <Scene
                    key="movielist"
                    component={MovieList}
                    title="Movie List"
                    initial
                />
                <Scene
                    key="moviedetail"
                    component={MovieDetail}
                    title="Movie Detail"
                    getTitle={(navState) => navState.title}
                />
            </Scene>
        </Router>
    );
};

export default RouterComponent;