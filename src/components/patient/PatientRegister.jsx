import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { User, Mail, Lock, Eye, EyeOff, Heart } from 'lucide-react-native';
import axios from 'axios';
import API_BASE_URL from '../../api';

export default function PatientRegister({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundDecoration} />
      
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../images/logo.jpg')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Join Our Care Family</Text>
        <Text style={styles.subtitle}>Your health journey begins here ✨</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <Mail size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="you@example.com"
                style={styles.textInput}
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <Lock size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="Create a secure password"
                style={styles.textInput}
                placeholderTextColor="#94a3b8"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#64748b" />
                ) : (
                  <Eye size={20} color="#64748b" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          
          {info ? (
            <View style={styles.successContainer}>
              <Heart size={16} color="#059669" />
              <Text style={styles.successText}>{info}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading || !email || !password}
            style={[
              styles.registerButton,
              (loading || !email || !password) && styles.registerButtonDisabled
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <User size={20} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.registerButtonText}>Create My Account</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              console.log('Login link tapped!');
              navigation.navigate('Login');
            }}
            style={styles.loginLink}
          >
            <Text style={styles.loginLinkText}>
              Already have an account? <Text style={styles.loginLinkHighlight}>Sign in here</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomDecoration}>
        <Text style={styles.decorationText}>Trusted healthcare at your fingertips</Text>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  backgroundDecoration: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: '#e0f2fe',
    opacity: 0.2,
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 10,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    paddingVertical: 10,
  },
  eyeIcon: {
    padding: 4,
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderLeftWidth: 4,
    borderLeftColor: '#dc2626',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    maxHeight: 60,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 13,
    fontWeight: '500',
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    maxHeight: 60,
  },
  successText: {
    color: '#059669',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 8,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0ea5e9',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 14,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  registerButtonDisabled: {
    backgroundColor: '#cbd5e1',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonIcon: {
    marginRight: 8,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: '#0ea5e9',
    borderRadius: 10,
    backgroundColor: '#e0f2fe',
    marginVertical: 10,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  loginLinkText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
  },
  loginLinkHighlight: {
    color: '#0ea5e9',
    fontWeight: '700',
  },
  bottomDecoration: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  decorationText: {
    fontSize: 12,
    color: '#94a3b8',
    fontStyle: 'italic',
    letterSpacing: 1.5,
  },
});