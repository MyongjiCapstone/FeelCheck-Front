import { LinearGradient } from 'expo-linear-gradient';
import { Modal, Text, TextInput, TouchableOpacity, StyleSheet, View, Button } from 'react-native';
import { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AISummaryBtn(){
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const [activeDate, setActiveDate] = useState(new Date());

  const changeMonth = (n) => {
    setActiveDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + n);
      return newDate;
    });
  };

  const generateMatrix = () => {
    var matrix = [];
    matrix[0] = weekDays;

    var year = activeDate.getFullYear();
    var month = activeDate.getMonth();
    var firstDay = new Date(year, month, 1).getDay();

    var maxDays = nDays[month];
    if (month === 1) {
      // 2월이 윤년인 경우
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        maxDays += 1;
      }
    }

    var counter = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row === 1 && col >= firstDay) {
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          matrix[row][col] = counter++;
        }
      }
    }
    return matrix;
  };
    
  const calculateWeeks = () => {
    const matrix = generateMatrix();
    let weeks = 0;
    for (let rowIndex = 1; rowIndex < matrix.length; rowIndex++) {
      if (matrix[rowIndex].some(day => day !== -1)) {
        weeks++;
      }
    }
    return weeks;
  };
  const renderWeeks = () => {
    const weeks = calculateWeeks();
    const weekTexts = [];
    for (let i = 1; i <= weeks; i++) {
      weekTexts.push(
      <View style={{padding:'10', flex:1}}>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:'auto', marginVertical:'auto', padding:5, width:wp('80%'), borderRadius:5, backgroundColor:'#9CB7FF'}}>
          {/* <Text>😊</Text> 여기에 해당하는 감정 이모지 넣을 것 */}
          <Text key={i} style={{fontSize:30, marginHorizontal:10}}>{i}주차</Text>
          <TouchableOpacity style={{backgroundColor:'#DAD1FF', borderRadius:5, padding:10}}>
            <Text style={{fontSize:17}}>일기 요약</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    }
    return weekTexts;
  };

  const CalenderButtons = () => {
    const navigation = useNavigation();
    const handleCameraButton = () => {
        navigation.replace('EmotionCamera');
    }
    return (
        <>
            <TouchableOpacity onPress={handleCameraButton} style={{ backgroundColor: 'white', padding: 5, borderRadius: 10, elevation: 3, flexDirection: 'row' }}>
                <Entypo name="camera" size={20} color="#888888" />
                <Text style={{ marginLeft: 3 }}>기분어때</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'white', padding: 6, marginLeft: 10, borderRadius: 10, elevation: 3, flexDirection: 'row' }}>
                <MaterialCommunityIcons name="arrow-left" size={20} color="#888888" />
                <Text style={{ marginLeft: 3 }}>돌아가기</Text>
            </TouchableOpacity>
        </>
    )
  }

  return(
    <LinearGradient colors={['#9CB7FF', '#DAD1FF']} end={{ x: 0.5, y: 0.6 }} style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topCalender}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={() => changeMonth(-1)}>
            <AntDesign name="left" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.calendarMonth}>
              {months[activeDate.getMonth()]}
            </Text>
            <TouchableOpacity onPress={() => changeMonth(1)}>
              <AntDesign name="right" size={20} color="black" />
            </TouchableOpacity>
            <View style={styles.calendarButtonsContainer}>
              <CalenderButtons/>
            </View>
          </View>
          <View style={{flex:1}}>
            {renderWeeks()}
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.afterBottomBox}>
          <View style={styles.writtenContentBox}>
            <Text style={styles.writtenContent}>
              일기 요약 버튼을 눌러보세요😊
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
} 

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
  },
  top: {
    height: hp('60%'),
  },
  topCalender: {
    backgroundColor: 'white',
    height: hp('50%'),
    marginVertical: hp('8.3%'),
    marginHorizontal: wp('5%'),
    borderRadius: 10,
  },
  calendarHeader: {
    flexDirection: 'row',
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    height:hp('5.2%')
  },
  calendarMonth: {
    // fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
  },
  calendarButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottom: {
    backgroundColor: 'white',
    height: hp('40%'),
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
    textAlign: 'center',
  },
  topPartButtonsContainer: {
    flexDirection: 'row',
  },
  topPartButtons: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    margin: 5,
  },
  topPartButtonsText: {
    marginLeft: 3,
    fontSize: 15,
  }
});
