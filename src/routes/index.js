import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppNavigation from './app-routes';
const Routes = () =>{
    return(
        <NavigationContainer  >
            <AppNavigation />
        </NavigationContainer>
    )
}
export default Routes;