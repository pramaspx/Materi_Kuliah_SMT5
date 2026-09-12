import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Ahmad Miftah Hadi Pramana Arsjad</Text>
      <Text>Manado/13th February 2007</Text>
      <Text>Software Engineer/Game Developer</Text>
      <Text>Menjadi pegawai dalam perusahaan software / Game studio di dalam atau luar negeri</Text>
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
