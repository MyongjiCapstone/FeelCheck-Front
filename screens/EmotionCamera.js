import { Image, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera/legacy"
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import * as FaceDetector from 'expo-face-detector';
import { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function EmotionCamera({navigation}){
    const [captureCount, setCaptureCount] = useState(0);
    const [countEnable, setCountEnable] = useState(false);
    const [isCaptured, setIsCaptured] = useState(false);
    const handleFaceDetected = ({faces}) => {
        if (faces.length !== 0 && !isCaptured //얼굴이 화면에 감지
            && faces[0].bounds.size.height > 200 && faces[0].bounds.size.height<280 //얼굴 높이가 200~280 사이
            && faces[0].NOSE_BASE.x>140 && faces[0].NOSE_BASE.x<230 //코 x위치가 140~230 사이
            && faces[0].NOSE_BASE.y>180 && faces[0].NOSE_BASE.y<310) { //코 y위치가 180~310 사이
            setCountEnable(true);
            setCaptureCount(prev=>{
                const newCount = prev+1;
                if (newCount === 4){
                    setIsCaptured(true);
                    takePhoto();
                    return 0;
                }
                return newCount;
            }); 
        } else {
            setCaptureCount(0);
            setCountEnable(false);
        }
    }
    const takePhoto = async() => {
        let {uri} = await cameraRef.current.takePictureAsync({
            quality: 1,
        })
        navigation.replace('EmotionResult', {capturedImage:uri});
    }
    const [numOpacity, setNumOpacity] = useState(1);
    const intervalRef = useRef();
    useEffect(()=>{
        setNumOpacity(1);
        intervalRef.current = setInterval(()=>{
            setNumOpacity(prev=>prev-0.05);
        },50)
        return () => clearInterval(intervalRef.current);
    },[captureCount])
    const cameraRef = useRef();
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
        // LinearGradient colors={['#9CB7FF', '#DAD1FF']} end={{ x: 0.5, y: 0.6 }} style={{ height: '100%' }}
        <View style={{flex:1, justifyContent:'center'}}>
            <Camera style={{height:hp('63%'), justifyContent:'center', alignItems:'center'}} type={CameraType.front}
            onFacesDetected={handleFaceDetected}
            faceDetectorSettings={{
                mode: FaceDetector.FaceDetectorMode.accurate,
                detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                runClassifications: FaceDetector.FaceDetectorClassifications.none,
                minDetectionInterval: 1000,
            }}
            ref={cameraRef}
            >
                {countEnable && captureCount>0 ? <Text style={{position:'absolute', fontSize:60, opacity:numOpacity}}>{4-captureCount}</Text> : <Text style={{position:'absolute', fontSize:60}}></Text>}
                <Image source={require('../assets/face-guideline.png')} resizeMode="cover" style={{tintColor:'white'}}/>
            </Camera>
            <LinearGradient colors={['#9CB7FF', '#EBE2FF']} end={{ x: 0.5, y: 0.7 }} style={{height:hp('28%'), position:'absolute', top:0, left:0, right:0,
            justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:29, textAlign:'center', paddingHorizontal:'15%'}}>오늘 하루의 기분을 표정으로 말해주세요!</Text>
            </LinearGradient>
            <LinearGradient colors={['#DAD1FF','#9CB7FF']} end={{ x: 0.5, y: 0.8 }} style={{height:hp('28%'), position:'absolute', bottom:0, left:0, right:0,
            justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:27, textAlign:'center', paddingHorizontal:'20%'}}>AI가 분석한 당신의 기분은 무엇일까요?</Text>
            </LinearGradient>
        </View>
    )
} 