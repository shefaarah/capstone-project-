import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function DetailMatkulScreen({ route, navigation }) {
  const { idMatkul, namaMatkul } = route.params;

  // Data simulasi list pertemuan 1-16 sesuai requirement sistem kampus
  const listPertemuan = [
    { id: '1', sesi: 'Pertemuan 1', tanggal: '02/03/2026', status: 'Present', waktu: '08:02:11' },
    { id: '2', sesi: 'Pertemuan 2', tanggal: '09/03/2026', status: 'Present', waktu: '08:01:45' },
    { id: '3', sesi: 'Pertemuan 3', tanggal: '16/03/2026', status: 'Absent', waktu: '-' },
    { id: '4', sesi: 'Pertemuan 4', tanggal: '23/03/2026', status: 'Present', waktu: '08:05:22' },
    { id: '5', sesi: 'Pertemuan 5', tanggal: '30/03/2026', status: 'Present', waktu: '08:00:30' },
    { id: '6', sesi: 'Pertemuan 6', tanggal: '06/04/2026', status: 'Present', waktu: '08:01:15' },
    { id: '7', sesi: 'Pertemuan 7', tanggal: '13/04/2026', status: 'Absent', waktu: '-' },
    { id: '8', sesi: 'Pertemuan 8 (UTS)', tanggal: '20/04/2026', status: 'Present', waktu: '07:58:10' },
    { id: '9', sesi: 'Pertemuan 9', tanggal: '27/04/2026', status: 'Present', waktu: '08:02:40' },
    { id: '10', sesi: 'Pertemuan 10', tanggal: '04/05/2026', status: 'Present', waktu: '08:01:05' },
    { id: '11', sesi: 'Pertemuan 11', tanggal: '11/05/2026', status: 'Present', waktu: '08:03:50' },
    { id: '12', sesi: 'Pertemuan 12', tanggal: '18/05/2026', status: 'Present', waktu: '08:00:12' },
    { id: '13', sesi: 'Pertemuan 13 (Hari Ini)', tanggal: '25/05/2026', status: 'Belum Presensi', waktu: '-' },
  ];

  const renderSesi = ({ item }) => {
    const isPresent = item.status === 'Present';
    const isAbsent = item.status === 'Absent';

    return (
      <View style={styles.sesiCard}>
        <View style={styles.sesiLeft}>
          <Text style={styles.sesiTitle}>{item.sesi}</Text>
          <Text style={styles.sesiDate}>{item.tanggal} {item.waktu !== '-' && `• ${item.waktu}`}</Text>
        </View>
        <View style={[
          styles.statusBadge, 
          isPresent && styles.badgePresent, 
          isAbsent && styles.badgeAbsent
        ]}>
          <Text style={[
            styles.statusText, 
            isPresent && styles.textPresent, 
            isAbsent && styles.textAbsent
          ]}>
            {item.status}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Info Matkul */}
      <View style={styles.headerInfo}>
        <Text style={styles.matkulCode}>{idMatkul}</Text>
        <Text style={styles.matkulName}>{namaMatkul}</Text>
      </View>

      {/* List History Pertemuan */}
      <FlatList
        data={listPertemuan}
        keyExtractor={(item) => item.id}
        renderItem={renderSesi}
        contentContainerStyle={styles.listContainer}
      />

      {/* Tombol Mengambang untuk Scan QR Sesi Hari Ini */}
      <TouchableOpacity 
        style={styles.floatingScanButton}
        onPress={() => navigation.navigate('Scanner', { idMatkul, namaMatkul })}
      >
        <Text style={styles.floatingButtonText}>Scan QR Presensi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  headerInfo: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  matkulCode: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4F46E5',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  matkulName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100, // Ruang ekstra agar tidak tertutup tombol mengambang
  },
  sesiCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 1,
  },
  sesiLeft: {
    flex: 1,
  },
  sesiTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  sesiDate: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F3F4F6', // Default belum presensi
  },
  badgePresent: {
    backgroundColor: '#D1FAE5',
  },
  badgeAbsent: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4B5563',
  },
  textPresent: {
    color: '#065F46',
  },
  textAbsent: {
    color: '#991B1B',
  },
  floatingScanButton: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  floatingButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});