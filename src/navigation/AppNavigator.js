import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import DetailMatkulScreen from '../screens/DetailMatkulScreen';
import ScannerScreen from '../screens/ScannerScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* Di v7, gunakan Stack.Navigator secara eksplisit, bukan <Navigator> saja */}
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#4F46E5' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Portal Mahasiswa' }} />
        <Stack.Screen name="DetailMatkul" component={DetailMatkulScreen} options={{ title: 'Detail Presensi Kelas' }} />
        <Stack.Screen name="Scanner" component={ScannerScreen} options={{ title: 'Scan QR Presensi' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Riwayat Presensi' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}