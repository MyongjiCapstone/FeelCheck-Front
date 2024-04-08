import { useState } from "react";
import { Alert, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import useUser from "../hook/useuser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function NicknameModal(){
    const navigation = useNavigation();
    const {createNickname} = useUser();
    const [nickname, setNickname] = useState("");
    const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
    const handleCreateNickname = () => {
        if (nickname === ""){
            console.log('Client : Failed User Created, Reason : Nickname is Null');
            return Alert.alert('안내', '닉네임을 입력해주세요.');
        }
        if (!nicknameRegex.test(nickname)){
            setNickname("");
            console.log('Client : Failed User Created, Reason : Nickname is Wrong');
            return Alert.alert('안내', '올바르지 않은 닉네임입니다.');
        }
        if (nickname.length < 2) {
            setNickname("");
            console.log('Client : Failed User Created, Reason : Nickname is Too Short');
            return Alert.alert('안내', '닉네임이 너무 짧습니다.');
        }
        createNickname(nickname).then(res=>{
            if (res !== null) {
                AsyncStorage.setItem('nickname', res);
                return navigation.goBack();
            }
            setNickname("");
        })
    }
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#00000022'}}>
            <View style={{width:'80%', height:hp('40%'), backgroundColor:'white', alignItems:'center', justifyContent:'space-evenly',
            borderRadius:40, elevation:20}}>
                <Text style={{fontSize:35}}>닉네임 등록</Text>
                <TextInput value={nickname} onChangeText={text=>setNickname(text)} maxLength={10}
                style={{borderWidth:1, width:'80%', height:'20%', fontSize:28, borderRadius:10, paddingHorizontal: 16}}/>
                <TouchableOpacity onPress={handleCreateNickname}
                style={{padding:'7%', backgroundColor:'#99AAFF', borderRadius:20}}>
                    <Text style={{color:'white', fontSize:24}}>등록하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}