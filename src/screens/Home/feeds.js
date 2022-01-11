import {
    Box,
    HStack,
    Image, NativeBaseProvider, Spacer, Text, theme, VStack
} from "native-base";
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, BackHandler, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../api";
import { colors } from '../../assects/colors';
import { height, width } from '../../assects/strings';
import { Header, Loader, SearchBar } from "../../component";
import { storeFeeds } from "../../redux/actions/feeds";
import route from "../../routes/route";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
let rootRef = database().ref("favorites");
let likesArray = [];
const Feeds = ({ navigation }) => {
    const flatListRef = useRef()
    const dispatch = useDispatch();
    const { feeds } = useSelector(state => state.feeds);
    const { userId } = useSelector(state => state.users);
    const [initialfeeds, setFeeds] = useState([]);
    const [Loading, SetLoading] = useState(true);
    const [count, setCount] = useState(50);
    const [likes, SetLikes] = useState(false);
    const [Index , setIndex] = useState(0);
    useEffect(() => {
        setFeeds(feeds);
    }, [feeds])

    useEffect(() => {
        onHarwareBackPress()
        SetLoading(true)
        API({ method: 'get', endpoint: 'trending', limit: count })
            .then((res) => {
                SetLoading(false);
                dispatch(storeFeeds(res.data))
            })
            .catch((err) => { console.log("err", err) })
    }, [navigation])


    useEffect(() => {
        var refff = database().ref('favorites/' + userId);
        refff.on('value', function (snapshot) {
            snapshot.forEach(data => {
                data.forEach((res) => {
                  likesArray.push(res.val("fav_id"));
                })
            })
            SetLikes(likesArray)
            flatListRef?.current?.scrollToIndex({ animated: false, index: Index });

        }, function (error) {
            console.error(error);
        });
       
    }, [navigation])


    function onHarwareBackPress() {
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
    const OnFavPress = (id) => {
        likesArray=[]
        rootRef.child(userId)
            .orderByChild("fav_id")
            .equalTo(id)
            .once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    snapshot.forEach((res) => {
                        rootRef.child(userId).child(res.key).remove()
 
                    })
                } else {
                    rootRef.child(userId).push({ fav_id: id });

                }
            });
    }

    const RenderFeeds = () => {
        return (
            <FlatList
                initialNumToRender={5}
                ref={flatListRef}
                data={initialfeeds}
                onEndReached={() => getPaginationData()}
                onEndReachedThreshold={0.7}
                ListEmptyComponent={() => <EmptyComponent />}
                renderItem={({ item }) => {
                    return (
                        <FeedComponent item={item}  />
                    )
                }}
                keyExtractor={(item) => item.id}
            />
        )
    }

    const FeedComponent = ({item}) => {
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate(route.feedDetails, { id: item.id ,isLiked:likesArray.filter(data=>data==item.id).length==1})} >
                <Box borderBottomWidth="0.5" borderColor="coolGray.800" py="2" >
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
                            <HStack space={2} style={{ justifyContent: "space-between", alignItems: "center" }} >
                                <Text width={"80"} color="white" bold>{item.title}</Text>
                                <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={() => OnFavPress(item.id)} >
                                    <Icon name={likesArray.filter(data=>data==item.id).length==1 ? "heart":"heart-outline"} color={likesArray.filter(data=>data==item.id).length==1 ? "#FF6666" : "#ececec"} size={20} />
                                </TouchableOpacity>
                            </HStack>
                            <Text color={theme.colors.gray[400]} > {item?.user?.description}</Text>
                        </VStack>
                        <Spacer />
                    </VStack>
                </Box>
            </TouchableOpacity>
        )
    }
    return (
        <NativeBaseProvider  >
            <View style={styles.container} >
                <Header favIcon={true} onFavIconPress={()=>navigation.navigate(route.favFeed,{likesArray})} searchIcon={true} onBackPress={() => navigation.goBack()} />
                <SearchBar onChangeText={(text) => searchText(text)} />
                <RenderFeeds />
                <Loader visible={initialfeeds.length == 0 && Loading} />
            </View>
        </NativeBaseProvider>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.primaryColor },
    emptyContainer: { height: height / 1.50, alignItems: "center", justifyContent: "center" }
})
export default Feeds;