import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Alert 
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!nim.trim() || !password.trim()) {
      Alert.alert("Login Gagal", "NIM dan Password wajib diisi!");
      return;
    }

    // Mengirimkan data NIM yang diketik sebagai parameter ke DashboardScreen
    navigation.replace('Dashboard', { userNim: nim.trim() });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Bagian Atas: Logo & Judul Aplikasi */}
        <View style={styles.headerArea}>
          <View style={styles.logoMockup}>
            <Text style={styles.logoIcon}>QR</Text>
          </View>
          <Text style={styles.appTitle}>Smart QR Attendance</Text>
          <Text style={styles.appSubtitle}>Portal Attendance Student</Text>
        </View>

        {/* Bagian Tengah: Form Input */}
        <View style={styles.formArea}>
          <Text style={styles.label}>Student ID(NIM)</Text>
          <TextInput 
            style={styles.input}
            placeholder="Input Your NIM"
            placeholderTextColor="#9CA3AF"
            keyboardType="default" 
            value={nim}
            onChangeText={(text) => setNim(text.toUpperCase())} 
            autoCapitalize="characters"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput 
            style={styles.input}
            placeholder="Input Your Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />

          {/* Tombol Lupa Password */}
          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Tombol Masuk */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>

        {/* Bagian Bawah: Footer Hak Cipta */}
        <View style={styles.footerArea}>
          <Text style={styles.footerText}>Capstone Project 2026</Text>
          <Text style={styles.footerSubText}>Informatic Engineering • Universitas Muhammadiyah Surakarta</Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  headerArea: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoMockup: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    marginBottom: 16,
  },
  logoIcon: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  appSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  formArea: {
    marginTop: 40,
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#1F2937',
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 24,
  },
  forgotText: {
    color: '#4F46E5',
    fontSize: 13,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerArea: {
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  footerSubText: {
    fontSize: 11,
    color: '#D1D5DB',
    marginTop: 2,
  },
});