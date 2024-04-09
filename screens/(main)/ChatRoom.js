import { LinearGradient } from "expo-linear-gradient";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import useComment from "../../hook/usecomment";
import { useEffect, useRef, useState } from "react";
import useUser from "../../hook/useuser";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function ChatRoom({navigation, route}) {
    const scrollRef = useRef();
    const commentEndRef = useRef();
    const {getComments, deleteComment} = useComment();
    const {nicknameCheck} = useUser();
    const [commentList, setCommentList] = useState();
    const [userNickname, setUserNickname] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const emotion = "HAPPY";
    // comment, createDate, emotion, id, user:{createDate, id, nickname}
    useEffect(()=>{
        const nicknameCheckListener = navigation.addListener('focus', ()=>{
            nicknameCheck().then(res=>{
                if (res !== null){ setUserNickname(res) }
            });
            getComments(emotion).then(res=>{setCommentList(res)})
        })
        return nicknameCheckListener;
    },[navigation])
    return (
        <LinearGradient colors={['#9CB7FF', '#DAD1FF']} end={{x:0.5, y:0.6}} style={{height:'100%'}}>
            <ScrollView 
            style={isLoaded ? {opacity:1} : {opacity:0}}
            ref={scrollRef} 
            onContentSizeChange={()=>{
                scrollRef.current.scrollToEnd({animated:true});
                setTimeout(() => {
                    setIsLoaded(true);
                }, 150);
            }}
            contentOffset={commentList ? {y:400} : undefined}
            contentContainerStyle={{justifyContent:'flex-end'}} showsVerticalScrollIndicator={false}>
                {commentList?.map((comment, index)=>{
                    return (
                        <View key={index} style={comment.user.nickname === userNickname ? {alignItems:'flex-end'} : {alignItems:'flex-start'}}>
                            <View style={comment.user.nickname === userNickname ? styles.my_comment : styles.others}>
                                {/* <Text>{comment.user.nickname}</Text> */}
                                <Text style={{fontSize:17}}>{comment.comment}</Text>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    my_comment: {
        justifyContent:'center', alignItems:'center',
        marginRight:'5%',
        marginBottom:'9%',
        backgroundColor:'#88A2FF',
        height: 70,
    },
    others: {
        justifyContent:'center', alignItems:'center',
        marginLeft:'5%',
        marginBottom:'9%',
        backgroundColor:"white",
        height: 70,
    }
})