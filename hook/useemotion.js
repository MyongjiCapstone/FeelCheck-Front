import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useEmotion() {
    const todayEmotion = async(emotion) => {
        const emoji = {
            Happy : '😄',
            HappyNess : '😄',
            Sad : '😭',
            Sadness : '😭',
            Angry : '😡',
            Rage : '😡',
            Surprise : '😮',
            Neutral : '😊'
        }
        const tmpDate = new Date();
        const firstDayOfMonth = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), 1)
        const firstSunday = new Date(firstDayOfMonth);
        firstSunday.setDate(firstDayOfMonth.getDate() + (7 - firstDayOfMonth.getDay()));
        const weekNumber = Math.floor((tmpDate.getDate() - firstSunday.getDate())/7) + 2; // 주차 계산 로직
        const date = tmpDate.toISOString().slice(0, 10);
        const dateYearMonth = date.slice(0, -3);
        const monthDiary = JSON.parse(await AsyncStorage.getItem(dateYearMonth));
        let week = {...monthDiary[weekNumber]}; //해당 주차의 일기들 가져오기
        const newDiary = {...monthDiary}; //해당 달의 일기들 가져오기
        // if (week[date]) {
        // } else {
            let emotionValue = {emotion: emoji[emotion]};
            week[date] = emotionValue; //해당 주차 일기에 반영
            newDiary[weekNumber] = week; //해당 달 일기에 반영
            AsyncStorage.setItem(dateYearMonth, JSON.stringify(newDiary));
        // }
    }
    const writeEmotion = async(date, emotion) => {
        const emoji = {
            Happy : '😄',
            HappyNess : '😄',
            Sad : '😭',
            Sadness : '😭',
            Angry : '😡',
            Rage : '😡',
            Surprise : '😮',
            Neutral : '😊'
        }
        const tmpDate = new Date(date);
        const firstDayOfMonth = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), 1)
        const firstSunday = new Date(firstDayOfMonth);
        firstSunday.setDate(firstDayOfMonth.getDate() + (7 - firstDayOfMonth.getDay()));
        const weekNumber = Math.floor((tmpDate.getDate() - firstSunday.getDate())/7) + 2; // 주차 계산 로직
        const dateYearMonth = date.slice(0, -3);
        const monthDiary = JSON.parse(await AsyncStorage.getItem(dateYearMonth));
        let week = {...monthDiary[weekNumber]}; //해당 주차의 일기들 가져오기
        const newDiary = {...monthDiary}; //해당 달의 일기들 가져오기
        let emotionValue = {emotion: emoji[emotion]};
        week[date] = emotionValue; //해당 주차 일기에 반영
        newDiary[weekNumber] = week; //해당 달 일기에 반영
        AsyncStorage.setItem(dateYearMonth, JSON.stringify(newDiary));
        return JSON.parse(await AsyncStorage.getItem(dateYearMonth));
    }
    return {todayEmotion,writeEmotion}
}