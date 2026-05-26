import 'react-native-gesture-handler'; // <-- Taruh di baris nomor 1
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { LogBox } from 'react-native';

export default function App() {
  return <AppNavigator />;
}
LogBox.ignoreLogs(['InteractionManager has been deprecated']);