import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function HistoryScreen({ route, navigation }) {
  const params = route.params;

  // Data tiruan riwayat scan yang sudah tersimpan sebelumnya
  const riwayatPresensi = [
    { id: '1', namaMatkul: 'Mobile Programming', waktu: '25/05/2026 11:02:14', status: 'Hadir' },
    { id: '2', namaMatkul: 'Software Testing', waktu: '25/05/2026 08:00:45', status: 'Hadir' },
    { id: '3', namaMatkul: 'Capstone Project', waktu: '18/05/2026 14:05:22', status: 'Hadir' },
    { id: '4', namaMatkul: 'Mathematic Discreate', waktu: '18/05/2026 08:03:01', status: 'Hadir' },
  ];

  // Jika ada data operan hasil scanning baru dari halaman Scanner, sisipkan ke daftar teratas
  if (params && params.matkulTerpilih) {
    const formatBaru = {
      id: String(new Date().getTime()),
      namaMatkul: params.matkulTerpilih === 'INF301' ? 'Arsitektur Perangkat Lunak' : 'Mata Kuliah Pilihan',
      waktu: `25/05/2026 ${params.timestamp}`,
      status: 'Hadir',
    };
    // Mencegah duplikasi data tiruan saat render ulang biasa
    if (!riwayatPresensi.some(e => e.waktu.includes(params.timestamp))) {
      riwayatPresensi.unshift(formatBaru);
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.historyCard}>
      <View style={styles.leftBorder} />
      <View style={styles.cardBody}>
        <Text style={styles.matkulTitle}>{item.namaMatkul}</Text>
        <Text style={styles.timestampText}>Discan pada: {item.waktu}</Text>
        <View style={styles.rowStatus}>
          <Text style={styles.statusLabel}>Status Verifikasi:</Text>
          <Text style={styles.statusValue}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={riwayatPresensi}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listPadding}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Belum ada riwayat perekaman presensi.</Text>
          </View>
        }
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.backButtonText}>Kembali ke Beranda</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  listPadding: {
    padding: 16,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    marginBottom: 12,
    elevation: 1,
    overflow: 'hidden',
  },
  leftBorder: {
    width: 6,
    backgroundColor: '#10B981', // Garis hijau penanda sukses hadir
  },
  cardBody: {
    flex: 1,
    padding: 16,
  },
  matkulTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  timestampText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  rowStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 8,
  },
  statusLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  statusValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#10B981',
    marginLeft: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#9CA3AF',
  },
  backButton: {
    backgroundColor: '#4F46E5',
    margin: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});