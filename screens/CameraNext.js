import { Image, Text, View } from "react-native";
import { heightPercentageToDP as hp} from "react-native-responsive-screen";

export default function CameraNext({route}){
    const capturedImage = route.params.capturedImage;
    // console.log(capturedImage);
    return(
        <View style={{flex:1, justifyContent:'center', backgroundColor:'transparent'}}>
            <View style={{height:hp('28%'), backgroundColor:'lightgray',
            justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:29, textAlign:'center', paddingHorizontal:'15%'}}>오늘 하루의 기분을 표정으로 말해주세요!</Text>
            </View>
            <Image source={{uri: capturedImage}} resizeMode="cover" style={{flex:1, transform:[{scaleX:-1}]}} />
            <View style={{height:hp('28%'), backgroundColor:'lightgray',
            justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:27, textAlign:'center', paddingHorizontal:'20%'}}>AI가 분석한 당신의 기분은 무엇일까요?</Text>
            </View>
        </View>
    )
}