import {
    Box,
    FlatList, Image, NativeBaseProvider, Spacer, Text, theme, VStack
} from "native-base";
import React, { useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { colors } from '../../assects/colors';
import { height, width } from '../../assects/strings';
import { Header } from "../../component";
const FeedDetails = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { feeds } = useSelector(state => state.feeds);
    const [intialFeeds, setFeeds] = useState(feeds.filter(data => data.id == route.params.id));

    const RenderFeeds = () => {
        return (

            <FlatList
                initialNumToRender={10}
                data={intialFeeds}
                // ListEmptyComponent={() => <EmptyComponent />}
                renderItem={({ item }) => {
                    return (
                        <Box

                            borderColor="coolGray.500"
                            pl="4"
                            pr="0"
                            py="0"
                        >
                            <VStack space={2} justifyContent="space-between">
                                <Image
                                    alt="description of image"
                                    height={height / 1.50}
                                    width={width / 1.10}
                                    resizeMode="contain"
                                    source={{
                                        uri: item?.images.original.url,
                                    }}
                                />
                                <VStack>
                                    <Text
                                        _dark={{
                                            color: "white",
                                        }}
                                        color="white"
                                        bold
                                    >
                                        {item.title}
                                    </Text>
                                    <Text
                                        color={theme.colors.gray[400]}
                                        _dark={{
                                            color: "red",
                                        }}
                                    >
                                        {item?.user?.description}
                                    </Text>
                                </VStack>
                                <Spacer />
                            </VStack>
                        </Box>
                    )
                }}
                keyExtractor={(item) => item.id}
            />

        )
    }


    return (
        <NativeBaseProvider>
            <View style={{ flex: 1, backgroundColor: colors.primaryColor }} >
                <Header showBackIcon onBackPress={() => navigation.goBack()} />
                <RenderFeeds />
            </View>
        </NativeBaseProvider>
    )
}
export default FeedDetails;