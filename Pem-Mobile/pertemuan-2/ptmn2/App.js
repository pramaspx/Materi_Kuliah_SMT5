import { useState, useRef, useEffect } from 'react';
  import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
  Animated,
  KeyboardAvoidingView,
  } from 'react-native';
  const PROFILE= {
    name: 'Ahmad Miftah Hadi Pramana Arsjad',
    title: 'Full-Stack Developer',
    email:'arsjadprama@gmail.com',
    phone:'0813-4027-1516',
    location:'Cirebon, West Java',
    bio: 'Current University Student, looking for more experience',
    avatar:'https://w7.pngwing.com/pngs/218/926/png-transparent-stick-man-stick-figure-happy-stick-man-photography-smiley-desktop-wallpaper-thumbnail.png',
    avataroffline:'../assets/favicon.png'
  };
  const SKILLS= [
    {id:'1', name:'React Native', level:90, color:'#61DAFB'},
    {id:'2', name:'Flutter', level:75, color:'#3735c8'},
    {id:'3', name:'JavaScript', level:88, color:'#B822EE'},
    {id:'4', name:'TypeScript', level:89, color:'#27F56C'},
    {id:'5', name:'FireBase', level:95, color:'#47ce35'},
    {id:'6', name:'Python', level:78, color:'#291acf'},
    {id:'7', name:'C++', level:60, color:'#bc2161'},
    {id:'8', name:'Java', level:68, color:'#18d4ab'}
  ];
  const SECTIONS=[
    {title:'💼 Pengalaman Kerja',
      data:[
      {
        id: 'e1',
        role:'Senior Mobile Developer',
        company:'PT.Mobile Solutions',
        period:'2022-Sekarang',
        desc:'Memimpin tim 5 orang developer dalam mnegmbangkan aplikasi'
      },
      {
        id:'e2',
        role:'Mobile Developer',
        company:'PT. Inovasi Digital',
        period:'2020-2022',
        desc:'Membuat aplikasi rancangan klien bersama tim'
      },
      {
        id:'e3',
        role:'Junior QA',
        company:'Paradoxum Games',
        period:'2019-2020',
        desc:'Melakukan testing untuk sebuah game'
      }
      
    ]
    },
    
    {title:'🎓 Pendidikan',
      data:[
        {
          id:'d1',
          role:'S1 Informatika',
          company:'Universitas Islam Negeri Siber Syekh Nurjati Cirebon',
          period:'2024-2029',
          desc:'Pengembangan Aplikasi Crash Warning untuk Membantu orang buta'
        },
        {
          id:'d2',
          role:'S2 Informatika',
          company:'Institut Teknologi Bandung',
          period:'2030-2034',
          desc:'Pengembangan Security Malware dengan Reverse'
        }
      
    ]
    },
    
  ];
  const SOCIAL=[
    {id:'1', label:'GitHub', icon:'🐈‍⬛', url:'https://github.com/pramaspx'},
    {id:'2', label:'Instagram', icon:'📷', url:'https://www.instagram.com/pra_no_ma/'},
    {id:'3', label:'Youtube', icon:'▶️', url:'https://www.youtube.com/channel/UCfkF13xszSrn4D0-aTpiAag'}
  ]
// ============================================
//  SUB-COMPONENTS
// ============================================
const SkillCard = ({ item }) => (
  <View style={styles.skillCard}>
    <View style={styles.skillHeader}>
      <Text style={styles.skillName}>{item.name}</Text>
      <Text style={styles.skillPercent}>{item.level}%</Text>
    </View>
    <View style={styles.progressBg}>
      <View style={[styles.progressFill, { width: `${item.level}%`, backgroundColor: item.color }]} />
    </View>
  </View>
);

const TimelineCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.timelineCard} onPress={() => onPress(item)} activeOpacity={0.8}>
    <View style={styles.timelineDot} />
    <View style={styles.timelineContent}>
      <Text style={styles.timelineRole}>{item.role}</Text>
      <Text style={styles.timelineCompany}>{item.company}</Text>
      <Text style={styles.timelinePeriod}>{item.period}</Text>
      <Text style={styles.timelineHint}>Ketuk untuk melihat detail</Text>
    </View>
  </TouchableOpacity>
);

