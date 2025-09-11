// App.js (JS version)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import PatientLogin from './src/components/patient/PatientLogin';
import PatientRegister from './src/components/patient/PatientRegister';
import PatientDashboard from './src/components/patient/PatientDashboard';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#3498db' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Login" component={PatientLogin} />
        <Stack.Screen name="Register" component={PatientRegister} />
        <Stack.Screen name="PatientDashboard" component={PatientDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
