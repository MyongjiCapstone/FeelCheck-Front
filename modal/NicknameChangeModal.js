import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import useComment from "../hook/usecomment";
import useUser from "../hook/useuser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function NicknameChangeModal({navigation, route}){
    const paramsData = route.params.data;
    const emotion = paramsData.emotion;
    const page = paramsData.page;
    const nickname = paramsData.nickname;
    const setCommentList = paramsData.callback;
    const {getComments} = useComment();
    const {updateNickname} = useUser();
    const [newNickname, setNewNickname] = useState();
    const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
    const handleUpdateNickname = () => {
        if (newNickname === ""){
            console.log('Client : Failed User Created, Reason : Nickname is Null');
            return Alert.alert('안내', '닉네임을 입력해주세요.');
        }
        if (!nicknameRegex.test(newNickname)){
            setNewNickname("");
            console.log('Client : Failed User Created, Reason : Nickname is Wrong');
            return Alert.alert('안내', '올바르지 않은 닉네임입니다.');
        }
        if (newNickname.length < 2) {
            setNewNickname("");
            console.log('Client : Failed User Created, Reason : Nickname is Too Short');
            return Alert.alert('안내', '닉네임이 너무 짧습니다.');
        }
        updateNickname(nickname, newNickname).then(res=>{
            if (res) {
                AsyncStorage.setItem('nickname', res);
                getComments(emotion, page).then(res=>{
                    setCommentList(res);
                });
                navigation.goBack();
            }
            setNewNickname("");
        })
    }
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#00000022'}}>
            <View style={{width:'80%', height:hp('40%'), backgroundColor:'white', alignItems:'center', justifyContent:'space-evenly',
            borderRadius:40, elevation:20}}>
                <Text style={{fontSize:35}}>닉네임 변경</Text>
                <TextInput value={newNickname} onChangeText={text=>setNewNickname(text)} maxLength={10}
                style={{borderWidth:1, width:'80%', height:'20%', fontSize:28, borderRadius:10, paddingHorizontal: 16}}/>
                <TouchableOpacity onPress={handleUpdateNickname}
                style={{padding:'7%', backgroundColor:'#99AAFF', borderRadius:20}}>
                    <Text style={{color:'white', fontSize:24}}>변경하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}