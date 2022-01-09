import {
    Box,
    FlatList, HStack,
    Image, NativeBaseProvider, Spacer, Text, theme, VStack
} from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View,BackHandler,Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../api";
import { colors } from '../../assects/colors';
import { width } from '../../assects/strings';
import { Header, SearchBar } from "../../component";
import { storeFeeds } from "../../redux/actions/feeds";
import route from "../../routes/route";

const Feeds = ({ navigation }) => {
    const dispatch = useDispatch();
    const { feeds } = useSelector(state => state.feeds);
    const [initialfeeds, setFeeds] = useState(feeds);
    const [count, setCount] = useState(50);
    
    useEffect(() => {
        onHarwareBackPress()
        API({ method: 'get', endpoint: 'trending', limit: count })
            .then((res) => {
                dispatch(storeFeeds(res.data))
            })
            .catch((err) => { console.log("err", err) })

    },[])
   function onHarwareBackPress (){
    const backAction = () => {
        Alert.alert("Exit", "Are you sure you want to exit app ?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    }

    const searchText = (e) => {
        let text = e.toLowerCase()
        let data = feeds
        let filteredName = data.filter((item) => {
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
            <View style={styles.emptyContainer} >
                <Icon name="sad" color={"#fff"} size={40} />
                <Text style={{ color: "#fff" }} >Data not avalible</Text>
            </View>
        )
    }

    const getPaginationData = () => {
        API({ method: 'get', endpoint: 'trending', limit: count + 20 })
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
                        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate(route.feedDetails, { id: item.id })} >
                            <Box borderBottomWidth="0.5" borderColor="coolGray.500" pl="4" pr="4" py="2" >
                                <VStack space={2} justifyContent="space-between">
                                    <Image
                                        alt="description of image"
                                        height={width / 2}
                                        width={width / 1.10}
                                        source={{
                                            uri: item?.images.original.url,
                                        }}
                                    />
                                        <VStack>
                                            <HStack space={2} style={{ justifyContent: "space-between", alignItems: "center" }} >
                                                <Text  color="white"  bold>{item.title}</Text>
                                                <TouchableOpacity onPress={() => OnFavPress(item.id)} >
                                                    <Icon name="heart" color={"#444"} size={20} />
                                                </TouchableOpacity>
                                            </HStack>
                                            <Text color={theme.colors.gray[400]} > {item?.user?.description}</Text>
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
        <NativeBaseProvider >
            <View style={styles.container} >
                <Header onBackPress={() => navigation.goBack()} />
                <SearchBar onChangeText={(text) => searchText(text)} />
                <RenderFeeds />
            </View>
        </NativeBaseProvider>
    )
}
const styles = StyleSheet.create({
    container:{ flex: 1, backgroundColor: colors.primaryColor },
    emptyContainer:{ height: width, alignItems: "center", justifyContent: "center" }
})
export default Feeds;