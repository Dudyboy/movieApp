import React, { Component } from 'react';
import { TouchableWithoutFeedback, Image, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

const MovieItem = (props) => (
    <TouchableWithoutFeedback
        style={styles.rowContainer}
        onPress={() => Actions.moviedetail({id: props.library.id, title: props.library.title})}
    >
        <View style={styles.viewContainer}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w92${props.library.poster_path}` }}
                style={{width: 50, height: 50, borderRadius: 25}}
            />
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>{props.library.title}</Text>
                <Text>{props.library.vote_average} / 10</Text>
            </View>
        </View>
    </TouchableWithoutFeedback>
);

const styles = {
    rowContainer: {
        flex: 1
    },
    viewContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    titleText: {
        fontSize: 17,
        fontWeight: '700'
    }
};

export default MovieItem;