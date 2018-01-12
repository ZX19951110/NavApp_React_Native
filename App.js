import React from 'react';
import { ListView, Text, View, StyleSheet, Dimensions, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
class Detail extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Detail of ${ navigation.state.params.data.name }`,
    });
    render() {
        const { params } = this.props.navigation.state;
        return (
            <View >
                <Text style={styles.detail}>ID: {params.data.id}</Text>
                <Text style={styles.detail}>ia_id: {params.data.ia_id}</Text>
                <Text style={styles.detail}>latitude: {params.data.latitude}</Text>
                <Text style={styles.detail}>longitude: {params.data.longitude}</Text>
                <Text style={styles.detail}>name: {params.data.name}</Text>
                <Text style={styles.detail}>telephone: {params.data.telephone}</Text>
                <Text style={styles.detail}>email: {params.data.email}</Text>
                <Text style={styles.detail}>codice_biblioteca: {params.data.codice_biblioteca}</Text>
                <Text style={styles.detail}>address: {params.data.address}</Text>
            </View>
        );
    }
}
class MainScreen extends React.Component{
    getData = function () {
        fetch('http://192.168.1.187/library/list', {
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
    }
    render(){
        this.getData()
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(window.response["list"])
        };
        return (
            <View style={{flex: 1}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <View style={styles.container}>
                            <Text style={styles.name} onPress={() => this.props.navigation.navigate('Detail',{'data': rowData})}>{rowData.name}</Text>
                        </View>
                    }
                />
            </View>
        );
    }
}

const SimpleApp = StackNavigator({
    Home: {
        screen: MainScreen,
        navigationOptions: {
            title: 'MicroService:Library Name List',
        },
    },
        Detail: {screen: Detail}
    });

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <SimpleApp style={{ width: Dimensions.get("window").width }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    name: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    detail: {
        fontSize: 15,
        textAlign: 'center',
        margin: 10
    }
})