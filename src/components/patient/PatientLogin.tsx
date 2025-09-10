import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { API_BASE_URL } from '../../api';

type LoginSuccess = {
  message?: string;
  user?: unknown;
};

type Props = {
  onSuccess?: (data: LoginSuccess) => void;
  onNavigateRegister?: () => void;
};

export default function PatientLogin({ onSuccess, onNavigateRegister }: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'patient' }),
      });
      const data = (await res.json()) as LoginSuccess & { error?: string };
      if (!res.ok) {
        throw new Error(data?.error || 'Login failed');
      }
      onSuccess && onSuccess(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 28, fontWeight: '700', marginBottom: 24 }}>Patient Login</Text>

      <Text style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="you@example.com"
        style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 16 }}
      />

      <Text style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>Password</Text>
      <View style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, paddingHorizontal: 12, marginBottom: 8 }}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholder="••••••••"
          style={{ paddingVertical: 10 }}
        />
      </View>
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Text style={{ color: '#2563eb', marginBottom: 16 }}>{showPassword ? 'Hide password' : 'Show password'}</Text>
      </TouchableOpacity>

      {!!error && (
        <Text style={{ color: '#b91c1c', marginBottom: 12 }}>{error}</Text>
      )}

      <TouchableOpacity onPress={handleLogin} disabled={loading} style={{ backgroundColor: loading ? '#9ca3af' : '#2563eb', paddingVertical: 14, borderRadius: 10, alignItems: 'center' }}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff', fontWeight: '700' }}>Sign In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={onNavigateRegister} style={{ marginTop: 16, alignItems: 'center' }}>
        <Text style={{ color: '#2563eb' }}>New here? Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}



