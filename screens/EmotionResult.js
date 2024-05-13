import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp} from "react-native-responsive-screen";
import useFaceDetection from "../hook/usefacedetection";
import NetworkError from "./NetworkError";
import { LinearGradient } from "expo-linear-gradient";

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
                <LinearGradient colors={['#9CB7FF', '#EBE2FF']} end={{ x: 0.5, y: 0.7 }} style={{height:hp('28%'),
                justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:29, textAlign:'center', paddingHorizontal:'15%'}}>{emotion ? emotion : "분석 중..."}</Text>
                </LinearGradient>
                <Image source={{uri: capturedImage}} resizeMode="cover" style={{flex:1, transform:[{scaleX:-1}]}} />
                <LinearGradient colors={['#EBE2FF','#9CB7FF']} end={{ x: 0.5, y: 0.8 }} style={{height:hp('28%'),
                justifyContent:'center', alignItems:'center'}}>
                    {emotion ? (
                        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-evenly'}}>
                            <TouchableOpacity onPress={()=>navigation.replace('EmotionCamera')}
                            style={{padding: 20, backgroundColor:'gray', borderRadius:25, elevation:3}}>
                                <Text style={{fontSize:22, color:'white'}}>아니에요</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>navigation.replace('Phrase', {emotion: emotion})}
                            style={{padding: 20, backgroundColor:'skyblue', borderRadius:20, elevation:3}}>
                                <Text style={{fontSize:22}}>맞아요</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text style={{fontSize:27, textAlign:'center', paddingHorizontal:'20%'}}>AI가 분석한 당신의 기분은 무엇일까요?</Text>
                    )}
                </LinearGradient>
            </View>
        )}
        </>
    )
}