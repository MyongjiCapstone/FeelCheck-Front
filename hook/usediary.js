import AsyncStorage from "@react-native-async-storage/async-storage";

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
        const weekNumber = Math.ceil((tmpDate.getDate() - firstSunday.getDate())/7) + 1; // 주차 계산 로직

        const dateYearMonth = date.slice(0, -3);
        const monthDiary = JSON.parse(await AsyncStorage.getItem(dateYearMonth));
        let week = {...monthDiary[weekNumber]}; //해당 주차의 일기들 가져오기
        const newDiary = {...monthDiary}; //해당 달의 일기들 가져오기
        const day = tmpDate.getDay();
        const firstDay = new Date(date);
        firstDay.setDate(firstDay.getDate() - day);
        week[date] = text; //해당 주차 일기에 반영
        newDiary[weekNumber] = week; //해당 달 일기에 반영
        AsyncStorage.setItem(dateYearMonth, JSON.stringify(newDiary));
        return JSON.parse(await AsyncStorage.getItem(dateYearMonth));
    }
    return {getMonthDiary, writeDiary}
}

// '2024-05' : {
//     1:{},
//     2:{},
//     3:{"2024-05-05": {}, "2024-05-06": {}, "2024-05-07": {}, "2024-05-08": {}, "2024-05-09": {}, "2024-05-10": {}, "2024-05-11": {}},
//     4:{},
//     5:{}
// }