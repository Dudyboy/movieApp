import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    RefreshControl,
    ActivityIndicator,
    Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import MovieItem from '../components/LibraryItem';
import { getMovies, searchMovies } from '../actions/actions_index';
import debounce from 'lodash/debounce';

class MovieList extends Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.movies),
        };
    }

    componentDidMount() {
        this.props.getMovies();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.movies) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.movies)
            });
        }
    }

    renderRow(library) {
        return <MovieItem library={library} />
    }

    onRefresh() {
        this.props.getMovies();
    }

    moviesList() {
        // if(!this.props.movies || this.props.spinner) {
        //     return (
        //         <ActivityIndicator
        //             animating={true}
        //             size="large"
        //             color='#000'
        //             style={{flex: 1, justifyContent: 'center'}}
        //         />
        //     );
        // }

        return (
            <ListView
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.spinnerList}
                        onRefresh={this.onRefresh.bind(this)}
                    />
                }
                style={{flex: 1}}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                enableEmptySections={true}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
            />
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <SearchBar
                    lightTheme
                    onChangeText={debounce(text => (this.props.searchMovies(text)), 700)}
                    placeholder='Type Here...'
                    containerStyle={{borderBottomWidth: 0, borderColor: 'transparent' }}
                />
                {this.moviesList()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E'
    }
});

const mapStateToProps = state => {
    return {
        movies: state.movies.movies,
        spinnerList: state.movies.spinnerList
    }
};

export default connect(mapStateToProps, { getMovies, searchMovies })(MovieList);