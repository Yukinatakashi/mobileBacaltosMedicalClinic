import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LogIn, Mail, Lock, Eye, EyeOff, UserCheck, ArrowRight } from 'lucide-react-native';
import axios from 'axios';
import API_BASE_URL from '../../api';

export default function PatientLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
        role: 'patient',
      });

      setEmail('');
      setPassword('');
      navigation.replace('PatientDashboard', { user: res.data.user });

    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundDecoration1} />
      <View style={styles.backgroundDecoration2} />
      
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../images/logo.jpg')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue your care journey 💙</Text>
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
                placeholder="Enter your email"
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
                placeholder="Enter your password"
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

          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.passwordToggle}
          >
            <Text style={styles.passwordToggleText}>
              {showPassword ? 'Hide password' : 'Show password'}
            </Text>
          </TouchableOpacity>

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading || !email || !password}
            style={[
              styles.loginButton,
              (loading || !email || !password) && styles.loginButtonDisabled
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <LogIn size={20} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.loginButtonText}>Sign In</Text>
                <ArrowRight size={16} color="#fff" style={styles.arrowIcon} />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPasswordLink}>
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            onPress={() => {
              console.log('Register link tapped!');
              navigation.navigate('Register');
            }}
            style={styles.registerLink}
          >
            <UserCheck size={20} color="#0ea5e9" style={styles.registerIcon} />
            <Text style={styles.registerLinkText}>
              New here? <Text style={styles.registerLinkHighlight}>Create an account</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomDecoration}>
        <Text style={styles.decorationText}>Secure • Private • Trusted</Text>
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
  backgroundDecoration1: {
    position: 'absolute',
    top: -20,
    left: -20,
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    backgroundColor: '#dbeafe',
    opacity: 0.3,
  },
  backgroundDecoration2: {
    position: 'absolute',
    top: 80,
    right: -20,
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    backgroundColor: '#e0f2fe',
    opacity: 0.2,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
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
    marginBottom: 24,
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
  passwordToggle: {
    alignSelf: 'flex-end',
    marginBottom: 16,
    paddingVertical: 4,
  },
  passwordToggleText: {
    fontSize: 14,
    color: '#0ea5e9',
    fontWeight: '500',
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
  loginButton: {
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
  loginButtonDisabled: {
    backgroundColor: '#cbd5e1',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonIcon: {
    marginRight: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  arrowIcon: {
    marginLeft: 8,
  },
  forgotPasswordLink: {
    alignItems: 'center',
    paddingVertical: 6,
    marginBottom: 14,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    fontSize: 12,
    color: '#94a3b8',
    marginHorizontal: 12,
    fontWeight: '500',
  },
  registerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  registerIcon: {
    marginRight: 8,
  },
  registerLinkText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
  },
  registerLinkHighlight: {
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