import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    ActivityIndicator,
    Dimensions,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { getDetailMovie } from '../actions/actions_index';

let {height, width} = Dimensions.get('window');

class MovieDetail extends Component {
    componentDidMount() {
        this.props.getDetailMovie(this.props.id);
    }

    render() {
        const { bottomTextContainer, textContainer, titleText, descriptionText } = styles;

        if(!this.props.activeMovies[`${this.props.id}`] && !connected) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>No connected and not stored</Text>
                </View>
            );
        }

        if(!this.props.activeMovies[`${this.props.id}`] || this.props.spinner) {
            return (
                <ActivityIndicator
                    animating={true}
                    size="large"
                    color='#000'
                    style={{flex: 1, justifyContent: 'center'}}
                />
            );
        }

        const { backdrop_path, release_date, vote_average, vote_count, overview } = this.props.activeMovies[`${this.props.id}`];

        return (
            <ScrollView>
                <Image
                    source={{uri: `https://image.tmdb.org/t/p/w780${backdrop_path}`}}
                    style={{ flex: 1, maxHeight: height/2, height: height/2 }}
                    resizeMode="cover"
                />
                <View style={bottomTextContainer}>
                    <View style={textContainer}>
                        <Text style={titleText}>Release date: <Text style={descriptionText}>{release_date}</Text></Text>
                    </View>
                    <View style={textContainer}>
                        <Text style={titleText}>Rating: <Text style={descriptionText}>{vote_average}&nbsp;({vote_count}x)</Text></Text>
                    </View>
                    <View style={textContainer}>
                        <Text>{overview}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    bottomTextContainer: {
        flex: 1
    },
    textContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    titleText: {
        fontSize: 16,
        fontWeight: '700'
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: '400'
    }
});

const mapStateToProps = state => {
    return {
        activeMovies: state.activeMovies,
        spinner: state.spinner.spinner
    }
};

export default connect(mapStateToProps, { getDetailMovie })(MovieDetail);