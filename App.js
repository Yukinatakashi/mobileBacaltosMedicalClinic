import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// ✅ Properly named imports
import PatientLogin from './src/components/patient/PatientLogin';
import PatientRegister from './src/components/patient/PatientRegister';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        // 👇 start at login
        initialRouteName="Login"
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
          name="Login" 
          component={PatientLogin} 
          options={{ title: 'Login' }} 
        />
        <Stack.Screen 
          name="Register" 
          component={PatientRegister} 
          options={{ title: 'Register' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
