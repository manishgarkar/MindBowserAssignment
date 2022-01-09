import React from 'react';
import { View, Text, Image ,TouchableOpacity,TextInput, StyleSheet} from 'react-native';
import { colors } from '../assects/colors';
import Images from '../assects/Images';
import { width } from '../assects/strings';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from 'native-base';

export const Header = ({showBackIcon,onBackPress}) => {
    return (
        <View style={styles.HeaderContainer} >
             {showBackIcon ? <Icon onPress={onBackPress} style={{marginLeft:10}} name='arrow-back' size={25} color={"#fff"}/> : null}
            <Image style={styles.HeaderImage} source={Images.giphylogo} alt="title" />
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
const styles = StyleSheet.create({
    HeaderContainer:{ width: width, height: 45,flexDirection:"row", alignItems: "center", justifyContent: "flex-start", backgroundColor: colors.primaryColor },
    HeaderImage:{ width: width / 4, height: 20, margin: 10 },
    SearchBarContainer:{ width: width / 1.10, height: 45, marginVertical: 10, backgroundColor: theme.colors.white, flexDirection: "row", alignSelf: "center" },
    SearchBarTextInput:{ flex: 1, paddingLeft: 10 },
    SearchBarBtn:{ width: 50, height: 45, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.pink[500] }

})