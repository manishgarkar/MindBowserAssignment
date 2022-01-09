import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './app-routes';
import { StatusBar } from 'react-native';
import { theme } from 'native-base';
import { colors } from '../assects/colors';
const Routes = () =>{
    return(
        <NavigationContainer  >
            <AppNavigation />
        </NavigationContainer>
    )
}
export default Routes;