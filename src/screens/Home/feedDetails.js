import { Box, FlatList, Image, NativeBaseProvider, Spacer, Text, theme, VStack } from "native-base";
import React, { useState } from 'react';
import { StyleSheet, View,TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux";
import { colors } from '../../assects/colors';
import { height, width } from '../../assects/strings';
import Icon from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
let rootRef = database().ref("favorites");
import { Header } from "../../component";
const FeedDetails = ({ navigation, route }) => {
    const { feeds } = useSelector(state => state.feeds);
    const [intialFeeds, setFeeds] = useState(feeds.filter(data => data.id == route.params.id));
    const { userId } = useSelector(state => state.users);
    const [isLiked,SetIsLiked] = useState(route.params.isLiked)


    const OnFavPress = (id) => {
        rootRef.child(userId)
            .orderByChild("fav_id")
            .equalTo(id)
            .once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    snapshot.forEach((res) => {
                        SetIsLiked(false);
                        rootRef.child(userId).child(res.key).remove()
                    })
                } else {
                    SetIsLiked(true);
                    rootRef.child(userId).push({ fav_id: id });
                }
            });
    }

    
    const RenderFeeds = () => {
        return (
            <FlatList
                initialNumToRender={10}
                data={intialFeeds}
                renderItem={({ item }) => {
                    return (
                        <Box borderColor="coolGray.500"  >
                            <VStack space={2} justifyContent="space-between">
                                <Image
                                    alt="description of image"
                                    height={item?.images.original.height}
                                    width={item?.images.original.width}
                                    source={{
                                        uri: item?.images.original.url,
                                    }}
                                />
                                <TouchableOpacity style={{marginLeft:10}} hitSlop={{top:10,bottom:10,left:10,right:10}} onPress={() => OnFavPress(item.id)} >
                                    <Icon name={isLiked ? "heart":"heart-outline"} color={isLiked ?"red" :'#ececec'} size={25} />
                                </TouchableOpacity>
                                <VStack p={2} >
                                    <Text color="white" bold >{item.title}</Text>
                                       <Text color={theme.colors.gray[400]} >{item?.user?.description}</Text>
                                </VStack>
                                <Spacer />
                            </VStack>
                        </Box>
                    )
                }}
                keyExtractor={(item) => item.url}
            />

        )
    }


    return (
        <NativeBaseProvider>
            <View style={styles.container} >
                <Header showBackIcon onBackPress={() => navigation.goBack()} />
                <RenderFeeds />
            </View>
        </NativeBaseProvider>
    )
}
const styles = StyleSheet.create({
    container:{ flex: 1, backgroundColor: colors.primaryColor }
})
export default FeedDetails;