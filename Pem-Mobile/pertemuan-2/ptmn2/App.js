import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Nama:Ahmad Miftah Hadi Pramana Arsjad</Text>
      <Text>Tempat/Tanggal:Manado/13th February 2007</Text>
      <Text>Cita-cita:Software Engineer/Game Developer</Text>
      <Text>Rencana Hidup:Menjadi pegawai dalam perusahaan software / Game studio di dalam atau luar negeri</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
