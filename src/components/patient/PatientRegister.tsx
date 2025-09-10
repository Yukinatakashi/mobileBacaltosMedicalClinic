import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { supabase } from '../../services/supabasefrontend';

type Props = {
  onSuccess?: (data: unknown) => void;
  onNavigateLogin?: () => void;
};

export default function PatientRegister({ onSuccess, onNavigateLogin }: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [info, setInfo] = useState<string>('');

  const handleRegister = async () => {
    setError('');
    setInfo('');
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      setInfo('Check your email to verify your account.');
      onSuccess && onSuccess(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 28, fontWeight: '700', marginBottom: 24 }}>Create Patient Account</Text>

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
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="••••••••"
        style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 16 }}
      />

      {!!error && (
        <Text style={{ color: '#b91c1c', marginBottom: 12 }}>{error}</Text>
      )}
      {!!info && (
        <Text style={{ color: '#065f46', marginBottom: 12 }}>{info}</Text>
      )}

      <TouchableOpacity onPress={handleRegister} disabled={loading} style={{ backgroundColor: loading ? '#9ca3af' : '#10b981', paddingVertical: 14, borderRadius: 10, alignItems: 'center' }}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff', fontWeight: '700' }}>Create Account</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={onNavigateLogin} style={{ marginTop: 16, alignItems: 'center' }}>
        <Text style={{ color: '#2563eb' }}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}


