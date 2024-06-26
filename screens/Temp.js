import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function Temp({ navigation }) {
  return (
    <View style={{ marginTop: 100 }}>
      <Text>안녕하세요 로그인 페이지입니다.</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Phrase', {emotion: 'Happy'})}>
        <Text style={styles.size}>여길 누르면 Phrase로 이동</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MainNav', {emotion:'Happy'})}>
        <Text style={styles.size}>여길 누르면 메인페이지로 이동</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Logo')}>
        <Text style={styles.size}>여길 누르면 맨처음 로딩 화면으로 이동</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('EmotionCamera')}>
        <Text style={styles.size}>여길 누르면 카메라 테스트</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AISummaryBtn')}>
        <Text style={styles.size}>AI 요약 버튼 눌렀을 때는?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Logo')}>
        <Text style={[styles.size, {color:'blue', marginTop: 30, fontSize:40, fontWeight:600}]}>실제 APP 테스트</Text>
      </TouchableOpacity>
    </View>
  );
}

styles = StyleSheet.create({
  size: {
    fontSize: 30,
  },
});
