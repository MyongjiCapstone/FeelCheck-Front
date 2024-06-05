import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function useDiary(){
    const getMonthDiary = async(dateYearMonth) => {
        const monthDiary = JSON.parse(await AsyncStorage.getItem(dateYearMonth));
        if (monthDiary){
            return monthDiary;
        } else {
            return {1:{}, 2:{}, 3:{}, 4:{}}
        }
    }
    const writeDiary = async(date, text) => {
        const tmpDate = new Date(date);
        const firstDayOfMonth = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), 1)
        const firstSunday = new Date(firstDayOfMonth);
        firstSunday.setDate(firstDayOfMonth.getDate() + (7 - firstDayOfMonth.getDay()));
        const weekNumber = Math.floor((tmpDate.getDate() - firstSunday.getDate())/7) + 2; // 주차 계산 로직

        const dateYearMonth = date.slice(0, -3);
        const monthDiary = JSON.parse(await AsyncStorage.getItem(dateYearMonth));
        let week = {...monthDiary[weekNumber]}; //해당 주차의 일기들 가져오기
        const newDiary = {...monthDiary}; //해당 달의 일기들 가져오기
        const newDateValue = {...week[date], text: text}
        // let diarytext = {text: text};
        week[date] = newDateValue; //해당 주차 일기에 반영
        newDiary[weekNumber] = week; //해당 달 일기에 반영
        AsyncStorage.setItem(dateYearMonth, JSON.stringify(newDiary));
        return JSON.parse(await AsyncStorage.getItem(dateYearMonth));
    }
    const deleteDiary = async(date) => {
        const tmpDate = new Date(date);
        const firstDayOfMonth = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), 1)
        const firstSunday = new Date(firstDayOfMonth);
        firstSunday.setDate(firstDayOfMonth.getDate() + (7 - firstDayOfMonth.getDay()));
        const weekNumber = Math.floor((tmpDate.getDate() - firstSunday.getDate())/7) + 2; // 주차 계산 로직
        const dateYearMonth = date.slice(0, -3);
        const monthDiary = JSON.parse(await AsyncStorage.getItem(dateYearMonth));
        let week = {...monthDiary[weekNumber]}; //해당 주차의 일기들 가져오기
        const newDiary = {...monthDiary}; //해당 달의 일기들 가져오기
        week[date]['text'] = undefined; //해당 주차 일기에 반영
        newDiary[weekNumber] = week; //해당 달 일기에 반영
        AsyncStorage.setItem(dateYearMonth, JSON.stringify(newDiary));
        console.log('성공적으로', date, '일기가 삭제되었습니다.');
        return JSON.parse(await AsyncStorage.getItem(dateYearMonth));
    }

    const aiDiarySummary = async(diaryArray) => {
        const result = axios.post(`${API_URL}/openapi/summary`,diaryArray
        ,{headers: {'Content-Type': 'application/json'}, timeout:5000})
        .then((res) => {
            if (res.data.status === 200){
                console.log('Server : Success Summary');
                return res.data.data;
            } else {
                Alert.alert('안내', res.data.message);
                console.log('Server : Failed Summary, Reason :', res.data.message);
                return res.data.data;
            }
        });
        return result;
    }
    const aiComment = async(summaryText) => {
        const result = axios.post(`${API_URL}/openapi/comment`,summaryText
        ,{headers: {'Content-Type': 'application/json'}, timeout:5000})
        .then((res) => {
            if (res.data.status === 200){
                console.log('Server : Success Ai Comment');
                return res.data.data;
            } else {
                Alert.alert('안내', res.data.message);
                console.log('Server : Failed Ai Comment, Reason :', res.data.message);
                return res.data.data;
            }
        });
        return result;
    }

    return {getMonthDiary, writeDiary, deleteDiary, aiDiarySummary, aiComment}
}

// '2024-05' : {
//     1:{},
//     2:{},
//     3:{"2024-05-05": {}, "2024-05-06": {}, "2024-05-07": {}, "2024-05-08": {}, "2024-05-09": {}, "2024-05-10": {}, "2024-05-11": {}},
//     4:{},
//     5:{}
// }