import React from 'react';
import { Image, View } from 'react-native';
import { colors } from '../assects/colors';
import Images from '../assects/Images';
import { width } from '../assects/strings';
import route from '../routes/route';
const SplashScreen = ({navigation}) => {
  
    setTimeout(()=>{
        navigation.navigate(route.feed);
    },1000);
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.primaryColor }} >
            <Image source={Images.giphylogo} style={{ width: width / 2, height: width / 2 }} resizeMode='contain' />
        </View>
    )
}
export default SplashScreen;