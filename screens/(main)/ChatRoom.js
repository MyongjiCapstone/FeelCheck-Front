import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, View } from "react-native";
import useComment from "../../hook/usecomment";
import { useEffect, useState } from "react";

export default function ChatRoom({navigation, route}) {
    const {getComments, postComment, deleteComment} = useComment();
    const [commentList, setCommentList] = useState();
    const emotion = "HAPPY";
    // comment, createDate, emotion, id, user:{createDate, id, nickname}
    useEffect(()=>{
        getComments(emotion).then(res=>()=>{
            setCommentList(res);
        });
    },[])
    return (
        <LinearGradient colors={['#9CB7FF', '#DAD1FF']} end={{x:0.5, y:0.6}} style={{height:'100%'}}>
            <ScrollView style={{}}>
                {commentList?.map((comment, index)=>{
                    console.log(comment);
                    return (
                        <View key={index} style={{backgroundColor:'blue'}}>
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