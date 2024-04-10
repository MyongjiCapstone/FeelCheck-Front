import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Alert } from "react-native";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function useUser(){
    const navigation = useNavigation();
    const nicknameCheck = () => {
        // AsyncStorage.clear();
        const result = AsyncStorage.getItem('nickname')
        .then(res => {
            if (res === null){
                // 닉네임 등록 Modal 띄우기
                return navigation.navigate('NicknameModal');
            } else {
                // console.log('Nickname is', res);
                // 유저가 닉네임을 보유. 해당 닉네임 반환
                return res;
            }
        })
        return result;
    }
    const createNickname = (nickname) => {
        const result = axios.post(`${API_URL}/api/users`,{
            nickname: nickname
        },{headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            if (res.data.status === 200){
                console.log('Server : Success User Created');
                return res.data.data;
            } else {
                Alert.alert('안내', res.data.message);
                console.log('Server : Failed User Created, Reason :', res.data.message);
                return res.data.data;
            }
        });
        return result;
    }
    const updateNickname = (nickname, newNickname) => {
        const result = axios.put(`${API_URL}/api/users`,{
            nickname: nickname,
            newNickname: newNickname
        },{headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            if (res.data.status === 200){
                Alert.alert('안내', res.data.message);
                console.log('Server : Success Nickname Updated');
                return res.data.data;
            } else {
                Alert.alert('안내', res.data.message);
                console.log('Server : Failed Nickname Updated, Reason :', res.data.message);
                return res.data.data;
            }
        });
        return result;
    }
    return {nicknameCheck, createNickname, updateNickname}
}