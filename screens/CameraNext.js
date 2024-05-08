import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { heightPercentageToDP as hp} from "react-native-responsive-screen";
import useFaceDetection from "../hook/usefacedetection";

export default function CameraNext({route}){
    const [emotion, setEmotion] = useState();
    const {classifyFace} = useFaceDetection();
    const capturedImage = route.params.capturedImage;
    useEffect(()=>{
        classifyFace(capturedImage)
        .then(res=>{
            console.log("성공",res);
            setEmotion(res.emotion);
        })
        .catch(err=>console.log("실패",err.response));
    },[])
    // console.log(capturedImage);
    return(
        <View style={{flex:1, justifyContent:'center', backgroundColor:'transparent'}}>
            <View style={{height:hp('28%'), backgroundColor:'lightgray',
            justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:29, textAlign:'center', paddingHorizontal:'15%'}}>{emotion ? emotion : "분석 중..."}</Text>
            </View>
            <Image source={{uri: capturedImage}} resizeMode="cover" style={{flex:1, transform:[{scaleX:-1}]}} />
            <View style={{height:hp('28%'), backgroundColor:'lightgray',
            justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:27, textAlign:'center', paddingHorizontal:'20%'}}>AI가 분석한 당신의 기분은 무엇일까요?</Text>
            </View>
        </View>
    )
}