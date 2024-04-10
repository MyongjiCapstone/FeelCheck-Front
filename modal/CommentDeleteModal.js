import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import useComment from "../hook/usecomment";

export default function CommentDeleteModal({navigation, route}){
    const paramsData = route.params.data;
    const commentDeleteData = paramsData.commentDeleteData;
    const emotion = paramsData.emotion;
    const page = paramsData.page;
    const setCommentList = paramsData.callback;
    const {getComments, deleteComment} = useComment();
    const handleCancleButton = () => {
        navigation.goBack();
    }
    const handleAcceptButton = () => {
        deleteComment(commentDeleteData).then(()=>{
            getComments(emotion, page).then(res=>{
                setCommentList(res);
            });
        });
        navigation.goBack();
    }
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#00000022'}}>
            <View style={{width:'80%', height:hp('22%'), padding:10, backgroundColor:'white', alignItems:'center', justifyContent:'space-around',
            borderRadius:20, elevation:20}}>
                <Text style={{fontSize:20, marginTop:15}}>댓글을 삭제하시겠습니까?</Text>
                <View style={{flexDirection:'row', alignSelf:'stretch', justifyContent:'space-evenly'}}>
                    <TouchableOpacity onPress={handleCancleButton} activeOpacity={0.7}
                    style={{paddingVertical:'4%', paddingHorizontal:'9%', backgroundColor:'#BBBBBB', borderRadius:5}}>
                        <Text style={{color:'white', fontSize:15}}>취소</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleAcceptButton} activeOpacity={0.7}
                    style={{paddingVertical:'4%', paddingHorizontal:'9%', backgroundColor:'#FF7777', borderRadius:5}}>
                        <Text style={{color:'white', fontSize:15}}>삭제</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}