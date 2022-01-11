import React from 'react';
import { View, Text, Image ,TouchableOpacity,TextInput, StyleSheet, Modal, ActivityIndicator} from 'react-native';
import { colors } from '../assects/colors';
import Images from '../assects/Images';
import { width } from '../assects/strings';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from 'native-base';

export const Header = ({showBackIcon,favIcon,onBackPress,onFavIconPress}) => {
    return (
        <View style={styles.HeaderContainer} >
            <View style={{flexDirection:"row",alignItems:"center"}} >
             {showBackIcon ? <Icon onPress={onBackPress}  name='arrow-back' size={25} color={"#fff"}/> : null}
            <Image style={styles.HeaderImage} source={Images.giphylogo} alt="title" />
            </View>

        </View>
    )
}
export const SearchBar = ({onChangeText }) => {
    return (
        <View style={styles.SearchBarContainer} >
            <TextInput onChangeText={onChangeText} style={styles.SearchBarTextInput} placeholderTextColor={theme.colors.coolGray[400]} placeholder="Search gif and stickers" />
            <TouchableOpacity style={styles.SearchBarBtn} >
                <Icon name="search" size={25} color={theme.colors.black} />
            </TouchableOpacity>
        </View>
    )
}
export const Loader= ({visible}) =>{
    return(
        <Modal visible={visible} transparent={true} >
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}} >
                <View style={{width:width/1.10,height:width/4,alignItems:"center",justifyContent:"center",backgroundColor:"#fff"}} >
                    <ActivityIndicator size={30} color={theme.colors.rose[400]} />
                    <Text>Loading...</Text>
                </View>
            </View>
        </Modal>
    )
}
export function SearchText ({data,searchText}) {
    let text = searchText.toLowerCase()
    let feed = data
    let filteredName = feed.filter((item) => {
        return item.title.toLowerCase().match(text)
    })
    if (!text || text === '') {
       return feeds;  
    } else if (Array.isArray(filteredName)) {
        return filteredName
    }
}

const styles = StyleSheet.create({
    HeaderContainer:{ width: width, height: 45,flexDirection:"row", alignItems: "center", justifyContent: "space-between",paddingHorizontal:10, backgroundColor: colors.primaryColor,borderBottomColor:theme.colors.coolGray[700],borderBottomWidth:0.5 },
    HeaderImage:{ width: width / 4, height: 20},
    SearchBarContainer:{ width: width/1.05, height: 40, marginVertical: 10, backgroundColor: theme.colors.white, flexDirection: "row", alignSelf: "center" },
    SearchBarTextInput:{ flex: 1, paddingLeft: 10 },
    SearchBarBtn:{ width: 50, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.pink[500] }

})