import { Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function Login({ navigation }) {
  return (
    <View>
      <Text>안녕하세요 로그인 페이지입니다.</Text>
      <View
        style={{ width: hp('30%'), height: hp('30%'), backgroundColor: 'red' }}
      >
        <Text>안녕</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Phrase')}>
        <Text>여길 누르면 Phrase로 이동</Text>
      </TouchableOpacity>
    </View>
  );
}
