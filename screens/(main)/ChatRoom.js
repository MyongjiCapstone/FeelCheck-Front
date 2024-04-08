import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import useComment from "../../hook/usecomment";
import { useEffect, useState } from "react";
import useUser from "../../hook/useuser";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function ChatRoom({navigation, route}) {
    const {getComments, postComment, deleteComment} = useComment();
    const {nicknameCheck} = useUser();
    const [commentList, setCommentList] = useState();
    const [userNickname, setUserNickname] = useState();
    const emotion = "HAPPY";
    // comment, createDate, emotion, id, user:{createDate, id, nickname}
    useEffect(()=>{
        const nicknameCheckListener = navigation.addListener('focus', ()=>{
            nicknameCheck().then(res=>{
                if (res !== null){ setUserNickname(res) }
            });
            getComments(emotion).then(res=>{setCommentList(res)});
        })
        return nicknameCheckListener;
    },[navigation])
    return (
        <LinearGradient colors={['#9CB7FF', '#DAD1FF']} end={{x:0.5, y:0.6}} style={{height:'100%'}}>
            <ScrollView>
                {commentList?.map((comment, index)=>{
                    return (
                        <View key={index} style={comment.user.nickname === userNickname ? styles.my_comment : styles.others}>
                            <Text>{comment.user.nickname}</Text>
                            <Text>{comment.comment}</Text>
                            <Text>{comment.createDate}</Text>
                        </View>
                    )
                })}
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    my_comment: {
        backgroundColor:'#88A2FF',
    },
    others: {
        backgroundColor:"white",
        height: 120,
    }
})