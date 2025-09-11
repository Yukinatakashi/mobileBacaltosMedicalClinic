import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import API_BASE_URL from '../../api';

// Define the Stack Navigator's param list
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

// Define the props type for the Register screen
type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function PatientRegister({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const handleRegister = async () => {
    setError('');
    setInfo('');
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_BASE_URL}/register`, {
        email,
        password,
        role: 'patient',
      });

      setInfo(data.message || 'Account created successfully!');
      // Optionally navigate to Login after success
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1500); // Give the user a moment to see the success message

    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 28, fontWeight: '700', marginBottom: 24 }}>
        Create Patient Account
      </Text>

      <Text style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="you@example.com"
        style={{
          borderWidth: 1,
          borderColor: '#e5e7eb',
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
        }}
      />

      <Text style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="••••••••"
        style={{
          borderWidth: 1,
          borderColor: '#e5e7eb',
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
        }}
      />

      {error ? <Text style={{ color: '#b91c1c', marginBottom: 12 }}>{error}</Text> : null}
      {info ? <Text style={{ color: '#065f46', marginBottom: 12 }}>{info}</Text> : null}

      <TouchableOpacity
        onPress={handleRegister}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#9ca3af' : '#10b981',
          paddingVertical: 14,
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff', fontWeight: '700' }}>Create Account</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{ marginTop: 16, alignItems: 'center' }}
      >
        <Text style={{ color: '#2563eb' }}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}