// ============================================
//  MAIN APP
// ============================================
export default function App() {
  // — STATE ————————————————————————————————
  const [openToWork, setOpenToWork] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [activeTab, setActiveTab] = useState('Info');

  // — ANIMASI AVATAR (Animated API) ——————————
  const avatarScale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(avatarScale, { toValue: 1.08, duration: 800, useNativeDriver: true }),
        Animated.timing(avatarScale, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [avatarScale]);

  // — HANDLER FUNCTIONS ————————————————————
  const handleCardPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleSend = () => {
    if (!senderName.trim() || !message.trim()) {
      Alert.alert('⚠️ Peringatan', 'Nama dan pesan tidak boleh kosong!');
      return;
    }
    setSending(true);
    const currentName = senderName;
    setTimeout(() => {
      setSending(false);
      setSenderName('');
      setMessage('');
      Alert.alert('✅ Berhasil', `Pesan dari ${currentName} telah terkirim!`);
    }, 2000);
  };

  // — TAB NAVIGATION (TouchableOpacity) ————————
  const renderTabButton = (tabName, icon) => {
    const isActive = activeTab === tabName;
    return (
      <TouchableOpacity
        style={[styles.tabButton, isActive && styles.tabButtonActive]}
        onPress={() => setActiveTab(tabName)}
        activeOpacity={0.8}
      >
        <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{icon} {tabName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      {/* ── HEADER BAR ── */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>My CV</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>{openToWork ? '🟢 Open to Work' : '🔴 Not Available'}</Text>
          <Switch
            value={openToWork}
            onValueChange={setOpenToWork}
            thumbColor={openToWork ? '#4ade80' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#16a34a' }}
          />
        </View>
      </View>

      {/* ── TAB NAVIGATION: Info / Skills / Kontak ── */}
      <View style={styles.tabContainer}>
        {renderTabButton('Info', '👤')}
        {renderTabButton('Skills', '🔧')}
        {renderTabButton('Kontak', '📩')}
      </View>

      {/* ── KeyboardAvoidingView agar form tidak tertutup keyboard ── */}
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ════════════════════ TAB INFO ════════════════════ */}
          {activeTab === 'Info' && (
            <>
              <View style={styles.profileSection}>
                {/* Avatar dengan animasi pulse (Animated API) */}
                <Animated.View style={{ transform: [{ scale: avatarScale }] }}>
                  <Image source={{ uri: PROFILE.avatar }} style={styles.avatar} />
                </Animated.View>

                {openToWork && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>✅ Open to Work</Text>
                  </View>
                )}

                <Text style={styles.profileName}>{PROFILE.name}</Text>
                <Text style={styles.profileTitle}>{PROFILE.title}</Text>
                <Text style={styles.profileBio}>{PROFILE.bio}</Text>

                <View style={styles.contactRow}>
                  <Text style={styles.contactItem}>📧 {PROFILE.email}</Text>
                  <Text style={styles.contactItem}>📍 {PROFILE.location}</Text>
                  <Text style={styles.contactItem}>📱 {PROFILE.phone}</Text>
                </View>

                {/* Tombol sosial media — Tap → Alert URL */}
                <View style={styles.socialRow}>
                  {SOCIAL.map((s) => (
                    <TouchableOpacity
                      key={s.id}
                      style={styles.socialBtn}
                      onPress={() => Alert.alert('🔗 Link', s.url)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.socialIcon}>{s.icon}</Text>
                      <Text style={styles.socialLabel}>{s.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Tombol Download CV — efek tekan + Alert */}
                <Pressable
                  style={({ pressed }) => [styles.downloadBtn, pressed && styles.downloadBtnPressed]}
                  onPressIn={() => setPressing(true)}
                  onPressOut={() => setPressing(false)}
                  onPress={() => Alert.alert('📥 Download', 'CV sedang diunduh...')}
                >
                  <Text style={styles.downloadBtnText}>
                    {pressing ? '⏳ Mengunduh...' : '📥 Download CV (PDF)'}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.sectionBox}>
                <Text style={styles.sectionTitle}>📋 Riwayat</Text>
                <Text style={styles.sectionSubtitle}>Ketuk kartu untuk melihat detail</Text>
                <SectionList
                  sections={SECTIONS}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <TimelineCard item={item} onPress={handleCardPress} />}
                  renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionHeaderText}>{title}</Text>
                    </View>
                  )}
                  scrollEnabled={false}
                  ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                  SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
                />
              </View>
            </>
          )}

          {/* ════════════════════ TAB SKILLS ════════════════════ */}
          {activeTab === 'Skills' && (
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>🔧 Keahlian</Text>
              <Text style={styles.sectionSubtitle}>Daftar kemampuan yang dikuasai</Text>
              <FlatList
                data={SKILLS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <SkillCard item={item} />}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              />
            </View>
          )}

          {/* ════════════════════ TAB KONTAK ════════════════════ */}
          {activeTab === 'Kontak' && (
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>📩 Hubungi Saya</Text>
              <Text style={styles.sectionSubtitle}>Isi form berikut untuk mengirim pesan</Text>

              <Text style={styles.inputLabel}>Nama</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Nama Anda"
                placeholderTextColor="#888"
                value={senderName}
                onChangeText={setSenderName}
                returnKeyType="next"
                editable={!sending}
              />

              <Text style={styles.inputLabel}>Pesan</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Tulis pesan Anda di sini..."
                placeholderTextColor="#888"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                editable={!sending}
              />

              {/* Kirim: loading 2 detik lalu Alert sukses; kosong → Alert peringatan */}
              {sending ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator size="large" color={COLORS.accent} />
                  <Text style={styles.loadingText}>Mengirim pesan...</Text>
                </View>
              ) : (
                <Button title="📨 Kirim Pesan" color={COLORS.accent} onPress={handleSend} />
              )}
            </View>
          )}

          <View style={{ height: 50 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ════════════════════ MODAL DETAIL RIWAYAT ════════════════════ */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.role}</Text>
                <Text style={styles.modalCompany}>{selectedItem.company}</Text>
                <Text style={styles.modalPeriod}>📅 {selectedItem.period}</Text>
                <View style={styles.modalDivider} />
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>
              </>
            )}
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setModalVisible(false)} activeOpacity={0.8}>
              <Text style={styles.modalCloseBtnText}>✕ Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ============================================
