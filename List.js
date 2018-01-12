/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component,PropTypes } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
    Button,
} from 'react-native';

import Detail from './Detail'

fetch('http://192.168.1.187/library/list?page=1&query=', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}).then((response) => {//1
    window.response = JSON.parse(response._bodyInit).data
    console.log(response);
}).catch((err) => {//2
    console.error(err);
});

export default class List extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(window.response["list"])
        };
    }
    /*static propTypes = {
        title: PropTypes.string.isRequired,
        onForward: PropTypes.func.isRequired,
        onBack: PropTypes.func.isRequired,
    }*/
    detail(test){

    }
    render() {
        return (
            <View style={{flex: 1, paddingTop: 20}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <View style={styles.container}>
                            <Text style={styles.name} onPress={() => this.props.onBack}>{rowData.name}</Text>
                        </View>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    name: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
