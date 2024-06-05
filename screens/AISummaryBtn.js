import { LinearGradient } from 'expo-linear-gradient';
import { Modal, Text, TextInput, TouchableOpacity, StyleSheet, View, Button } from 'react-native';
import { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useDiary from '../hook/usediary';
import Loading from './Loading';

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
  const {aiDiarySummary, aiComment} = useDiary();
  const [summaryText, setSummaryText] = useState("일기 요약 버튼을 눌러보세요😊");
  const [aiCommentText, setAiCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState();
  const handleSummary = async(date, week) => {
    setLoading(true);
    setSelectedWeek(week);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
    const yearMonth = `${year}-${month}`;
    const item = JSON.parse(await AsyncStorage.getItem(yearMonth));
    if(!item) {
      setSummaryText("일기가 존재하지 않아요!")
      setAiCommentText("");
      setLoading(false);
      return
    }
    if(!item[week]) {
      setSummaryText("일기가 존재하지 않아요!")
      setAiCommentText("");
      setLoading(false);
      return
    }
    let diarys = [];
    Object.keys(item[week]).map(date => {
      if (item[week][date].text) diarys.push(item[week][date].text);
    })
    aiDiarySummary(diarys).then(res => {
      if (!res) {
        setSummaryText("일기가 존재하지 않아요!");
        setLoading(false);
      } else{
        setSummaryText(res);
        aiComment(res).then(res=>{
          setAiCommentText(res);
        })
        setLoading(false);
      }
    })
  }
  const renderWeeks = () => {
    const weeks = calculateWeeks();
    const weekTexts = [];
    for (let i = 1; i <= weeks; i++) {
      weekTexts.push(
        <View key={i}  style={{flexDirection:'row', justifyContent:'space-between', padding:5, width:wp('80%'), borderRadius:5, backgroundColor:'#FFFFFF', marginVertical:4}}>
          {/* <Text>😊</Text> 여기에 해당하는 감정 이모지 넣을 것 */}
          <Text style={{fontSize:26, marginHorizontal:10}}>{i}주차</Text>
          <TouchableOpacity onPress={()=>handleSummary(activeDate, i)} style={selectedWeek===i ? {backgroundColor:'#676767', borderRadius:5, padding:10}:{backgroundColor:'#B7B7B7', borderRadius:5, padding:10}}>
            <Text style={{fontSize:15, color:'white'}}>일기 요약</Text>
          </TouchableOpacity>
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
    const handleBackButton = () => {
      navigation.goBack();
    }
    return (
        <>
            <TouchableOpacity onPress={handleCameraButton} style={{ backgroundColor: 'white', padding: 5, borderRadius: 10, elevation: 3, flexDirection: 'row' }}>
                <Entypo name="camera" size={20} color="#888888" />
                <Text style={{ marginLeft: 3 }}>기분어때</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBackButton} style={{ backgroundColor: 'white', padding: 6, marginLeft: 10, borderRadius: 10, elevation: 3, flexDirection: 'row' }}>
                <MaterialCommunityIcons name="arrow-left" size={20} color="#888888" />
                <Text style={{ marginLeft: 3 }}>돌아가기</Text>
            </TouchableOpacity>
        </>
    )
  }

  return(
    <LinearGradient colors={['#9CB7FF', '#DAD1FF']} end={{ x: 0.5, y: 0.6 }} style={styles.container}>
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
        <View style={{backgroundColor:'#F4F4F4', paddingVertical: 5, justifyContent:'center', alignItems:'center'}}>
          {renderWeeks()}
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.afterBottomBox}>
          <View style={styles.writtenContentBox}>
            {loading ? (
              <Loading/>
            ) : (
              <>
                <Text style={styles.writtenContent}>
                  {summaryText}
                </Text>
                <Text style={{ color: '#6891F8', fontSize: 16 }}>
                  {aiCommentText}
                </Text>
              </>
            )}
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
  topCalender: {
    backgroundColor: 'white',
    marginTop: hp('7%'),
    marginBottom: hp('3%'),
    marginHorizontal: wp('5%'),
    borderRadius: 10,
  },
  calendarHeader: {
    flexDirection: 'row',
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    height:hp('7%')
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
    flex:1,
    marginVertical: hp('2.3%'),
    marginHorizontal: wp('5%'),
    justifyContent:'center', alignItems:'center'
  },
  writtenContent: {
    fontSize: 16,
    fontWeight: '400',
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
