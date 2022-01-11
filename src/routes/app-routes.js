import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import route from './route';
import SplashScreen from '../screens/splash';
import Feeds from '../screens/Home/feeds';
import FeedDetails from '../screens/Home/feedDetails';
const Stack = createStackNavigator();


const AppNavigation = () =>{
    return(
        <Stack.Navigator headerMode={'none'} >
            <Stack.Screen  name={route.splash} component={SplashScreen} />
            <Stack.Screen  name={route.feed} component={Feeds} />
            <Stack.Screen  name={route.feedDetails} component={FeedDetails} />
        </Stack.Navigator>
    )
}  
export default AppNavigation;