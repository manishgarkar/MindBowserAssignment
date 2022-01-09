import React, { useEffect } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import Images from '../assects/Images';
import { colors } from '../assects/colors';
import { width, height, API_KEY } from '../assects/strings';
import { API } from '../api';
import route from '../routes/route';
const SplashScreen = ({navigation}) => {
  
    setTimeout(()=>{
        navigation.navigate(route.feed)
    },1000)
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.primaryColor }} >
            <Image source={Images.giphylogo} style={{ width: width / 2, height: width / 2 }} resizeMode='contain' />
        </View>
    )
}
export default SplashScreen;