import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './src/routes';
import { store, persistor } from './src/redux/store';
import { theme } from 'native-base';
import { colors } from './src/assects/colors';
const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.black }} >
      <StatusBar barStyle='light-content' backgroundColor={colors.primaryColor} />
      <Provider store={store} >
        <PersistGate persistor={persistor} >
          <Routes />
        </PersistGate>
      </Provider>
    </View>
  )
}
export default App;