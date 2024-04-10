import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import useComment from "../../hook/usecomment";
import { useEffect, useRef, useState } from "react";
import useUser from "../../hook/useuser";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function ChatRoom({navigation, route}) {
    const scrollRef = useRef();
    const {getComments, postComment} = useComment();
    const {nicknameCheck} = useUser();
    const [commentList, setCommentList] = useState();
    const [userNickname, setUserNickname] = useState();
    const [page, setPage] = useState(1);
    const [contentHeight, setContentHeight] = useState(500);
    const [contentOpacity, setContentOpacity] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const emotion = "HAPPY"; //추후 route.params.emotion 으로 설정해야 함
    useEffect(()=>{
        if(!commentList){
            getComments(emotion, page).then(res=>{
                setCommentList(res);
            });
        }
        const commentInterval = setInterval(()=>{
            getComments(emotion, page).then(res=>{
                setCommentList(res);
            })
        }, 500)
        const nicknameCheckListener = navigation.addListener('focus', ()=>{
            nicknameCheck().then(res=>{
                if (res !== null){ setUserNickname(res) }
            });
        });
        setTimeout(()=> { // 첫 로딩시에 스크롤 버벅임 안보이기 위해 0.1초간 Content의 Opacity를 0으로 해두었음
            setContentOpacity(1);
        }, 300)
        return ()=>{
            nicknameCheckListener();
            clearInterval(commentInterval);
        }
    },[navigation]);

    const commentPush = (comment) => {
        const commentPostData = {
            emotion: emotion,
            nickname: userNickname,
            comment: comment
        }
        postComment(commentPostData).then(()=>{
            getComments(emotion, page).then(res=>{
                setCommentList(res);
            });
            scrollRef.current.scrollToEnd({animation:true});
        })
    }
    const handleCommentPressLong = (nickname, commentId) => {
        // 사용자 본인의 Comment
        if (nickname === userNickname){
            const paramsData = {
                emotion: emotion,
                page: page,
                commentDeleteData: {
                    nickname: nickname,
                    commentId, commentId
                },
                callback: setCommentList
            }
            navigation.navigate('CommentDeleteModal', {data : paramsData});
        }
        // 다른 사람의 Comment 
        else { 
            ToastAndroid.show(nickname+" 님입니다", ToastAndroid.SHORT);
        }
    }
    const handleNamePress = () => {
        const paramsData = {
            emotion: emotion,
            page: page,
            nickname: userNickname,
            callback: setCommentList
        }
        navigation.navigate('NicknameChangeModal', {data: paramsData})
    }
    const handleContentSizeChange = (contentWidth, contentHeight) => {
        // console.log(contentHeight);
        setContentHeight(contentHeight);
        // if (isLoading){
        // }
    }
/*     const handleScrollToTop = event => {
        const { contentOffset } = event.nativeEvent;
        if (contentOffset.y <= 0 && !isLoading) {
            setIsLoading(true);
            console.log('안뇽!', contentOffset.y, '현재 페이지는', page);
            setPage(prev=>prev+1);
            getComments(emotion, page).then(res=>{
                setCommentList(prev => [...res, ...prev]);
            }).finally(()=>{setIsLoading(false)});
        }
    } */
    return (
        <LinearGradient colors={['#9CB7FF', '#DAD1FF']} end={{x:0.5, y:0.6}} style={{height:'100%'}}>
            <LinearGradient colors={["#9CB7FF", "#DAD1FF00"]} start={{x:0.5, y:0.05}} end={{x:0.5, y:0.2}}
            style={{zIndex:1, pointerEvents:'none', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}} />
            <ScrollView
            // onScroll={handleScrollToTop}
            onContentSizeChange={handleContentSizeChange}
            contentOffset={{y:contentHeight}}
            ref={scrollRef}
            contentContainerStyle={{justifyContent:'flex-end', flexDirection:'column-reverse', paddingTop:30,opacity:contentOpacity}} 
            showsVerticalScrollIndicator={false}>
                {commentList?.map((comment, index)=>{
                    return (
                        <Pressable onLongPress={()=>handleCommentPressLong(comment.user.nickname, comment.id)}
                        key={index} style={comment.user.nickname === userNickname ? {alignItems:'flex-end'} : {alignItems:'flex-start'}}>
                            <Text onPress={comment.user.nickname === userNickname ? handleNamePress : undefined}
                            style={{fontSize:12, marginHorizontal:'6%', marginBottom:3}}>{comment.user.nickname}</Text>
                            <View style={comment.user.nickname === userNickname ? styles.my_comment : styles.others}>
                                <Text style={{fontSize:17}}>{comment.comment}</Text>
                            </View>
                        </Pressable>
                    )
                })}
            </ScrollView>
            <CommentInput commentPush={commentPush}/>
        </LinearGradient>
    )
}

function CommentInput({commentPush}){
    const [comment, setComment] = useState("");
    const handleSendButton = () => {
        commentPush(comment);
        setComment("");
    }
    return (
        <View style={{borderColor:'gray', borderRadius: 8, paddingHorizontal:16, paddingVertical:6, backgroundColor:'#ACB7DE',
            position: 'relative', bottom:-5, flexDirection:'row', alignItems: 'center'}}>
            <TextInput maxLength={100} style={{ padding: 16, fontSize: 16, height: hp('7%'), flex: 1, backgroundColor: 'white', borderRadius: 20, marginRight: 16, marginBottom:5, elevation:3 }}
            value={comment} onChangeText={setComment} placeholder="채팅을 남겨보세요."/>
            <TouchableOpacity activeOpacity={0.7} onPress={handleSendButton}
            style={{ backgroundColor: 'white', marginTop: hp('1%'), marginBottom:hp('1%')+5, alignItems: 'center', justifyContent: 'center', width:hp('6.5%'), height: hp('6.5%'), borderRadius: 50, paddingHorizontal:'2%', elevation:3}}>
                <FontAwesome name="send" size={24} color="#A0BAC5" style={{marginRight:3}}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    my_comment: {
        borderRadius:10,
        justifyContent:'center', alignItems:'center',
        marginHorizontal:'5%',
        marginBottom: 25,
        paddingHorizontal: 25,
        backgroundColor:'#88A2FF',
        paddingVertical: 20,
    },
    others: {
        borderRadius:10,
        justifyContent:'center', alignItems:'center',
        marginHorizontal:'5%',
        marginBottom: 25,
        paddingHorizontal: 25,
        backgroundColor:"white",
        paddingVertical: 20,
    }
})


// 쑤레기통
    //스크롤뷰 내부속성
        // style={isLoaded ? {opacity:1} : {opacity:0}}
        // onContentSizeChange={()=>{
        //     scrollRef.current.scrollToEnd({animated:true});
        //     setTimeout(() => {
        //         setIsLoaded(true);
        //     }, 300);
        // }}