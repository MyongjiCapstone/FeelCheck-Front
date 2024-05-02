import { Image, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera"
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function CameraTest(){
    const [permission, requestPermission] = Camera.useCameraPermissions();
    if (!permission){
        return <View/>
    }
    if (!permission.granted){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text>카메라 권한에 동의하십니까?</Text>
                <TouchableOpacity  style={{backgroundColor:'skyblue', padding:10}} onPress={requestPermission}>
                    <Text>동의하기</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return(
        <View style={{flex:1, justifyContent:'center', backgroundColor:'gray'}}>
            <Camera style={{height:hp('63%'), justifyContent:'center', alignItems:'center'}} type={CameraType.front}>
                <Image source={require('../assets/face-guideline.png')} resizeMode="cover" style={{tintColor:'white'}}/>
            </Camera>
            <View style={{height:hp('28%'), backgroundColor:'lightgray', position:'absolute', top:0, left:0, right:0,
            justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:29, textAlign:'center', paddingHorizontal:'15%'}}>오늘 하루의 기분을 표정으로 말해주세요!</Text>
            </View>
            <View style={{height:hp('28%'), backgroundColor:'lightgray', position:'absolute', bottom:0, left:0, right:0,
            justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:27, textAlign:'center', paddingHorizontal:'20%'}}>AI가 분석한 당신의 기분은 무엇일까요?</Text>
            </View>
        </View>
    )
} 