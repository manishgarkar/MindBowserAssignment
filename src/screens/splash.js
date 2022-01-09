import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colors } from '../assects/colors';
import Images from '../assects/Images';
import { width } from '../assects/strings';
import route from '../routes/route';
const SplashScreen = ({navigation}) => {
  
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate(route.feed);
        },1000);
    },[])

    return (
        <View style={styles.container} >
            <Image source={Images.giphylogo} style={styles.imageView} resizeMode='contain' />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.primaryColor },
    imageView:{ width: width / 2, height: width / 2 }
})
export default SplashScreen;