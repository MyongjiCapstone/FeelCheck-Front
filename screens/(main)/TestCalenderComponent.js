import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Touchable } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function TestCalenderComponent() {
    LocaleConfig.locales['kr'] = {
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        today: "오늘"
    }; LocaleConfig.defaultLocale = 'kr';
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = date.getDate().toString().padStart(2, '0');
    const dateString = `${year}-${month}-${day}`

    const [selectedDate, setSelectedDate] = useState(dateString);
    
    const handleDayPress = (day) => {
        console.log(day);
        setSelectedDate(day.dateString);
    }
    return (
        <>
            <Calendar style={{borderRadius: 4, backgroundColor:'transparent', margin:1}}
            theme={{calendarBackground:'#F4F4F4', weekVerticalMargin:1, 
                'stylesheet.calendar.header':{
                    header:{
                        backgroundColor:'#E6E6E6',
                        flexDirection:'row',
                    }
                },
            }}
            monthFormat='M월'
            markedDates={{
                [dateString]:{todayStyle:{backgroundColor:'#FFB3B3', borderRadius:50}},
                [selectedDate]:dateString===selectedDate?{selectedStyle:{borderWidth:1, borderRadius:4,borderColor:'#AAAAAA'},todayStyle:{backgroundColor:'#FFB3B3', borderRadius:50}}
                :{selectedStyle:{borderWidth:1, borderRadius:4,borderColor:'#AAAAAA'}}
            }}
            arrowsHitSlop={0}
            renderArrow={(direction)=>{
                if (direction==='right'){
                    return (
                        <View style={{flexDirection:'row'}}>
                            <AntDesign name="right" size={20} color="black"/>
                            <View style={{flexDirection:'row', position:'absolute', right:wp('-53%'), bottom:-6}}>
                                <CalenderButtons/>
                            </View>
                        </View>
                    )
                } else {
                    return (
                        <AntDesign name="left" size={20} color="black" />
                    )
                }
            }}
            dayComponent={({date, state, marking})=>{
                return (
                    <View style={[date.dateString===selectedDate?marking?.selectedStyle:{ undefined},{backgroundColor:'white', width:wp('12%'), height:hp('7.5%'), justifyContent:'center', alignItems:'center'}]}>
                    <TouchableOpacity disabled={state==='disabled'?true:undefined}
                    style={state==='disabled'? styles.disableDate : styles.enableDate}
                    onPress={()=>handleDayPress(date)} >
                        <View style={[marking?.todayStyle, {width:20, height:14, alignItems:'center', justifyContent:'center'}]}>
                            <Text style={{fontSize:10}}>{date.day}</Text>
                        </View>
                        <Text>{'😊'}</Text>
                    </TouchableOpacity>
                    </View>
                )
            }}
            maxDate={dateString} disableAllTouchEventsForDisabledDays={true} 
            onDayPress={handleDayPress}/>
        </>
    );
}

const CalenderButtons = () => {
    return (
        <>
            <TouchableOpacity style={{ backgroundColor: 'white', padding: 5, borderRadius: 10, elevation: 3, flexDirection: 'row' }}>
                <Entypo name="camera" size={20} color="#888888" />
                <Text style={{ marginLeft: 3 }}>기분어때</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'white', padding: 6, marginLeft: 10, borderRadius: 10, elevation: 3, flexDirection: 'row' }}>
                <MaterialCommunityIcons name="robot" size={20} color="#888888" />
                <Text style={{ marginLeft: 3 }}>일기요약</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    disableDate: {width: 30,  height: 30,  justifyContent: 'center',  alignItems: 'center', opacity:0.4},
    enableDate: {width: 30,  height: 30,  justifyContent: 'center',  alignItems: 'center'}
})