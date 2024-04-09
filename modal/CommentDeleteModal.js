import { Text, TouchableOpacity, View } from "react-native";

export default function CommentDeleteModal(){
    
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#00000022'}}>
            <View style={{width:'80%', height:hp('40%'), backgroundColor:'white', alignItems:'center', justifyContent:'space-evenly',
            borderRadius:40, elevation:20}}>
                <Text style={{fontSize:35}}>닉네임 등록</Text>
                <TouchableOpacity 
                style={{padding:'7%', backgroundColor:'#99AAFF', borderRadius:20}}>
                    <Text style={{color:'white', fontSize:24}}>등록하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}