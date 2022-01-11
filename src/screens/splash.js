import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colors } from '../assects/colors';
import Images from '../assects/Images';
import { width } from '../assects/strings';
import route from '../routes/route';
import auth from '@react-native-firebase/auth';
import { storeUserDetails } from '../redux/actions/users';
import { useDispatch ,useSelector} from 'react-redux';

const SplashScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const { userId } = useSelector(state => state.users);

  
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate(route.feed);
        },1000);
        createUser()

        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount

    },[])

    function onAuthStateChanged(user) {
        dispatch(storeUserDetails(user?.uid))
    }

    function createUser() {
        !userId ? auth()
            .signInAnonymously()
            .then((res) => {
                console.log('User signed in anonymously');
            })
            .catch(error => {
                if (error.code === 'auth/operation-not-allowed') {
                    console.log('Enable anonymous in your firebase console.');
                }

                console.error(error);
            }) : null
    }



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