//  PALET WARNA
// ============================================
const COLORS = {
  bg: '#0f0f1a',
  card: '#1a1a2e',
  cardBorder: '#2d2d44',
  accent: '#7c3aed',
  accentLight: '#a78bfa',
  accentGold: '#f59e0b',
  text: '#f0f0f0',
  textMuted: '#9ca3af',
  textDim: '#6b7280',
  success: '#4ade80',
  white: '#ffffff',
};

// ============================================
//  STYLESHEET
// ============================================
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  keyboardContainer: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingTop: 10 },
  headerBar: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: { color: COLORS.white, fontSize: 18, fontWeight: '700', letterSpacing: 0.5 },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  switchLabel: { color: COLORS.textMuted, fontSize: 12, fontWeight: '600' },
  // — Tab Navigation —
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16213e',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  tabButtonActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  tabText: { color: COLORS.textMuted, fontSize: 13, fontWeight: '600' },
  tabTextActive: { color: COLORS.white, fontWeight: '800' },
  // — Profile —
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: COLORS.card,
    marginBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomWidth: 2,
    borderColor: COLORS.accent,
  },
  avatar: { width: 110, height: 110, borderRadius: 55, borderWidth: 3, borderColor: COLORS.accent, marginBottom: 8 },
  badge: {
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: { color: COLORS.success, fontSize: 12, fontWeight: '700' },
  profileName: { color: COLORS.white, fontSize: 26, fontWeight: '800', textAlign: 'center' },
  profileTitle: { color: COLORS.accentLight, fontSize: 14, fontWeight: '600', marginTop: 4, marginBottom: 14, textAlign: 'center' },
  profileBio: { color: COLORS.textMuted, fontSize: 13, lineHeight: 20, textAlign: 'center', marginBottom: 16, paddingHorizontal: 8 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 6 },
  contactItem: { color: COLORS.textMuted, fontSize: 12, textAlign: 'center', marginBottom: 4 },
  // — Social —
  socialRow: { flexDirection: 'row', gap: 12, marginTop: 16, marginBottom: 20 },
  socialBtn: {
    alignItems: 'center',
    backgroundColor: '#16213e',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  socialIcon: { fontSize: 20, marginBottom: 4 },
  socialLabel: { color: COLORS.accentLight, fontSize: 11, fontWeight: '600' },
  // — Download —
  downloadBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 50,
    elevation: 4,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  downloadBtnPressed: { backgroundColor: '#5b21b6' },
  downloadBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },
  // — Section box —
  sectionBox: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sectionTitle: { color: COLORS.white, fontSize: 17, fontWeight: '700', marginBottom: 4 },
  sectionSubtitle: { color: COLORS.textDim, fontSize: 11, fontStyle: 'italic', marginBottom: 16 },
  sectionHeader: {
    backgroundColor: '#0f172a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  sectionHeaderText: { color: COLORS.accentLight, fontWeight: '700', fontSize: 13 },
  // — Skill card —
  skillCard: { backgroundColor: '#16213e', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: COLORS.cardBorder },
  skillHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  skillName: { color: COLORS.text, fontWeight: '600', fontSize: 13 },
  skillPercent: { color: COLORS.accentLight, fontWeight: '700', fontSize: 13 },
  progressBg: { height: 6, backgroundColor: '#0f172a', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 4 },
  // — Timeline card —
  timelineCard: { flexDirection: 'row', backgroundColor: '#16213e', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: COLORS.cardBorder },
  timelineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.accent, marginTop: 4, marginRight: 12 },
  timelineContent: { flex: 1 },
  timelineRole: { color: COLORS.white, fontWeight: '700', fontSize: 14, marginBottom: 2 },
  timelineCompany: { color: COLORS.accentLight, fontSize: 13, marginBottom: 2 },
  timelinePeriod: { color: COLORS.textMuted, fontSize: 11, marginBottom: 6 },
  timelineHint: { color: COLORS.accentGold, fontSize: 11, fontStyle: 'italic' },
  // — Inputs —
  inputLabel: { color: COLORS.textMuted, fontSize: 12, fontWeight: '600', marginBottom: 6, marginTop: 4 },
  textInput: {
    backgroundColor: '#0f172a',
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    marginBottom: 14,
  },
  textArea: { minHeight: 120, textAlignVertical: 'top' },
  // — Loading —
  loadingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, gap: 12 },
  loadingText: { color: COLORS.textMuted, fontSize: 13 },
  // — Modal —
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalBox: { backgroundColor: COLORS.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, borderWidth: 1, borderColor: COLORS.cardBorder },
  modalTitle: { color: COLORS.white, fontSize: 20, fontWeight: '800', marginBottom: 6 },
  modalCompany: { color: COLORS.accentLight, fontSize: 15, fontWeight: '600', marginBottom: 8 },
  modalPeriod: { color: COLORS.textMuted, fontSize: 13 },
  modalDivider: { height: 1, backgroundColor: COLORS.cardBorder, marginVertical: 16 },
  modalDesc: { color: COLORS.text, fontSize: 14, lineHeight: 22, marginBottom: 20 },
  modalCloseBtn: { backgroundColor: COLORS.accent, paddingVertical: 13, borderRadius: 12, alignItems: 'center' },
  modalCloseBtnText: { color: COLORS.white, fontSize: 14, fontWeight: '700' },
});