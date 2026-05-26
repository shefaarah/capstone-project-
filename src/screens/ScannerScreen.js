import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';

export default function ScannerScreen({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  
  // Menggunakan isFocused untuk memastikan kamera di-render ulang saat halaman aktif
  const isFocused = useIsFocused();

  const { idMatkul, namaMatkul } = route.params || { idMatkul: 'INF101', namaMatkul: 'Arsitektur Perangkat Lunak' };

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getCameraPermissions();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.infoText}>Menginisialisasi sensor kamera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Akses kamera tidak diizinkan.</Text>
      </View>
    );
  }

  const handleBarcodeScanned = ({ data }) => {
    setScanned(true);
    Alert.alert(
      "Presensi Berhasil",
      `Anda tercatat hadir pada mata kuliah:\n${namaMatkul}`,
      [
        { 
          text: "Lihat History", 
          onPress: () => {
            navigation.navigate('History', { 
              matkulTerpilih: idMatkul,
              timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            });
          } 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Trik re-render: Kamera hanya dimuat jika layar sedang fokus aktif */}
      {isFocused && (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        />
      )}

      <View style={styles.overlayContainer}>
        <View style={styles.headerArea}>
          <Text style={styles.titleText}>{namaMatkul}</Text>
          <Text style={styles.hintText}>Arahkan kamera ke QR Code di layar dosen</Text>
        </View>

        <View style={styles.targetBox}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>

        <View style={styles.footerArea}>
          {scanned && (
            <TouchableOpacity style={styles.actionButton} onPress={() => setScanned(false)}>
              <Text style={styles.buttonText}>Scan Ulang</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
  },
  headerArea: {
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(17, 24, 39, 0.85)',
    padding: 15,
    borderRadius: 12,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  hintText: {
    fontSize: 13,
    color: '#D1D5DB',
    textAlign: 'center',
  },
  targetBox: {
    width: 240,
    height: 240,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#4F46E5',
  },
  topLeft: { top: 0, left: 0, borderTopWidth: 5, borderLeftWidth: 5 },
  topRight: { top: 0, right: 0, borderTopWidth: 5, borderRightWidth: 5 },
  bottomLeft: { bottom: 0, left: 0, borderBottomWidth: 5, borderLeftWidth: 5 },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: 5, borderRightWidth: 5 },
  footerArea: {
    height: 60,
    justifyContent: 'center',
  },
  infoText: {
    color: '#ffffff',
    fontSize: 16,
  },
  errorText: {
    color: '#EF4444',
    textAlign: 'center',
    fontSize: 16,
  },
  actionButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});