import { Box, FlatList, Image, NativeBaseProvider, Spacer, Text, theme, VStack } from "native-base";
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux";
import { colors } from '../../assects/colors';
import { height, width } from '../../assects/strings';
import Icon from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
let rootRef = database().ref("favorites");
import { Header } from "../../component";
import routes from "../../routes/route";

const FavFeeds = ({ navigation, route }) => {
    const { feeds } = useSelector(state => state.feeds);
    const {likesArray} = route.params;
    const [intialFeeds, setFeeds] = useState(feeds.filter(data => likesArray.includes(data.id)));
    const { userId } = useSelector(state => state.users);
    const [isLiked, SetIsLiked] = useState()


    const OnFavPress = (id, index) => {
        rootRef.child(userId)
            .orderByChild("fav_id")
            .equalTo(id)
            .once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    snapshot.forEach((res) => {
                        rootRef.child(userId).child(res.key).remove();
                        setFeeds(intialFeeds.filter(data => id == data.id))
                    })
                }
            });
    }

    const RenderFeeds = () => {
        return (
            <FlatList
                initialNumToRender={10}
                data={intialFeeds}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate(routes.feedDetails, { id: item.id, isLiked: likesArray.filter(data => data == item.id).length == 1 })} >
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

                                    <VStack p={2} >
                                        <Text color="white" bold >{item.title}</Text>
                                        <Text color={theme.colors.gray[400]} >{item?.user?.description}</Text>
                                    </VStack>
                                    <Spacer />
                                </VStack>
                            </Box>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item) => item.id}
            />

        )
    }


    return (
        <NativeBaseProvider>
            <View style={styles.container} >
                <Header text={"Favorites"} showBackIcon onBackPress={() => navigation.goBack()} />
                <RenderFeeds />
            </View>
        </NativeBaseProvider>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.primaryColor }
})
export default FavFeeds;