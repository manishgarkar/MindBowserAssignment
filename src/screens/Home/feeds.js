import {
    Box,
    FlatList, HStack,
    Image, NativeBaseProvider, Spacer, Text, theme, VStack
} from "native-base";
import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../api";
import { colors } from '../../assects/colors';
import Images from '../../assects/Images';
import { width } from '../../assects/strings';
import { Header, SearchBar } from "../../component";
import { storeFeeds } from "../../redux/actions/feeds";
import route from "../../routes/route";

var db = openDatabase({ name: 'FavDB.db' });
const Feeds = ({ navigation }) => {
    const dispatch = useDispatch();
    const { feeds } = useSelector(state => state.feeds);
    const [initialfeeds, setFeeds] = useState(feeds);
    const [count, setCount] = useState(10);


    useEffect(() => {
        setFeeds(feeds)
    }, [feeds])


    useEffect(() => {
        console.log("TE")
        API({ method: 'get', endpoint: 'trending', limit: count })
            .then((res) => {
                dispatch(storeFeeds(res.data))
            })
            .catch((err) => { console.log("err", err) })

    }, [])

    const searchText = (e) => {
        let text = e.toLowerCase()
        let notifications = feeds
        let filteredName = notifications.filter((item) => {
            return item.title.toLowerCase().match(text)
        })
        if (!text || text === '') {
            setFeeds(feeds)
        } else if (Array.isArray(filteredName)) {
            setFeeds(filteredName)
        }
    }


    const EmptyComponent = () => {
        return (
            <View style={{ height: width, alignItems: "center", justifyContent: "center" }} >
                <Icon name="sad" color={"#fff"} size={40} />
                <Text style={{ color: "#fff" }} >Data not avalible</Text>
            </View>
        )
    }

    const getPaginationData = () => {
        API({ method: 'get', endpoint: 'trending', limit: count + 10 })
            .then((res) => {
                setCount(count + 10)
                dispatch(storeFeeds(res.data))
            })
            .catch((err) => { console.log("err", err) })

    }
    const RenderFeeds = () => {
        return (

            <FlatList
                initialNumToRender={10}
                data={initialfeeds}
                onEndReached={() => getPaginationData()}
                ListEmptyComponent={() => <EmptyComponent />}
                renderItem={({ item }) => {

                    return (
                        <View >
                            <Box
                                borderBottomWidth="0.5"
                                _dark={{
                                    borderColor: "gray.200",
                                }}
                                borderColor="coolGray.500"
                                pl="4"
                                pr="4"
                                py="2"
                            >
                                <VStack space={2} justifyContent="space-between">
                                    <Image
                                        alt="description of image"
                                        height={width / 2}
                                        width={width / 1.10}
                                        source={{
                                            uri: item?.images.original.url,
                                        }}
                                    />
                                    <TouchableOpacity onPress={() => navigation.navigate(route.feedDetails, { id: item.id })} >
                                        <VStack>
                                            <HStack space={2} style={{ justifyContent: "space-between", alignItems: "center" }} >
                                                <Text
                                                    _dark={{
                                                        color: "white",
                                                    }}
                                                    color="white"
                                                    bold
                                                >
                                                    {item.title}
                                                </Text>
                                                <TouchableWithoutFeedback onPress={() => OnFavPress(item.id)} >
                                                    <Icon name="heart" color={"#444"} size={20} />
                                                </TouchableWithoutFeedback>
                                            </HStack>
                                            <Text
                                                color={theme.colors.gray[400]}
                                                _dark={{
                                                    color: "red",
                                                }}
                                            >
                                                {item?.user?.description}
                                            </Text>
                                        </VStack>
                                    </TouchableOpacity>
                                    <Spacer />
                                </VStack>
                            </Box>
                        </View>
                    )
                }}
                keyExtractor={(item) => item.id}
            />

        )
    }
    return (
        <NativeBaseProvider >
            <View style={{ flex: 1, backgroundColor: colors.primaryColor }} >
                <Header onBackPress={() => navigation.goBack()} />
                <SearchBar onChangeText={(text) => searchText(text)} />
                <RenderFeeds />
            </View>
        </NativeBaseProvider>
    )
}
export default Feeds;