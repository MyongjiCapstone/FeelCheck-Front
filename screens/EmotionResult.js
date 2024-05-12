import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp} from "react-native-responsive-screen";
import useFaceDetection from "../hook/usefacedetection";
import NetworkError from "./NetworkError";

export default function EmotionResult({navigation, route}){
    const [mode, setMode] = useState("LOADING");
    const [emotion, setEmotion] = useState();
    const {classifyFace} = useFaceDetection();
    const capturedImage = route.params.capturedImage;
    useEffect(()=>{
        if(mode === "LOADING"){
            classifyFace(capturedImage)
            .then(res=>{
                console.log("성공",res);
                setEmotion(res.emotion);
            })
            .catch(err=>{
                console.log("실패",err.response);
                setMode("NETWORK_ERROR")
            });
        }
    },[mode])
    // console.log(capturedImage);
    return(
        <>
        {mode==="NETWORK_ERROR" ? (
            <NetworkError setMode={setMode}/>
        ) : (
            <View style={{flex:1, justifyContent:'center', backgroundColor:'transparent'}}>
                <View style={{height:hp('28%'), backgroundColor:'lightgray',
                justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:29, textAlign:'center', paddingHorizontal:'15%'}}>{emotion ? emotion : "분석 중..."}</Text>
                </View>
                <Image source={{uri: capturedImage}} resizeMode="cover" style={{flex:1, transform:[{scaleX:-1}]}} />
                <View style={{height:hp('28%'), backgroundColor:'lightgray',
                justifyContent:'center', alignItems:'center'}}>
                    {emotion ? (
                        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-evenly'}}>
                            <TouchableOpacity onPress={()=>navigation.replace('EmotionCamera')}
                            style={{padding: 20, backgroundColor:'gray', borderRadius:20, elevation:3}}>
                                <Text>아니에요</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>navigation.replace('Phrase', {emotion: emotion})}
                            style={{padding: 20, backgroundColor:'skyblue', borderRadius:20, elevation:3}}>
                                <Text>맞아요</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text style={{fontSize:27, textAlign:'center', paddingHorizontal:'20%'}}>AI가 분석한 당신의 기분은 무엇일까요?</Text>
                    )}
                </View>
            </View>
        )}
        </>
    )
}