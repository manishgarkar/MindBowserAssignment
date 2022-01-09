import React from 'react';
import { View, Text, Image ,TouchableOpacity,TextInput} from 'react-native';
import { colors } from '../assects/colors';
import Images from '../assects/Images';
import { width } from '../assects/strings';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from 'native-base';

export const Header = ({showBackIcon,onBackPress}) => {
    return (
        <View style={{ width: width, height: 45,flexDirection:"row", alignItems: "center", justifyContent: "flex-start", backgroundColor: colors.primaryColor }} >
             {showBackIcon ? <Icon onPress={onBackPress} style={{marginLeft:10}} name='arrow-back' size={25} color={"#fff"}/> : null}
            <Image style={{ width: width / 4, height: 20, margin: 10 }} source={Images.giphylogo} alt="title" />
        </View>
    )
}
export const SearchBar = ({onChangeText }) => {
    return (
        <View style={{ width: width / 1.10, height: 45, marginVertical: 10, backgroundColor: theme.colors.white, flexDirection: "row", alignSelf: "center" }} >
            <TextInput onChangeText={onChangeText} style={{ flex: 1, paddingLeft: 10 }} placeholderTextColor={theme.colors.coolGray[400]} placeholder="Search gif and stickers" />
            <TouchableOpacity style={{ width: 50, height: 45, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.pink[500] }} >
                <Icon name="search" size={25} color={theme.colors.black} />
            </TouchableOpacity>
        </View>
    )
}