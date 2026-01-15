import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet, Image} from 'react-native';

//Create a new variable named originalData
let originalData = [];

// StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,                 
        backgroundColor: '#84befd', 
    },
    searchText: {
        textAlign: 'center',
        marginTop: 10,
        color: 'white',
        fontSize: 25
    },
    searchInput: {
        borderWidth: 1,
        margin: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        fontSize: 20,
    },
    searchBar:{
        backgroundColor:'#1e64f8',
    },
    listStyle: {
        marginLeft: 10,
        marginRight: 10,
    },
    imageStyle: {
        width: 170,
        height: 170,
        borderRadius: 10,
        marginLeft: 15,
        borderWidth: 1,
    },
    gameName: {
        fontWeight: 'bold',
        flex: 1,
        fontSize: 20,
        paddingTop: 10,
        marginRight: 15,
    },
    listContent: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 3,
        borderColor: '#1e64f8',
    },
    gameYear: {
        fontSize: 30,
        color: '#555',
    },
})

const App = () => {
    const [myData, setMyData] = useState([]);

    //Add fetch() - Exercise 1A
    const myurl = "https://onlinegameappwebservice-ndoc.onrender.com/allgames";
    useEffect(() => {
        fetch(myurl)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                setMyData(myJson);
                originalData = myJson;
            });
    }, []);

    const FilterData = (text) => {
        if(text!='') {

            let myFilteredData = originalData.filter((item) =>
                item.game_name.toLowerCase().includes(text.toLowerCase()));
            setMyData(myFilteredData);
        }
        else {
            setMyData(originalData);
        }
    }


    const renderItem = ({item, index}) => {
        return (
            <View style={styles.listStyle}>
                <View style={styles.listContent}>
                <Text style={styles.gameName}>
                    {item.game_name}
                    {"\n\n"}
                    <Text style={styles.gameYear}>{item.game_year}</Text>
                </Text>
                <Image style={styles.imageStyle} source={{uri: item.game_cover}}/>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#1e64f8" />
            <View style={styles.searchBar}>
            <Text style={styles.searchText}>Search:</Text>
            <TextInput style={styles.searchInput} onChangeText={(text)=>{FilterData(text)}}/>
            </View>
            <FlatList data={myData} renderItem={renderItem} />
        </View>
    );
}

export default App;
