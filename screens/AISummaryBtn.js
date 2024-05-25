import { LinearGradient } from 'expo-linear-gradient';
import { Modal, Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native';
import RealCalendarPart from './(main)/RealCalendarPart';
import { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

export default function AISummaryBtn(){

  return(
    <LinearGradient colors={['#9CB7FF', '#DAD1FF']} end={{ x: 0.5, y: 0.6 }} style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topCalender}>
          <CalenderButtonsPart/>
          <View>
            <Text>이 자리에 주차별 띄우기</Text>
          </View>
        </View>
        
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.afterBottomBox}>
          <View style={styles.writtenContentBox}>
            <Text style={styles.writtenContent}>
              일기 요약 버튼을 눌러보세요😊
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
} 
const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const CalenderButtonsPart = () => {
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const changeMonth = (n) => {
    setActiveDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + n);
      return newDate;
    });
  };
  const [activeDate, setActiveDate] = useState(new Date());

  const generateMatrix = () => {
    var matrix = [];
    // Create header
    matrix[0] = weekDays;

    // console.log(weekDays);

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
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }
    let weeks = 0;
    for (let rowIndex = 1; rowIndex < matrix.length; rowIndex++) {
      if (matrix[rowIndex].some(day => day !== -1)) {
        weeks++;
      }
    }
    console.log('weeks: ', weeks)

    return weeks;

  };
  return (
    
    <View style={{ borderRadius: 10, height: hp('8%'), flexDirection: 'row', backgroundColor: '#E6E6E6'}}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Text style={{ marginTop: hp('1.5%'), fontSize: 30, textAlign: 'left', marginLeft: 20 }}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: hp('1.5%'), fontWeight: '600', fontSize: 30, textAlign: 'center', marginLeft: 10 }}>
          {months[activeDate.getMonth()]} &nbsp;
        </Text>
        <TouchableOpacity onPress={() => changeMonth(+1)}>
          <Text style={{ marginTop: hp('1.5%'), fontSize: 30, textAlign: 'left' }}>{'>'}</Text>
        </TouchableOpacity>
        <View style={styles.topPartButtonsContainer}>
          <TouchableOpacity style={styles.topPartButtons}>
            <Entypo name="camera" size={20} color="#888888" />
            <Text style={styles.topPartButtonsText}>기분어때</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topPartButtons}>
            <MaterialCommunityIcons name="robot" size={20} color="#888888" />
            <Text style={styles.topPartButtonsText}>일기요약</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
  },
  top: {
    // backgroundColor: 'white',
    height: hp('60%'),
  },
  topCalender: {
    backgroundColor: 'white',
    height: hp('50%'),
    marginVertical: hp('8.3%'),
    marginHorizontal: wp('5%'),
    borderRadius: 10,
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
    margin:5,
  },
  topPartButtonsText: {
    marginLeft:3,
    fontSize: 15
  }
});
