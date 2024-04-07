import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function Phrase() {
  const [modalVisible, setModalVisible] = useState(false);
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

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalTextTitleView}>
              <Text style={styles.modalTextTitle}>안 내</Text>
            </View>
            <View style={styles.modalTextView}>
              <Text style={styles.modalText}>
                오늘은 이미 기분을 등록했어요. 새롭게 업데이트 하시겠어요?
              </Text>
            </View>
            <View style={styles.modalButtonView}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { ...styles.modalButtonClose, backgroundColor: 'lightgrey' },
                ]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={{ ...styles.textStyle, color: 'white' }}>
                  업데이트
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.modalButton, styles.modalButtonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableOpacity>
    </LinearGradient>
    //만약 이미 기분이 등록되어있다면 확인을 눌렀을 때 모달 창 띄우기
    // 그러니까 마지막 TouchableOpacity 부분은 나중에 없앨 것.(특히 onPress시 setModalVisible(true)부분 기억할 것.)
  );
}
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
  },
  pg_top: {
    flexDirection: 'row',
    flex: hp('70%'),
    justifyContent: 'space-evenly', // 양 옆으로 정렬
    paddingTop: hp('15%'),
    paddingHorizontal: wp('8%'),
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  text: {
    flex: hp('80%'),
    fontSize: 50,
    fontWeight: '500',
    color: 'black',
  },
  author: {
    flex: hp('20%'),
    fontSize: 30,
    marginBottom: wp('8%'),
    fontWeight: '500',
    textAlign: 'right',
  },
  pg_bottom: {
    flex: hp('30%'),
    alignItems: 'center',
  },
  btn: {
    fontSize: 40,
    marginVertical: wp('5%'),
    paddingVertical: wp('2.5%'),
    paddingHorizontal: wp('8%'),
    borderRadius: 30,
    borderWidth: 1,
  },
  centeredView: {
    flex: hp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  modalView: {
    margin: wp('5%'),
    backgroundColor: 'white',
    borderRadius: 30,
    padding: hp('4%'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: wp('0%'),
      height: hp('0.4%'),
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonView: {
    flexDirection: 'row',
  },
  modalButton: {
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    marginHorizontal: wp('6%'),
  },
  modalButtonOpen: {
    backgroundColor: '#F194FF',
  },
  modalButtonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  modalTextTitleView: {
    marginTop: hp('2%'),
    marginBottom: hp('3%'),
  },
  modalTextTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalTextView: {
    marginBottom: hp('2%'),
  },
  modalText: {
    marginBottom: hp('2%'),
    textAlign: 'center',
    fontSize: 22,
  },
});

export default Phrase;
