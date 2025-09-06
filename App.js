import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import PatientHomepage from './src/components/patient/PatientHomepage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="PatientHomepage"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3498db',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="PatientHomepage" 
          component={PatientHomepage}
          options={{ 
            title: 'Medical App',
            headerShown: false 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
