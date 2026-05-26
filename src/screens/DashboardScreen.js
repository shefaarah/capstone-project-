import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function DashboardScreen({ route, navigation }) {
  // Menangkap parameter NIM dari halaman login, atau pakai NIM default jika kosong
  const { userNim } = route.params || { userNim: '2200016000' };

  // Data simulasi mata kuliah hari ini sesuai dengan berkas kebutuhan sistem kampus
  const matkulHariIni = [
    { id: 'INF301', nama: 'Capstone Project', jam: '08:00 - 10:30', ruang: 'Lab Computer', hadir: 11, total: 12 },
    { id: 'INF305', nama: 'Mobile Programming', jam: '11:00 - 13:30', ruang: 'SW706', hadir: 9, total: 12 },
    { id: 'INF309', nama: 'Software Testing', jam: '14:00 - 16:30', ruang: 'J.Inter1', hadir: 12, total: 12 },
  ];

  return (
    <View style={styles.mainWrapper}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollPadding}>
        {/* Banner Informasi Ringkas Profil Mahasiswa */}
        <View style={styles.profileBanner}>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.studentName}>Ms. XYZ</Text>
          {/* Teks NIM otomatis mengikuti yang diinput saat login */}
          <Text style={styles.studentId}>NIM. {userNim}</Text>
        </View>

        {/* Kartu Ringkasan Persentase Kehadiran Global */}
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>All Status</Text>
          <View style={styles.rowStats}>
            <View>
              <Text style={styles.bigPercent}>88.8%</Text>
              <Text style={styles.statsSub}>Total Precentage </Text>
            </View>
            <View style={styles.badgeEligible}>
              <Text style={styles.badgeText}>Required for Exam(≥75%)</Text>
            </View>
          </View>
        </View>

        {/* Judul Konten Pembagi */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>History Class </Text>
          <TouchableOpacity onPress={() => navigation.navigate('History')}>
            <Text style={styles.linkText}>Show All</Text>
          </TouchableOpacity>
        </View>

        {/* Perulangan Data Mata Kuliah */}
        {matkulHariIni.map((item) => {
          const persentase = ((item.hadir / item.total) * 100).toFixed(0);
          const isWarning = persentase < 75;

          return (
            <View key={item.id} style={styles.matkulCard}>
              <View style={styles.matkulInfo}>
                <Text style={styles.matkulCode}>{item.id}</Text>
                <Text style={styles.matkulName}>{item.nama}</Text>
                <Text style={styles.matkulDetails}>{item.jam} • {item.ruang}</Text>
                <Text style={[styles.matkulAttendance, isWarning && { color: '#EF4444' }]}>
                  Attendance: {item.hadir}/{item.total} Sesi ({persentase}%)
                </Text>
              </View>
              
              {/* Tombol ke Detail untuk melihat list Present/Absent per pertemuan */}
              <TouchableOpacity 
                style={styles.detailButton}
                onPress={() => navigation.navigate('DetailMatkul', { idMatkul: item.id, namaMatkul: item.nama })}
              >
                <Text style={styles.detailButtonText}>Detail</Text> 
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {/* TOMBOL SCAN QR UNIVERSAL DI BAGIAN BAWAH DASHBOARD */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity 
          style={styles.universalScanButton}
          onPress={() => navigation.navigate('Scanner', { mode: 'universal' })}
        >
          <Text style={styles.universalScanButtonText}>Scan QR Attendance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  container: {
    flex: 1,
  },
  scrollPadding: {
    paddingBottom: 100,
  },
  profileBanner: {
    backgroundColor: '#4F46E5',
    padding: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 16,
  },
  welcomeText: {
    color: '#E0E7FF',
    fontSize: 14,
  },
  studentName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 2,
  },
  studentId: {
    color: '#E0E7FF',
    fontSize: 14,
    marginTop: 4,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '600',
    marginBottom: 8,
  },
  rowStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bigPercent: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10B981',
  },
  statsSub: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  badgeEligible: {
    backgroundColor: '#D1FAE5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 99,
  },
  badgeText: {
    color: '#065F46',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  linkText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '500',
  },
  matkulCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  matkulInfo: {
    flex: 1,
    paddingRight: 12,
  },
  matkulCode: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#4F46E5',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  matkulName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  matkulDetails: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  matkulAttendance: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
    marginTop: 6,
  },
  detailButton: {
    backgroundColor: '#EEF2FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  detailButtonText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  universalScanButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  universalScanButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});