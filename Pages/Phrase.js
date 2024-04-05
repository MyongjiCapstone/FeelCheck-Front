import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function Phrase() {
  return (
    <LinearGradient colors={['skyblue', 'white']} style={styles.container}>
      <View style={styles.pg_top}>
        <Text style={styles.text}>행복은 습관이다, 그것을 몸에 지니라.</Text>
        <Text style={styles.author}>- 허버드</Text>
      </View>
      <View style={styles.pg_bottom}>
        <TouchableOpacity>
          <Text style={styles.btn}>확인</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pg_top: {
    flexDirection: 'row',
    flex: 5,
    justifyContent: 'space-evenly', // 양 옆으로 정렬
    paddingTop: 120,
    paddingHorizontal: 30,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  text: {
    flex: 5,
    fontSize: 50,
    fontWeight: '500',
    color: 'black',
  },
  author: {
    flex: 1,
    fontSize: 30,
    marginBottom: 30,
    fontWeight: '500',
    textAlign: 'right',
  },
  pg_bottom: {
    flex: 2,
    alignItems: 'center',
  },
  btn: {
    fontSize: 40,
    marginVertical: 50,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
  },
});

export default Phrase;
