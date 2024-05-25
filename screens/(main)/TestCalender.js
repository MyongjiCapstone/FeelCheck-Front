import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TestCalenderComponent from './TestCalenderComponent';
import useDiary from '../../hook/usediary';

export default function Calender({route}) {
  // Emotion has Successful Recognized
  // const emotion = route.params.emotion;
  const {writeDiary} = useDiary();
  const [written, setWritten] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');

  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate().toString().padStart(2, '0');
  const dateString = `${year}-${month}-${day}`
  const dateYearMonth = `${year}-${month}`
  const [selectedDate, setSelectedDate] = useState(dateString);
  const [selectedWeek, setSelectedWeek] = useState();
  const [diaryData, setDiaryData] = useState({1:{}, 2:{}, 3:{}, 4:{}});
  const onChangeText = (inputText) => {
    setText(inputText);
  };
  const handleDiaryWrite = () => {
    writeDiary(selectedDate, text).then(res=>setDiaryData(res));
    setModalVisible(!modalVisible);
    setText("");
  }
  return (
    <LinearGradient
      colors={['#9CB7FF', '#DAD1FF']}
      end={{ x: 0.5, y: 0.6 }}
      style={styles.container}
    >
      <View style={styles.top}>
        <View style={styles.topCalender}>
          <TestCalenderComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate} setDiaryData={setDiaryData} setSelectedWeek={setSelectedWeek} diaryData={diaryData}/>
        </View>
      </View>
      <View style={styles.bottom}>
        {diaryData[selectedWeek]?.[selectedDate] ? (
          <TouchableOpacity style={styles.afterBottomBox}>
            {/* 이게 클릭되면 언제 작성됐는지에 대한 정보와 수정 및 삭제할 수 있는 버튼 띄우기 */}
            <View style={styles.writtenContentBox}>
              <Text style={styles.writtenContent}>
                {diaryData[selectedWeek][selectedDate]}
              </Text>
            </View>
          </TouchableOpacity>
        ):(
          <View style={styles.bottomBox}>
            <Text style={styles.bottomBoxText}>아직 기록된 일기가 없어요</Text>
            <TouchableOpacity
              style={styles.writeTextBtn}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.writeTextBtnText}>일기 쓰기</Text>
            </TouchableOpacity>
          </View>
        ) }
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalTextView}>
              <TextInput
                onChangeText={onChangeText}
                value={text}
                placeholder="일기를 입력하세요"
                placeholderTextColor={'grey'}
                style={styles.input}
                multiline
              />
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
                onPress={handleDiaryWrite}
                // onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={{ ...styles.textStyle, color: 'white' }}>
                  작성 완료
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
  },
  top: {
    // backgroundColor: 'blue',
  },
  topCalender: {
    backgroundColor: 'white',
    paddingBottom: hp('1%'),
    marginTop: hp('7%'),
    marginBottom: hp('3%'),
    marginHorizontal: wp('5%'),
    borderRadius: 4,
  },
  bottom: {
    backgroundColor: 'white', flex:1, justifyContent:'center', marginBottom:20
  },
  bottomBox: {
    borderRadius: 10,
    flexDirection: 'column',
    alignItems:'center'
  },
  bottomBoxText: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
  },
  writeTextBtn: {
    backgroundColor: 'lightgray',
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal: hp('4%'),
    paddingVertical: hp('2%'),
    borderRadius: 10,
    marginTop: hp('4.1%'),
    marginBottom: hp('3%')
  },
  writeTextBtnText: {
    color: 'white',
    fontSize: 23,
    fontWeight: '500',
  },
  afterBottomBox: {
    height: hp('28%'),
    marginHorizontal: wp('5%'),
    marginVertical: hp('2.3%'),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  writtenContentBox: {
    marginVertical: hp('2.3%'),
    marginHorizontal: wp('5%'),
  },
  writtenContent: {
    fontSize: 22,
    fontWeight: '400',
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
  modalTextView: {
    marginBottom: hp('6%'),
    borderWidth: 1,
  },
  input: {
    color: 'black',
    height: hp('41.2%'),
    width: wp('61.3%'),
    marginVertical: hp('1.2%'),
    marginHorizontal: wp('2.5%'),
    fontSize: 18,
  },
  modalButton: {
    borderRadius: 10,
    paddingVertical: hp('1.4%'),
    paddingHorizontal: wp('3.1%'),
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
});
